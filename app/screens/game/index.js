import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Ripple from 'react-native-material-ripple';
import io from 'socket.io-client';
import {Button, Text, View, StyleSheet} from 'react-native';

import Option from './option';
import Player from './player';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plays: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  play: {
    fontSize: 100,
  },
});

export default class Game extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.onConnect);
    this.socket.on('event', this.onEvent);
    this.socket.on('disconnect', this.onDisconnect);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  onConnect = () => console.log('connected!!!');

  onEvent = data => console.log(data);

  onDisconnect = () => console.log('disconnected');

  quitGame = () => this.props.navigation.navigate('Menu');

  renderOption(option) {
    return (
      <Ripple style={styles.option}>
        <Text style={styles.optionText}>{option}</Text>
      </Ripple>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Player lifeRemaining={2}>Player 1</Player>
          <Player other lifeRemaining={1}>
            Pla
          </Player>
        </View>
        <Button title="Quit game" onPress={this.quitGame} />
        <View style={[styles.row, styles.plays]}>
          <Text style={styles.play}>👍</Text>
          <View transform={[{scaleX: -1}]}>
            <Text style={styles.play}>👉</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Option>👍</Option>
          <Option>🙅</Option>
          <Option>👉</Option>
        </View>
      </View>
    );
  }
}
