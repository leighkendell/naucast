import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';
import Content from './content';

interface Props {
  location: string;
  date: string;
  time: string;
  style?: StyleProp<ViewStyle>;
}

const DateLocation: React.SFC<Props> = ({ location, date, time, style }) => (
  <View style={style}>
    <Content weight="bold">{location}</Content>
    <Content>{date}</Content>
    <Content>{time}</Content>
  </View>
);

const StyledDateLocation = styled(DateLocation)`
  align-self: flex-start;
`;

export default StyledDateLocation;
