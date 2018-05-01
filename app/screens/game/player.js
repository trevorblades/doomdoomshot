import PropTypes from 'prop-types';
import React, {Component} from 'react';
import padEnd from 'lodash/padEnd';
import repeat from 'lodash/repeat';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  name: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  alignRight: {
    textAlign: 'right',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

export default class Player extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    lifeRemaining: PropTypes.number.isRequired,
    other: PropTypes.bool,
  };

  static defaultProps = {
    other: false,
  };

  render() {
    return (
      <View>
        <Text
          style={[styles.name, this.props.other ? styles.alignRight : null]}
        >
          {this.props.children}
        </Text>
        <Text style={this.props.other ? styles.rtl : null}>
          {padEnd(
            repeat(this.props.other ? '💙' : '❤️', this.props.lifeRemaining),
            3,
            '🖤'
          )}
        </Text>
      </View>
    );
  }
}
