import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

class FadeInView extends React.Component {
  public state = {
    fadeAnim: new Animated.Value(0.4),
    translate: new Animated.Value(100),
  };

  public componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.state.translate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  public render() {
    const { children } = this.props;
    const { fadeAnim, translate } = this.state;

    return (
      <Animated.View
        style={{
          height: '100%',
          width: '100%',
          opacity: fadeAnim,
          transform: [{ translateY: translate }],
        }}
      >
        {children}
      </Animated.View>
    );
  }
}

export default FadeInView;
