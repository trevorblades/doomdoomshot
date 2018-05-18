import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';
import {size, transparentize} from 'polished';
import {MAX_AMMO} from '../../../constants';

const radius = 16;
const bulletRadius = radius / 5;
const pinSize = (radius - bulletRadius * 2) / 2;
const pinRadius = pinSize / 2;
const styles = StyleSheet.create({
  container: {
    ...size(radius * 2),
    borderRadius: radius,
    backgroundColor: transparentize(0.8, 'black'),
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'black',
  },
  pin: {
    ...size(pinSize),
    borderRadius: pinRadius,
    top: radius - pinRadius,
    left: radius - pinRadius,
  },
  bullet: {
    ...size(bulletRadius * 2),
    borderRadius: bulletRadius,
    top: radius - bulletRadius,
    left: radius - bulletRadius,
  },
  gold: {
    backgroundColor: 'red',
  },
  empty: {
    backgroundColor: 'white',
  },
});

const degreesPerBullet = 360 / MAX_AMMO;
export default class Ammo extends Component {
  static propTypes = {
    ammo: PropTypes.number.isRequired,
  };

  state = {
    rotation: new Animated.Value(0),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ammo !== this.props.ammo) {
      Animated.timing(this.state.rotation, {
        toValue: Math.max(0, nextProps.ammo - 1) / MAX_AMMO,
        easing: Easing.bounce,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }

  renderBullets() {
    const bullets = [];
    for (let i = 0; i < MAX_AMMO; i++) {
      const filledStyle = i === MAX_AMMO - 1 && styles.gold;
      bullets.push(
        <Fragment key={i}>
          <View
            style={[
              styles.circle,
              styles.bullet,
              i >= this.props.ammo ? styles.empty : filledStyle,
              {
                transform: [
                  {rotate: `${degreesPerBullet * i}deg`},
                  {translateY: radius / -2 - pinRadius / 2},
                ],
              },
            ]}
          />
          <View
            style={[
              styles.circle,
              styles.bullet,
              styles.empty,
              {
                transform: [
                  {rotate: `${degreesPerBullet * i + degreesPerBullet / 2}deg`},
                  {translateY: -radius - bulletRadius / 3},
                ],
              },
            ]}
          />
        </Fragment>
      );
    }

    return bullets;
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                rotate: this.state.rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-360deg'],
                }),
              },
            ],
          },
        ]}
      >
        {this.renderBullets()}
        <View style={[styles.circle, styles.pin]} />
      </Animated.View>
    );
  }
}