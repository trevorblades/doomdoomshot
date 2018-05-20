import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import socket from '../../../socket';
import {ACTION_RELOAD, ACTION_SHOOT, ACTIONS} from '../../../common';

import ActionButton from './action-button';
import Bullets from './bullets';
import Menu from './menu';
import RoundCounter from './round-counter';
import Player from './player';
import Progress from './progress';

const padding = 16;
const actionButtonSize = 84;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  padded: {
    padding,
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

export default class PlayArea extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    maxAmmo: PropTypes.number.isRequired,
    maxHealth: PropTypes.number.isRequired,
    maxRounds: PropTypes.number.isRequired,
    lastTick: PropTypes.number.isRequired,
    nextTick: PropTypes.number,
    quit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    nextTick: null,
  };

  state = {
    sound: false,
    menuOpen: false,
  };

  openMenu = () => this.setState({menuOpen: true});

  closeMenu = () => this.setState({menuOpen: false});

  toggleSound = () => this.setState(prevState => ({sound: !prevState.sound}));

  render() {
    // TODO: make this socket reaching-in more declarative or something and
    // respond to connect events, set the socket in state, pass it down, etc.
    const player = this.props.game[socket.id];
    const ammo = Number(player.ammo);
    const opponent = this.props.game[
      socket.id === this.props.game.player1
        ? this.props.game.player2
        : this.props.game.player1
    ];
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.padded, styles.rowTop]}>
          <Player
            color="blue"
            lifeRemaining={Number(opponent.health)}
            maxHealth={this.props.maxHealth}
          >
            {opponent.name}
          </Player>
          <RoundCounter
            round={Number(this.props.game.round)}
            maxRounds={this.props.maxRounds}
            onPress={this.openMenu}
          />
        </View>
        <View style={styles.action} transform={[{scaleX: -1}]}>
          <Text style={styles.actionText}>{opponent.action}</Text>
        </View>
        <Progress
          nextTick={this.props.nextTick}
          lastTick={this.props.lastTick}
        />
        <View style={styles.action}>
          <Text style={styles.actionText}>{player.action}</Text>
        </View>
        <View style={[styles.padded, styles.rowBottom]}>
          <View style={styles.row}>
            <Player
              lifeRemaining={Number(player.health)}
              maxHealth={this.props.maxHealth}
            >
              {player.name}
            </Player>
            <Bullets ammo={ammo} maxAmmo={this.props.maxAmmo} />
          </View>
          <View style={[styles.row, styles.actionButtons]}>
            {ACTIONS.map(action => (
              <ActionButton
                key={action}
                size={actionButtonSize}
                disabled={
                  (action === ACTION_RELOAD && ammo === this.props.maxAmmo) ||
                  (action === ACTION_SHOOT && !ammo)
                }
                selected={action === player.selected}
              >
                {action}
              </ActionButton>
            ))}
          </View>
        </View>
        <Menu
          padding={padding}
          actionButtonSize={actionButtonSize}
          onClose={this.closeMenu}
          sound={this.state.sound}
          toggleSound={this.toggleSound}
          quit={this.props.quit}
          visible={this.state.menuOpen}
        />
      </View>
    );
  }
}
