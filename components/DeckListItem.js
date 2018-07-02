import PropType from 'prop-types';
import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { tomato, gray } from '../utils/colors';

const propTypes = {
  deck: PropType.object.isRequired,
  onPress: PropType.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: tomato,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  numberOfCards: {
    color: gray,
  },
});

class DeckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1),
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { bounceValue } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start((() => {
      this.props.onPress(this.props.deck);
    }));
  }

  render() {
    const { deck } = this.props;
    const { bounceValue } = this.state;

    return (
      <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.container}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.numberOfCards}>{deck.questions.length} cards</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

    );
  }
}

DeckListItem.propTypes = propTypes;

export default DeckListItem;
