import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Ripple from 'react-native-material-ripple';
import {Text, StyleSheet} from 'react-native';
import {size} from 'polished';
import socket from '../../../socket';

const styles = StyleSheet.create({
  container: {
    ...size(84),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  selected: {
    backgroundColor: 'lightgrey',
  },
  text: {
    fontSize: 50,
  },
});

export default class ActionButton extends Component {
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
