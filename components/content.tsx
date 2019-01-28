import React from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components';
import { theme } from '../helpers/theme';

interface Props {
  style?: StyleProp<ViewStyle>;
  size?: number;
  weight?: 'light' | 'regular' | 'bold';
  align?: 'left' | 'center' | 'right';
}

const Content: React.SFC<Props> = ({ children, style }) => <Text style={style}>{children}</Text>;

const StyledContent = styled(Content)`
  ${props => css`
    font-family: ${`font-${props.weight}`};
    font-size: ${props.size};
    text-align: ${props.align};
    color: #fff;
    text-shadow: ${theme.shadow};
  `}
`;

StyledContent.defaultProps = {
  size: 14,
  weight: 'regular',
  align: 'left',
};

export default StyledContent;
