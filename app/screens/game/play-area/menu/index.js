import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, TouchableOpacity, StyleSheet, View} from 'react-native';
import {position, transparentize} from 'polished';

import Item from './item';
import Logo from './logo';

const logoSize = 32;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...position('absolute', 0),
    backgroundColor: transparentize(0.15, 'white'),
  },
  items: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default class Menu extends Component {
  static propTypes = {
    actionButtonSize: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    padding: PropTypes.number.isRequired,
    sound: PropTypes.bool.isRequired,
    toggleSound: PropTypes.func.isRequired,
    quit: PropTypes.func.isRequired,
  };

  forfeit = () =>
    Alert.alert(
      'Are you sure?',
      'If you leave now, this game will be counted as a loss.',
      [
        {text: 'Cancel'},
        {
          text: 'Forfeit',
          onPress: this.props.quit,
        },
      ],
      {cancelable: false}
    );

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, {padding: this.props.padding}]}
        onPress={this.props.onClose}
      >
        <View style={styles.items}>
          <Item style={styles.item} onPress={this.forfeit}>
            Forfeit game
          </Item>
          <Item style={styles.item} onPress={this.props.toggleSound}>
            Sound {this.props.sound ? 'off' : 'on'}
          </Item>
          <Item last style={styles.item} onPress={this.props.onClose}>
            Resume
          </Item>
        </View>
        <View
          style={{marginBottom: (this.props.actionButtonSize - logoSize) / 2}}
        >
          <Logo height={logoSize} />
        </View>
      </TouchableOpacity>
    );
  }
}
