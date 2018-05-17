import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TimerMixin from 'react-timer-mixin';
import round from 'lodash/round';
import reactMixin from 'react-mixin';
import {Alert, StyleSheet, View, Text, Button} from 'react-native';

import Option from './option';
import Player from './player';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  progress: {
    height: 8,
    backgroundColor: 'black',
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

@reactMixin.decorate(TimerMixin)
export default class Hud extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    lastTick: PropTypes.number.isRequired,
    nextTick: PropTypes.number.isRequired,
    quit: PropTypes.func.isRequired,
  };

  state = {
    tickProgress: 1,
  };

  componentDidMount() {
    this.requestAnimationFrame(this.tick);
  }

  tick = () => {
    const total = this.props.nextTick - this.props.lastTick;
    const elapsed = Date.now() - this.props.lastTick;
    const tickProgress = round(1 - elapsed / total, 3);
    this.setState({tickProgress}, () => this.requestAnimationFrame(this.tick));
  };

  forfeit = () => {
    Alert.alert(
      'Are you sure?',
      'If you leave now, this game will be counted as a loss.',
      [
        {text: 'Cancel'},
        {
          text: 'Forfeit',
          onPress: this.props.quit,
        },
      ],
      {cancelable: false}
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.progress,
            {
              transform: [{scaleX: this.state.tickProgress}],
            },
          ]}
        />
        <View style={styles.row}>
          <Player lifeRemaining={2}>{this.props.game.player2}</Player>
          <Button title="Forfeit" onPress={this.forfeit} />
          <Player other lifeRemaining={1}>
            {this.props.game.player1}
          </Player>
        </View>
        <View style={[styles.row, styles.plays]}>
          <Text style={styles.play}>
            {this.props.game[this.props.game.player1]}
          </Text>
          <View transform={[{scaleX: -1}]}>
            <Text style={styles.play}>
              {this.props.game[this.props.game.player2]}
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
}
