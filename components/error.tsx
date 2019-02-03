import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { theme } from '../helpers/theme';
import Content from './content';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Error: React.SFC<Props> = ({ children, style }) => (
  <View style={style}>
    <Content>{children}</Content>
  </View>
);

const StyledError = styled(Error)`
  padding: 10px 15px;
  border-radius: 4px;
  background-color: #000;
  box-shadow: ${theme.shadow};
  margin: 40px 0;
`;

export default StyledError;
