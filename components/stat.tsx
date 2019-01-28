import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';
import Content from './content';
import IconRain from './icon-rain';
import IconWind from './icon-wind';

interface Props {
  text: string;
  icon?: 'rain' | 'wind';
  style?: StyleProp<ViewStyle>;
}

const Stat: React.SFC<Props> = ({ text, style, icon }) => (
  <View style={style}>
    {icon === 'rain' && <IconRain />}
    {icon === 'wind' && <IconWind />}

    <Content align="center" weight="bold">
      {text}
    </Content>
  </View>
);

const StyledStat = styled(Stat)`
  margin: 0 20px;
`;

export default StyledStat;
