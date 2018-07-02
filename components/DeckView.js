import PropType from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from './PrimaryButton';
import { getDeck } from '../utils/api';
import { gray } from '../utils/colors';

const propTypes = {
  navigation: PropType.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    paddingTop: 32,
    paddingBottom: 24,
  },
  numberOfCards: {
    color: gray,
  },
});

class DeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: this.props.navigation.state.params.deck,
    };
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
      getDeck(this.state.deck.title).then(deck => this.setState({ deck }));
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.numberOfCards}>
          {deck.questions.length} cards
        </Text>
        <PrimaryButton
          name="Add Card"
          onPress={() => navigate('CardCreate', { title: deck.title })}
        />
        {deck.questions.length > 0 &&
          <PrimaryButton
            name="Start Quiz"
            onPress={() => navigate('Quiz', { deck })}
          />}
      </View>
    );
  }
}

DeckView.propTypes = propTypes;

export default DeckView;
