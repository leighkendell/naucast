import { format } from 'date-fns';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';
import Content from './content';

interface Props {
  location: string;
  dateTime: string;
  style?: StyleProp<ViewStyle>;
}

class DateLocation extends React.Component<Props> {
  public render() {
    const { style, dateTime, location } = this.props;

    return (
      <View style={style}>
        <Content weight="bold">{location}</Content>
        <Content>{this.formatDate(dateTime)}</Content>
        <Content>{this.formatTime(dateTime)}</Content>
      </View>
    );
  }

  private formatDate(dateTime: string) {
    return format(dateTime, 'dddd, D MMMM');
  }

  private formatTime(dateTime: string) {
    return format(dateTime, 'h:mma');
  }
}

const StyledDateLocation = styled(DateLocation)`
  align-self: flex-start;
`;

export default StyledDateLocation;
