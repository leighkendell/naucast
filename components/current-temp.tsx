import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';
import Content from './content';

interface Props {
  temp: string;
  description: string;
  style?: StyleProp<ViewStyle>;
}

const CurrentTemp: React.SFC<Props> = ({ temp, description, style }) => (
  <View style={style}>
    <Content align="center" size={150} weight="light">
      {temp}
    </Content>
    <Content align="center">{description}</Content>
  </View>
);

const StyledCurrentTemp = styled(CurrentTemp)`
  margin: auto;
`;

export default StyledCurrentTemp;
