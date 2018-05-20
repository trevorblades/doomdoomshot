import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {Animated, StyleSheet} from 'react-native';
import {position} from 'polished';

const size = 16;
const styles = StyleSheet.create({
  absolute: position('absolute', 0),
});

export default class Bullet extends Component {
  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.string,
    inactive: PropTypes.bool,
  };

  static defaultProps = {
    active: false,
    color: 'black',
    inactive: false,
  };

  state = {
    animation: new Animated.Value(0),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    let style = null;
    if (!this.props.inactive) {
      style = [
        styles.absolute,
        {
          opacity: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
          transform: [
            {
              translateY: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, size * -2],
              }),
            },
            {
              rotate: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '45deg'],
              }),
            },
          ],
        },
      ];
    }

    return (
      <Animated.View style={style}>
        <MaterialIcons
          name="favorite"
          size={size}
          style={styles.heart}
          color={this.props.color}
        />
      </Animated.View>
    );
  }
}
