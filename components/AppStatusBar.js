import { Constants } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar, View } from 'react-native';

const propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

AppStatusBar.propTypes = propTypes;

export default AppStatusBar;
