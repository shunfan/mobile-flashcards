import PropType from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import DeckListItem from './DeckListItem';
import { getDecks } from '../utils/api';

const propTypes = {
  navigation: PropType.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
    };
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentDidMount() {
    getDecks().then(decks => this.setState({ decks }));
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
      getDecks().then(decks => this.setState({ decks }));
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  handleNavigation(deck) {
    this.props.navigation.navigate('DeckView', { deck });
  }

  render() {
    const { decks } = this.state;
    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map(title => (
          <DeckListItem
            key={title}
            deck={decks[title]}
            onPress={this.handleNavigation}
          />
        ))}
      </ScrollView>
    );
  }
}

DeckList.propTypes = propTypes;

export default DeckList;
