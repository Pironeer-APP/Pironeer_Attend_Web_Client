import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { COLORS } from '../utils/theme'; // Assuming COLORS is exported from Theme

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

export const TinyLoader = () => (
  <TinyLoaderContainer>
    <ClipLoader size={20} color={COLORS.icon_gray} />
  </TinyLoaderContainer>
);

export const MediumLoader = () => (
  <MediumLoaderContainer>
    <ClipLoader size={50} color={COLORS.green} />
  </MediumLoaderContainer>
);
