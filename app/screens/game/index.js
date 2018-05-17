import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import socket from '../../socket';
import Hud from './hud';

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
    navigation: PropTypes.object.isRequired,
  };

  state = {
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

  render() {
    if (this.state.game) {
      return <Hud {...this.state} quit={this.quit} />;
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
