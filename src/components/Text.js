import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";

const TextCSS = styled.span`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => (props.color ? props.color : "white")};
  font-family: "NanumSquare", sans-serif;
  font-weight: ${(props) => props.weight};
`;

const StyledText = ({
  content,
  fontSize = 24,
  color = false,
  weight = 400,
}) => (
  <TextCSS fontSize={fontSize} color={color} weight={weight}>
    {content}
  </TextCSS>
);

const SubTextCSS = styled.span`
  font-size: 17px;
  color: ${COLORS.light_gray};
  font-family: "Interop-Medium";
`;

const StyledSubText = (props) => <SubTextCSS>{props.content}</SubTextCSS>;

const FontStyledTextCSS = styled.span`
  color: white;
  font-family: "Interop-Medium";
`;

const FontStyledText = ({ style, children }) => (
  <FontStyledTextCSS style={style}>{children}</FontStyledTextCSS>
);

export { StyledText, StyledSubText, FontStyledText };
