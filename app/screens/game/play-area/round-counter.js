import PropTypes from 'prop-types';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import {Text, StyleSheet} from 'react-native';
import {FONT_FAMILY_SEMI_BOLD} from '../../../constants';

const height = 20;
const styles = StyleSheet.create({
  round: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    height,
    paddingHorizontal: 12,
    borderRadius: height / 2,
    backgroundColor: 'black',
  },
  roundText: {
    fontFamily: FONT_FAMILY_SEMI_BOLD,
    fontSize: 11,
    color: 'white',
  },
});

const RoundCounter = props => (
  <Ripple style={styles.round} onPress={props.onPress} rippleColor="white">
    <Text style={styles.roundText}>
      {props.round} / {props.maxRounds}
    </Text>
  </Ripple>
);

RoundCounter.propTypes = {
  round: PropTypes.number.isRequired,
  maxRounds: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RoundCounter;
