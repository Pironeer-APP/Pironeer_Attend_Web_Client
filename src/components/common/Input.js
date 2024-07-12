import styled from "styled-components";
import { COLORS } from "../../utils/theme";

// LoginInput component
const StyledTextInput = styled.input`
  height: 2rem;
  width: calc(100% - 4rem);
  font-size: 1.8rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${COLORS.gray};
  color: white;
  border: none;
  &::placeholder {
    color: ${COLORS.light_gray};
  }
`;

// 240620 연우: 이 input은 공용으로 빼도 좋을 거 같아요.
function StyledInput(props) {
  return (
    <StyledTextInput
      type={props.secureTextEntry ? "password" : "text"}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChangeText(e.target.value)}
      maxLength={props.maxLength}
      {...(props.keyboardType === "numeric" ? { pattern: "[0-9]*" } : {})}
    />
  );
}

export  {StyledInput};
