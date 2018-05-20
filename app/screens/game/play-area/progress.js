import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Animated, View, StyleSheet, Easing} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
  },
  bar: {
    height: 4,
    width: '200%',
    backgroundColor: 'black',
  },
});

export default class Progress extends Component {
  static propTypes = {
    nextTick: PropTypes.number,
  };

  static defaultProps = {
    nextTick: null,
  };

  state = {
    width: 0,
    percent: new Animated.Value(0),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextTick && nextProps.nextTick !== this.props.nextTick) {
      this.state.percent.setValue(0);
      this.animate(nextProps.nextTick);
    }
  }

  onLayout = event =>
    this.setState({width: event.nativeEvent.layout.width}, () =>
      this.animate(this.props.nextTick)
    );

  animate = nextTick =>
    Animated.timing(this.state.percent, {
      toValue: 1,
      easing: Easing.linear,
      duration: nextTick - Date.now(),
      useNativeDriver: true,
    }).start();

  render() {
    return (
      <View onLayout={this.onLayout} style={styles.container}>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                {translateX: this.state.width * -1},
                {scaleX: this.state.percent},
              ],
            },
          ]}
        />
      </View>
    );
  }
}
