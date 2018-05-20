import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {View, Text, StyleSheet} from 'react-native';
import {FONT_FAMILY_BOLD} from '../../../constants';

const styles = StyleSheet.create({
  alignRight: {
    alignItems: 'flex-end',
  },
  name: {
    marginBottom: 4,
    fontFamily: FONT_FAMILY_BOLD,
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
    color: PropTypes.string,
  };

  static defaultProps = {
    color: 'red',
  };

  renderHearts() {
    const hearts = [];
    for (let i = 0; i < this.props.maxHealth; i++) {
      hearts.push(
        <MaterialIcons
          key={i}
          name="favorite"
          size={16}
          style={styles.heart}
          color={this.props.lifeRemaining > i ? this.props.color : 'black'}
        />
      );
    }

    return hearts;
  }

  render() {
    return (
      <View>
        <Text style={styles.name}>{this.props.children}</Text>
        <View style={styles.hearts}>{this.renderHearts()}</View>
      </View>
    );
  }
}
