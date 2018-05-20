import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONT_FAMILY_BOLD} from '../../../../constants';
import Heart from './heart';

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
    for (let i = 0; i < this.props.maxHealth; i++) {
      hearts.push(
        <View
          key={i}
          style={{marginRight: i === this.props.maxHealth - 1 ? null : 2}}
        >
          <Heart inactive />
          <Heart
            active={this.props.lifeRemaining > i}
            color={this.props.opponent ? 'blue' : 'red'}
          />
        </View>
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
