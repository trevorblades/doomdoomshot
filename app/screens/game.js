import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

export default class Game extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  quitGame = () => this.props.navigation.navigate('Menu');

  render() {
    return (
      <View>
        <Text>Game!</Text>
        <Button title="Quit game" onPress={this.quitGame} />
      </View>
    );
  }
}
