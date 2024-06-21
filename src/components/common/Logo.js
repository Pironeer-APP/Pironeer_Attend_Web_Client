// src/components/Header.js
import React from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

const StyledImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
`;

const Logo = () => {
  return (
    <ImageContainer>
      <StyledImage src="/images/logo.png" alt=" Logo" />
    </ImageContainer>
  );
};

export default Logo;
