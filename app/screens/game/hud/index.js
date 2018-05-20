import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import socket from '../../../socket';
import {ACTION_RELOAD, ACTION_SHOOT, ACTIONS} from '../../../common';
import {FONT_FAMILY_SEMI_BOLD} from '../../../constants';

import ActionButton from './action-button';
import Bullets from './bullets';
import Player from './player';
import Progress from './progress';

const roundHeight = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  padded: {
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTop: {
    paddingBottom: 0,
  },
  rowBottom: {
    paddingTop: 0,
  },
  round: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    height: roundHeight,
    paddingHorizontal: 12,
    borderRadius: roundHeight / 2,
    backgroundColor: 'black',
  },
  roundText: {
    fontFamily: FONT_FAMILY_SEMI_BOLD,
    fontSize: 11,
    color: 'white',
  },
  actionButtons: {
    marginTop: 16,
  },
  action: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  actionText: {
    fontSize: 80,
  },
});

export default class Hud extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    maxAmmo: PropTypes.number.isRequired,
    maxHealth: PropTypes.number.isRequired,
    maxRounds: PropTypes.number.isRequired,
    lastTick: PropTypes.number.isRequired,
    nextTick: PropTypes.number,
  };

  static defaultProps = {
    nextTick: null,
  };

  render() {
    const player1 = this.props.game[this.props.game.player1];
    const player2 = this.props.game[this.props.game.player2];

    // TODO: make this socket reaching-in more declarative or something and
    // respond to connect events, set the socket in state, pass it down, etc.
    const currentPlayer = this.props.game[socket.id];
    const ammo = Number(currentPlayer.ammo);
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.padded, styles.rowTop]}>
          <Player
            color="blue"
            lifeRemaining={Number(player2.health)}
            maxHealth={this.props.maxHealth}
          >
            {this.props.game.player2}
          </Player>
          <View style={styles.round}>
            <Text style={styles.roundText}>
              {this.props.game.round} / {this.props.maxRounds}
            </Text>
          </View>
        </View>
        <View style={styles.action} transform={[{scaleX: -1}]}>
          <Text style={styles.actionText}>{player2.action}</Text>
        </View>
        <Progress
          nextTick={this.props.nextTick}
          lastTick={this.props.lastTick}
        />
        <View style={styles.action}>
          <Text style={styles.actionText}>{player1.action}</Text>
        </View>
        <View style={[styles.padded, styles.rowBottom]}>
          <View style={styles.row}>
            <Player
              lifeRemaining={Number(player1.health)}
              maxHealth={this.props.maxHealth}
            >
              {this.props.game.player1}
            </Player>
            <Bullets ammo={ammo} maxAmmo={this.props.maxAmmo} />
          </View>
          <View style={[styles.row, styles.actionButtons]}>
            {ACTIONS.map(action => (
              <ActionButton
                key={action}
                disabled={
                  (action === ACTION_RELOAD && ammo === this.props.maxAmmo) ||
                  (action === ACTION_SHOOT && !ammo)
                }
                selected={action === currentPlayer.selected}
              >
                {action}
              </ActionButton>
            ))}
          </View>
        </View>
      </View>
    );
  }
}
