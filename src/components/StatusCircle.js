import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../utils/theme';

const StatusCircleContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${COLORS.light_gray};
  border-radius: 50%;
  border-width: 0.8px;
  border-style: solid;
  border-color: ${COLORS.textColor};
`;

const StatusCircle = () => <StatusCircleContainer />;

export default StatusCircle;
