import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  alignRight: {
    alignItems: 'flex-end',
  },
  name: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  hearts: {
    flexDirection: 'row',
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  heart: {
    marginRight: 2,
  },
});

export default class Player extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    lifeRemaining: PropTypes.number.isRequired,
    maxHealth: PropTypes.number.isRequired,
    opponent: PropTypes.bool,
  };

  static defaultProps = {
    opponent: false,
  };

  renderHearts() {
    const hearts = [];
    const color = this.props.opponent ? 'blue' : 'red';
    for (let i = 0; i < this.props.maxHealth; i++) {
      hearts.push(
        <MaterialIcons
          key={i}
          name="favorite"
          size={16}
          style={styles.heart}
          color={this.props.lifeRemaining > i ? color : 'black'}
        />
      );
    }

    return hearts;
  }

  render() {
    return (
      <View style={this.props.opponent ? styles.alignRight : null}>
        <Text style={styles.name}>{this.props.children}</Text>
        <View style={[styles.hearts, this.props.opponent ? styles.rtl : null]}>
          {this.renderHearts()}
        </View>
      </View>
    );
  }
}
