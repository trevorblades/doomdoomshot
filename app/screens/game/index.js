import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Text, View, StyleSheet, ActivityIndicator} from 'react-native';

import socket from '../../socket';
import Option from './option';
import Player from './player';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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

  state = {
    connected: false,
    message: '',
  };

  componentDidMount() {
    setTimeout(() => socket.open(), 2000);
    socket.on('connect', this.onConnect);
    socket.on('message', this.onMessage);
    socket.on('disconnect', this.onDisconnect);
  }

  componentWillUnmount() {
    socket.close();
    socket.off('connect', this.onConnect);
    socket.off('message', this.onMessage);
    socket.off('disconnect', this.onDisconnect);
  }

  onConnect = () => this.setState({connected: true});

  onMessage = message => this.setState({message});

  onDisconnect = () => this.setState({connected: false});

  quitGame = () => this.props.navigation.navigate('Menu');

  render() {
    if (!this.state.connected) {
      return (
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.activityText}>Connecting...</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Player lifeRemaining={2}>Player 1</Player>
          <Button title="Quit game" onPress={this.quitGame} />
          <Player other lifeRemaining={1}>
            Pla
          </Player>
        </View>
        <View style={[styles.row, styles.plays]}>
          <Text style={styles.play}>{this.state.message}</Text>
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
