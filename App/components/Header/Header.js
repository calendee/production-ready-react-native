import React from 'react';
import { Image, TouchableOpacity, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const gearImage = require('./images/gear.png');
const warningImage = require('./images/warning.png');

const Header = ({ isConnected, onPress, onWarningPress }) => (
  <SafeAreaView style={styles.container}>
    {!isConnected && (
      <TouchableOpacity onPress={onWarningPress} style={[styles.button, styles.buttonLeft]}>
        <Image resizeMode="contain" source={warningImage} style={styles.icon} />
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image resizeMode="contain" source={gearImage} style={styles.icon} />
    </TouchableOpacity>
  </SafeAreaView>
);

Header.propTypes = {
  onPress: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  onWarningPress: PropTypes.func.isRequired,
};

export default Header;
