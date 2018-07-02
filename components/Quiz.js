import PropType from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from './PrimaryButton';
import { clearLocalNotification } from '../utils/api';

const propTypes = {
  navigation: PropType.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    marginTop: 24,
  },
});

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionIndex: 0,
      correctAnswerCount: 0,
      showAnswer: false,
    };

    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleCorrectAnswer() {
    this.setState(state => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      correctAnswerCount: state.correctAnswerCount + 1,
      showAnswer: false,
    }));
  }

  handleIncorrectAnswer() {
    this.setState(state => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      showAnswer: false,
    }));
  }

  handleRestart() {
    this.setState({
      currentQuestionIndex: 0,
      correctAnswerCount: 0,
      showAnswer: false,
    });
  }

  render() {
    const { deck } = this.props.navigation.state.params;
    const {
      currentQuestionIndex,
      correctAnswerCount,
      showAnswer,
    } = this.state;

    if (currentQuestionIndex === deck.questions.length) {
      clearLocalNotification();
      return (
        <View style={styles.container} >
          <Text style={styles.text}>
            Your score: {correctAnswerCount} out of {deck.questions.length}
          </Text>
          <PrimaryButton name="Restart Quiz" onPress={this.handleRestart} />
          <PrimaryButton name="Back to Deck" onPress={() => this.props.navigation.goBack()} />
        </View>
      );
    }

    return (
      <View style={styles.container} >
        <Text>{this.state.currentQuestionIndex + 1} / {deck.questions.length}</Text>
        {showAnswer ?
          <Text style={styles.text}>{deck.questions[currentQuestionIndex].answer}</Text> :
          <Text style={styles.text}>{deck.questions[currentQuestionIndex].question}</Text>}
        {showAnswer ?
          <PrimaryButton name="Show Question" onPress={() => this.setState({ showAnswer: false })} /> :
          <PrimaryButton name="Show Answer" onPress={() => this.setState({ showAnswer: true })} />}
        <PrimaryButton name="Correct" onPress={this.handleCorrectAnswer} />
        <PrimaryButton name="Incorrect" onPress={this.handleIncorrectAnswer} />
      </View>
    );
  }
}

Quiz.propTypes = propTypes;

export default Quiz;
