import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Ripple from 'react-native-material-ripple';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 12,
    overflow: 'hidden',
  },
  text: {
    fontSize: 50,
  },
});

export default class Option extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Ripple onPress={this.onPress} style={styles.container}>
        <Text style={styles.text}>{this.props.children}</Text>
      </Ripple>
    );
  }
}
