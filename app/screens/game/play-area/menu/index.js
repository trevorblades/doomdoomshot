import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal, TouchableOpacity, StyleSheet, View} from 'react-native';
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
    visible: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Modal transparent animationType="fade" visible={this.props.visible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.props.onClose}
          style={[styles.container, {padding: this.props.padding}]}
        >
          <View style={styles.items}>
            <Item style={styles.item} onPress={this.props.quit}>
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
      </Modal>
    );
  }
}
