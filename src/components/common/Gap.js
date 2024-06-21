import React from 'react';
import styled from 'styled-components';

const VerticalGap = styled.div`
  height: ${(props) => props.height}px;
`;

const HorizontalGap = styled.div`
  width: ${(props) => props.width}px;
`;

const Gap = ({ height = 20 }) => <VerticalGap height={height} />;
const GapH = ({ width = 20 }) => <HorizontalGap width={width} />;

export default Gap;
export { GapH };
