import { Constants } from 'expo';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { theme } from '../helpers/theme';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Wrapper: React.SFC<Props> = ({ children, style }) => <View style={style}>{children}</View>;

const StyledWrapper = styled(Wrapper)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${theme.padding};
  padding-top: ${Constants.statusBarHeight + 40};
`;

export default StyledWrapper;
