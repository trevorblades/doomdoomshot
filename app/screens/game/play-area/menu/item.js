import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FONT_FAMILY_SEMI_BOLD} from '../../../../constants';

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_FAMILY_SEMI_BOLD,
    fontSize: 24,
  },
});

const Item = props => (
  <TouchableOpacity
    style={{marginBottom: props.last ? 0 : 20}}
    onPress={props.onPress}
  >
    <Text style={styles.text}>{props.children}</Text>
  </TouchableOpacity>
);

Item.propTypes = {
  last: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};

Item.defaultProps = {
  last: false,
};

export default Item;
