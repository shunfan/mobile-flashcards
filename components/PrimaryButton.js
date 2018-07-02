import PropType from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { tomato, white } from '../utils/colors';

const propTypes = {
  name: PropType.string.isRequired,
  onPress: PropType.func.isRequired,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    width: 250,
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tomato,
    borderRadius: 100,
  },
  buttonName: {
    color: white,
    fontSize: 15,
    textAlign: 'center',
  },
});

function PrimaryButton({ name, onPress }) {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text style={styles.buttonName}>{name}</Text>
    </TouchableOpacity>
  );
}

PrimaryButton.propTypes = propTypes;

export default PrimaryButton;
