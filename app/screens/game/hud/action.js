import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Ripple from 'react-native-material-ripple';
import {Text, StyleSheet} from 'react-native';
import socket from '../../../socket';

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 12,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  selected: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 50,
  },
});

export default class Action extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    selected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  onPress = () => socket.send(this.props.children);

  render() {
    return (
      <Ripple
        disabled={this.props.disabled}
        onPress={this.onPress}
        style={[
          styles.container,
          this.props.disabled ? styles.disabled : null,
          this.props.selected ? styles.selected : null,
        ]}
      >
        <Text style={styles.text}>{this.props.children}</Text>
      </Ripple>
    );
  }
}
