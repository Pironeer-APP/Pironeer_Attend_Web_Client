import React, { useState } from "react";
import styled from "styled-components";
import { StyledText } from "./Text";
import { COLORS } from "../../utils/theme";
import { ButtonContainerStyled } from "./Container";

const MainButtonStyled = styled(ButtonContainerStyled)`
  width: 100%;
  padding: 15px 20px;
  background-color: ${(props) => props.backgroundColor || COLORS.green};
  border-radius: 15px;
  margin-top: 2.5rem;
  margin-bottom: ${(props) => props.marginBottom}rem;
`;

const SmallButtonStyled = styled.button`
  background-color: ${(props) => props.backgroundColor || COLORS.green};
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize}px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1e1e1e; /* 어두운 배경 */
  color: white; /* 흰색 텍스트 */
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8); /* 더 강한 그림자 */
  text-align: center;
  width: 300px;
  border: 1px solid #333; /* 팝업 테두리 */
`;

const ModalButton = styled.button`
  background-color: ${(props) => props.color || "#333"}; /* 어두운 버튼 */
  color: ${(props) => props.textColor || "white"}; /* 흰색 텍스트 */
  border: 1px solid ${(props) => props.borderColor || "#555"}; /* 테두리 색 */
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6); /* 어두운 그림자 */
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#444"}; /* 밝은 회색 호버 효과 */
    transform: scale(1.05); /* 약간 확대 */
  }
`;

/* 일반 버튼 */
const MainButton = ({ content, onPress, fontSize = 22, marginBottom = 0, backgroundColor }) => {
  return (
    <MainButtonStyled 
      marginBottom={marginBottom}
      onClick={onPress}
      backgroundColor={backgroundColor}
    >
      <StyledText content={content} fontSize={fontSize} color={COLORS.bg_black} />
    </MainButtonStyled>
  );
};

const SmallButton = ({ content, backgroundColor, color, onClick, fontSize = 10 }) => {
  return (
    <SmallButtonStyled
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
    >
      {content}
    </SmallButtonStyled>
  );
};

/* 어드민 메인 버튼 */
const AdminMainButton = ({
  content,
  onPress,
  fontSize = 22,
  marginBottom = 0,
  backgroundColor,
}) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleClick = () => {
    setIsConfirmVisible(true); // 팝업 표시
  };

  const handleConfirm = () => {
    setIsConfirmVisible(false);
    onPress(); // 확인 후 실행
  };

  const handleCancel = () => {
    setIsConfirmVisible(false); // 취소 시 팝업 닫기
  };

  return (
    <>
      <MainButtonStyled
        marginBottom={marginBottom}
        onClick={handleClick}
        backgroundColor={backgroundColor}
      >
        <StyledText content={content} fontSize={fontSize} color={COLORS.bg_black} />
      </MainButtonStyled>
      {isConfirmVisible && (
        <ModalOverlay>
          <ModalContent>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              정말 실행하시겠습니까?
            </p>
            <ModalButton color={COLORS.red} hoverColor={COLORS.dark_red} onClick={handleConfirm}>
              확인
            </ModalButton>
            <ModalButton color={COLORS.gray} hoverColor={COLORS.dark_gray} onClick={handleCancel}>
              취소
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

/* 어드민 스몰 버튼 */
const AdminSmallButton = ({ content, backgroundColor, color, onClick, fontSize = 10 }) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleClick = () => {
    setIsConfirmVisible(true); // 팝업 표시
  };

  const handleConfirm = () => {
    setIsConfirmVisible(false);
    onClick(); // 확인 후 실행
  };

  const handleCancel = () => {
    setIsConfirmVisible(false); // 취소 시 팝업 닫기
  };

  return (
    <>
      <SmallButtonStyled
        onClick={handleClick}
        backgroundColor={backgroundColor}
        color={color}
        fontSize={fontSize}
      >
        {content}
      </SmallButtonStyled>
      {isConfirmVisible && (
        <ModalOverlay>
          <ModalContent>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              정말 실행하시겠습니까?
            </p>
            <ModalButton color={COLORS.red} hoverColor={COLORS.dark_red} onClick={handleConfirm}>
              확인
            </ModalButton>
            <ModalButton color={COLORS.gray} hoverColor={COLORS.dark_gray} onClick={handleCancel}>
              취소
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export { MainButton, SmallButton, AdminMainButton, AdminSmallButton };