import { LinearGradient } from 'expo';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { theme } from '../helpers/theme';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const gradient = [theme.colors.darkBlue, theme.colors.lightBlue];

const Background: React.SFC<Props> = ({ style }) => <LinearGradient style={style} colors={gradient} />;

const StyledBackground = styled(Background)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default StyledBackground;
