import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class MainMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  findGame = () => this.props.navigation.navigate('Game');

  render() {
    return (
      <View>
        <Text>Doom Doom Shot</Text>
        <Button title="Find game" onPress={this.findGame} />
      </View>
    );
  }
}
