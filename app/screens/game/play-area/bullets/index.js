import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Bullet from './bullet';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
});

export default class Bullets extends Component {
  static propTypes = {
    ammo: PropTypes.number.isRequired,
    maxAmmo: PropTypes.number.isRequired,
  };

  renderBullets() {
    const bullets = [];
    for (let i = 0; i < this.props.maxAmmo; i++) {
      const isLast = i === this.props.maxAmmo - 1;
      bullets.push(
        <View key={i} style={{marginLeft: isLast.last ? 2 : null}}>
          <Bullet inactive />
          <Bullet
            color={isLast ? 'gold' : 'black'}
            active={this.props.ammo > i}
          />
        </View>
      );
    }

    return bullets;
  }

  render() {
    return <View style={styles.container}>{this.renderBullets()}</View>;
  }
}
