import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { COLORS } from '../../utils/theme';

const TinyLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MediumLoaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
`;

const TinyLoader = () => (
  <TinyLoaderContainer>
    <ClipLoader size={20} color={COLORS.icon_gray} />
  </TinyLoaderContainer>
);

const MediumLoader = () => (
  <MediumLoaderContainer>
    <ClipLoader size={50} color={COLORS.green} />
  </MediumLoaderContainer>
);

export { TinyLoader, MediumLoader };