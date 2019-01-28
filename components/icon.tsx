import { Svg } from 'expo';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { theme } from '../helpers/theme';

interface Props {
  width: string;
  height: string;
  style?: StyleProp<ViewStyle>;
}

const Icon: React.SFC<Props> = ({ width, height, children, style }) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="#fff" style={style}>
    {children}
  </Svg>
);

const StyledIcon = styled(Icon)`
  margin: 0 auto 10px;
  box-shadow: ${theme.shadow};
`;

export default StyledIcon;
