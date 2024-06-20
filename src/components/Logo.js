// src/components/Header.js
import React from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
`;

const Logo = () => {
  return (
    <ImageContainer>
      <StyledImage src="/images/logo.png" alt=" Logo" />
    </ImageContainer>
  );
};

export default Logo;
