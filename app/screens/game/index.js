import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import socket from '../../socket';
import PlayArea from './play-area';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginBottom: 12,
  },
});

export default class Game extends Component {
  static propTypes = {
    quitGame: PropTypes.func.isRequired,
  };

  state = {
    status: 'Connecting',
  };

  componentDidMount() {
    socket.open();
    socket.on('message', this.onMessage);
    socket.on('disconnect', this.props.quitGame);
  }

  componentWillUnmount() {
    socket.close();
    socket.off('message', this.onMessage);
    socket.off('disconnect', this.props.quitGame);
  }

  onMessage = state => this.setState(state);

  render() {
    if (this.state.game) {
      return (
        <PlayArea
          game={this.state.game}
          maxAmmo={this.state.maxAmmo}
          maxHealth={this.state.maxHealth}
          maxRounds={this.state.maxRounds}
          lastTick={this.state.lastTick}
          nextTick={this.state.nextTick}
          quit={this.props.quitGame}
        />
      );
    }

    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.status}>{`${this.state.status}...`}</Text>
        <ActivityIndicator size="large" />
        <Button title="Cancel" onPress={this.props.quitGame} />
      </View>
    );
  }
}
