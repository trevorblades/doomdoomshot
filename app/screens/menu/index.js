import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FONT_FAMILY_SEMI_BOLD} from '../../constants';
import Logo from './logo';

const buttonHeight = 64;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 48,
  },
  logo: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonBase: {
    alignItems: 'center',
    justifyContent: 'center',
    height: buttonHeight,
  },
  button: {
    marginTop: 'auto',
    paddingHorizontal: buttonHeight * 0.75,
    borderRadius: buttonHeight / 2,
    backgroundColor: 'red',
  },
  buttonText: {
    fontFamily: FONT_FAMILY_SEMI_BOLD,
    fontSize: 18,
    color: 'white',
  },
});

export default class MainMenu extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo width={200} />
        </View>
        {this.props.loading ? (
          <View style={styles.buttonBase}>
            <ActivityIndicator color="black" />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.buttonBase, styles.button]}
            onPress={this.props.startGame}
          >
            <Text style={styles.buttonText}>Find game</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
