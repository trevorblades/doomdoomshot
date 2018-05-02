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
    game: null,
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

  onMessage = game => this.setState({game});

  onDisconnect = () => this.setState({connected: false});

  quitGame = () => this.props.navigation.navigate('Menu');

  render() {
    if (this.state.connected && this.state.game) {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Player lifeRemaining={2}>{this.state.game.player2}</Player>
            <Text>{this.state.game.count}</Text>
            <Button title="Quit game" onPress={this.quitGame} />
            <Player other lifeRemaining={1}>
              {this.state.game.player1}
            </Player>
          </View>
          <View style={[styles.row, styles.plays]}>
            <Text style={styles.play}>{this.state.game.selection1}</Text>
            <View transform={[{scaleX: -1}]}>
              <Text style={styles.play}>{this.state.game.selection2}</Text>
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

    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.activityText}>Connecting...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
