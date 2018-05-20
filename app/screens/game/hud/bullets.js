import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Svg} from 'expo'; // eslint-disable-line import/named
import {View, StyleSheet} from 'react-native';
import {size} from 'polished';

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
      const bulletColor = i === this.props.maxAmmo - 1 ? 'gold' : 'black';
      bullets.push(
        <Svg
          {...size(16)}
          key={i}
          style={{
            marginLeft: i ? 2 : null,
            transform: [{rotate: '0deg'}],
          }}
          viewBox="0 0 16 16"
        >
          <Svg.Path
            fill={this.props.ammo > i ? bulletColor : 'lightgrey'}
            d="M14.3294083,1.67039855 C14.3294083,1.67039855 16.0456286,4.75959506 13.9861643,6.8190594 L9.18074749,2.0136426 C11.2402118,-0.045821735 14.3294083,1.67039855 14.3294083,1.67039855 Z M8.49425937,2.70013072 L13.2996762,7.50554751 L7.80777126,12.9974524 L3.00235447,8.19203562 L8.49425937,2.70013072 Z M1.28613419,9.22176779 C1.6652711,8.84263088 2.28362634,8.84628372 2.65707164,9.21972902 L6.78007787,13.3427352 C7.1580888,13.7207462 7.15981928,14.3318925 6.77803909,14.7136727 C6.39890217,15.0928096 5.78054694,15.0891568 5.40710164,14.7157115 L1.28409541,10.5927052 C0.906084479,10.2146943 0.904353996,9.60354798 1.28613419,9.22176779 Z"
          />
        </Svg>
      );
    }

    return bullets;
  }

  render() {
    return <View style={styles.container}>{this.renderBullets()}</View>;
  }
}
