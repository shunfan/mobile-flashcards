import PropType from 'prop-types';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import { tomato } from '../utils/colors';
import PrimaryButton from './PrimaryButton';
import { addCardToDeck } from '../utils/api';

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

class CardCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    addCardToDeck(this.props.navigation.state.params.title, {
      question: this.state.question,
      answer: this.state.answer,
    })
      .then(() => this.props.navigation.goBack());
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={{ fontSize: 20 }}>Question</Text>
        <TextInput
          style={styles.input}
          value={this.state.question}
          onChangeText={question => this.setState({ question })}
        />
        <Text style={{ fontSize: 20 }}>Answer</Text>
        <TextInput
          style={styles.input}
          value={this.state.answer}
          onChangeText={answer => this.setState({ answer })}
        />
        <PrimaryButton name="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

CardCreate.propTypes = propTypes;

export default CardCreate;
