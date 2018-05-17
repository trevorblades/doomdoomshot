import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

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
    socket.open();
    socket.on('connect', this.onConnect);
    socket.on('connect_error', this.onConnectError);
    socket.on('reconnect', this.onReconnect);
    socket.on('disconnect', this.quit);
    socket.on('message', this.onMessage);
  }

  componentWillUnmount() {
    socket.close();
    socket.off('connect', this.onConnect);
    socket.off('connect_error', this.onConnectError);
    socket.off('reconnect', this.onReconnect);
    socket.off('disconnect', this.quit);
    socket.off('message', this.onMessage);
  }

  onConnect = () => this.setState({connected: true});

  onConnectError = error => console.log(error.message);

  onReconnect = () => this.setState({connected: true});

  onMessage = game => this.setState({game});

  quit = () => this.props.navigation.navigate('Menu');

  forfeit = () => {
    Alert.alert(
      'Are you sure?',
      'If you leave now, this game will be counted as a loss.',
      [
        {text: 'Cancel'},
        {
          text: 'Forfeit',
          onPress: this.quit,
        },
      ],
      {cancelable: false}
    );
  };

  render() {
    if (this.state.connected && this.state.game) {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Player lifeRemaining={2}>{this.state.game.player2}</Player>
            <Button title="Forfeit" onPress={this.forfeit} />
            <Player other lifeRemaining={1}>
              {this.state.game.player1}
            </Player>
          </View>
          <View style={[styles.row, styles.plays]}>
            <Text style={styles.play}>
              {this.state.game[this.state.game.player1]}
            </Text>
            <View transform={[{scaleX: -1}]}>
              <Text style={styles.play}>
                {this.state.game[this.state.game.player2]}
              </Text>
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
        <Button title="Cancel" onPress={this.quit} />
      </View>
    );
  }
}
