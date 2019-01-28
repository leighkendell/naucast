import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import styled from 'styled-components';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Stats: React.SFC<Props> = ({ style, children }) => <View style={style}>{children}</View>;

const StyledStats = styled(Stats)`
  display: flex;
  flex-direction: row;
`;

export default StyledStats;
