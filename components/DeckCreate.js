import PropType from 'prop-types';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput } from 'react-native';

import PrimaryButton from './PrimaryButton';
import { saveDeckTitle } from '../utils/api';
import { tomato } from '../utils/colors';

const propTypes = {
  navigation: PropType.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    borderBottomColor: tomato,
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
  },
});

class DeckCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };

    this.addDeck = this.addDeck.bind(this);
  }

  addDeck() {
    saveDeckTitle(this.state.title)
      .then(() => {
        this.props.navigation.navigate('DeckList');
        this.props.navigation.navigate('DeckView', { deck: { title: this.state.title, questions: [] } });
        this.setState({ title: '' });
      });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{ fontSize: 20 }}>Title</Text>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={title => this.setState({ title })}
        />
        <PrimaryButton name="New Deck" onPress={this.addDeck} />
      </KeyboardAvoidingView>
    );
  }
}

DeckCreate.propTypes = propTypes;

export default DeckCreate;
