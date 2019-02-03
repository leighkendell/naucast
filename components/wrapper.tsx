import { Constants } from 'expo';
import React from 'react';
import { ScrollView, ScrollViewProperties, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { theme } from '../helpers/theme';

interface Props extends ScrollViewProperties {
  style?: StyleProp<ViewStyle>;
}

const Wrapper: React.SFC<Props> = ({ children, refreshControl, style }) => (
  <ScrollView refreshControl={refreshControl} contentContainerStyle={style}>
    {children}
  </ScrollView>
);

const StyledWrapper = styled(Wrapper)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${theme.padding};
`;

export default StyledWrapper;
