import React from 'react';
import styled from 'styled-components';

const COLORS = {
  green: '#00FF00',
};

const IsFaceBoxContainer = styled.div`
  width: 77px;
  height: 25px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
`;

const IsFaceText = styled.span`
  color: black;
  font-size: 16px;
`;

const IsFaceBox = (props) => {
  const getBackgroundColor = () => {
    if (props.isFace === 0) {
      return COLORS.green;
    } else if (props.isFace === 1) {
      return 'skyblue';
    }
    return 'transparent';
  };

  return (
    <IsFaceBoxContainer bgColor={getBackgroundColor()}>
      <IsFaceText>{props.isFace === 0 ? 'ONLINE' : 'OFFLINE'}</IsFaceText>
    </IsFaceBoxContainer>
  );
}

export default IsFaceBox;
