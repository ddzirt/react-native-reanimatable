import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Reanimatable } from 'react-native-reanimatable';
import Animated from 'react-native-reanimated';

const { width: windowWidth } = Dimensions.get('window');

const colors = {
  red: '#e74c3c',
  white: 'white',
  green: '#2ecc71',
};

const size = 100;

const config = {
  duration: 2000,
  keyframes: {
    0: {
      opacity: 0,
      scale: 1,
      left: 0,
      top: 0,
    },
    25: {
      opacity: 0.7,
      scale: 0.3,
      left: (windowWidth - size) / 4,
      top: 100,
    },
    50: {
      opacity: 1,
      scale: 1,
      left: (windowWidth - size) / 2,
      top: 0,
    },
    75: {
      opacity: 0.7,
      scale: 0.3,
      left: (windowWidth - size) / 1.5,
      top: 100,
    },
    100: {
      opacity: 0,
      scale: 1,
      left: windowWidth - size,
      top: 0,
    },
  },
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
  },
  animationContainer: {
    marginBottom: 100,
  },
  animatableView: {
    height: size,
    backgroundColor: colors.red,
    width: size,
  },
  button: {
    position: 'absolute',
    padding: 8,
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: colors.green,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.white,
  },
});

export default class App extends React.PureComponent {
  state = {
    value: false,
  };

  toggleAnimation() {
    this.setState((state) => ({ value: !state.value }));
  }

  render() {
    return (
      <View style={s.container}>
        <Reanimatable
          config={config}
          value={this.state.value}
          containerStyle={s.animationContainer}
        >
          {({ scale, ...animationValues }) => (
            <Animated.View
              style={[
                s.animatableView,
                {
                  ...animationValues,
                  transform: [{ scale }],
                },
              ]}
            />
          )}
        </Reanimatable>

        <TouchableOpacity
          onPress={() => this.toggleAnimation()}
          style={s.button}
        >
          <Text style={s.buttonText}>Toggle animation</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
