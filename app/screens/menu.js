import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const headingFontSize = 48;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48,
  },
  heading: {
    marginBottom: 'auto',
    fontWeight: '800',
    fontSize: headingFontSize,
    lineHeight: headingFontSize,
  },
});

export default class MainMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  findGame = () => this.props.navigation.navigate('Game');

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Doom Doom Shot</Text>
        <Button title="Find game" onPress={this.findGame} />
      </View>
    );
  }
}
