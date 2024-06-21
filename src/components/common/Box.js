import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme';

const StyledBox = styled.div`
  background-color: ${COLORS.gray};
  border-radius: 15px;
`;

const StyledPaddingBox = styled.div`
  background-color: ${COLORS.gray};
  border-radius: 15px;
  padding: 15px 25px;
  margin-top: 10px;
`;

export const Box = ({ children }) => <StyledBox>{children}</StyledBox>;
export const PaddingBox = ({ children }) => (
  <StyledPaddingBox>{children}</StyledPaddingBox>
);
