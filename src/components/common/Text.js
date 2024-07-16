import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";

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


const FontStyledTextCSS = styled.span`
  color: white;
  font-family: "Interop-Medium";
`;

const FontStyledText = ({ style, content }) => (
  <FontStyledTextCSS style={style}>{content}</FontStyledTextCSS>
);

const StyledWarning = styled(FontStyledText)`
  color: ${COLORS.green};
  margin: 1rem;
  font-size: 1.5rem;
`;

export {
  StyledText,
  StyledWarning
};
