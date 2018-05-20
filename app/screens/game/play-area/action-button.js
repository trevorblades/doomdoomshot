import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Ripple from 'react-native-material-ripple';
import {Text, StyleSheet} from 'react-native';
import {size} from 'polished';
import socket from '../../../socket';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  selected: {
    backgroundColor: 'lightgrey',
  },
});

export default class ActionButton extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    selected: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
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
          size(this.props.size),
          {borderRadius: this.props.size / 3},
          this.props.disabled ? styles.disabled : null,
          this.props.selected ? styles.selected : null,
        ]}
      >
        <Text style={{fontSize: this.props.size / 1.75}}>
          {this.props.children}
        </Text>
      </Ripple>
    );
  }
}
