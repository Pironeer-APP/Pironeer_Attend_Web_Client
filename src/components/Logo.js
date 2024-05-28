// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import LogoImg from '../assets/Logo.png'; // Adjust the path as necessary



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


const Logo =  () => {
  return (
    <ImageContainer>
      <StyledImage src={LogoImg} alt=" Logo" />
    </ImageContainer>
  );
}

export default Logo;
