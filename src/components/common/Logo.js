import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  padding-top: 7rem;
`;

const StyledImage = styled.img`
  width: 4.8rem;
  height: 4.8rem;
`;

const Logo = () => {
  return (
    <ImageContainer>
      <StyledImage src="/Logo.png" alt=" Logo" />
    </ImageContainer>
  );
};

export default Logo;
