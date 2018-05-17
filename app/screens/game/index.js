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
  status: {
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
    game: null,
    status: 'Connecting',
  };

  componentDidMount() {
    socket.open();
    socket.on('message', this.onMessage);
    socket.on('disconnect', this.quit);
  }

  componentWillUnmount() {
    socket.close();
    socket.off('message', this.onMessage);
    socket.off('disconnect', this.quit);
  }

  onMessage = state => this.setState(state);

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
    if (this.state.game) {
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
        <Text style={styles.status}>{`${this.state.status}...`}</Text>
        <ActivityIndicator size="large" />
        <Button title="Cancel" onPress={this.quit} />
      </View>
    );
  }
}
