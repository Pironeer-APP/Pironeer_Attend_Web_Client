import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme';

// Styled components
const StyledText = styled.span`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
`;

const CodeboxContainer = styled.div`
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => (props.highlight ? COLORS.green : COLORS.icon_gray)};
  border-radius: 15px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberpadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  margin-bottom: 8px; 
`;

const NumberpadRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Codebox = ({ code, highlight }) => (
  <CodeboxContainer highlight={highlight}>
    <StyledText fontSize={35} color={COLORS.green}>
      {code}
    </StyledText>
  </CodeboxContainer>
);

const Numberpad = ({ onNumberPress, onDeletePress, code, confirmCode }) => {
  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <NumberpadContainer>
      {numbers.map((row, rowIndex) => (
        <NumberpadRow key={rowIndex}>
          {row.map((num) => (
            <Button key={num} onClick={() => onNumberPress(num)}>
              <StyledText fontSize={30} color="white">
                {num}
              </StyledText>
            </Button>
          ))}
        </NumberpadRow>
      ))}
      <NumberpadRow>
        <Button onClick={onDeletePress}>
          <img
            src="/images/icons/leftarrow_icon.png"
            alt="Delete"
            style={{ width: 30, height: 20 }}
          />
        </Button>
        <Button onClick={() => onNumberPress(0)}>
          <StyledText fontSize={30}>0</StyledText>
        </Button>
        <Button onClick={confirmCode} disabled={code.length !== 4}>
          <div
            style={{
              borderRadius: 10,
              padding: 9,
              backgroundColor: code.length === 4 ? COLORS.green : COLORS.icon_gray,
              position: 'relative',
              left: 13,
            }}
          >
            <StyledText fontSize={28} color={code.length === 4 ? 'black' : 'white'}>
              확인
            </StyledText>
          </div>
        </Button>
      </NumberpadRow>
    </NumberpadContainer>
  );
};

const CodepadContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CodepadRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const Codepad = ({ confirmCode, codes, setCodes }) => {
  const updateCode = (value) => {
    if (codes.length < 4) {
      setCodes(codes + value);
    }
  };

  const deleteCode = () => {
    setCodes(codes.slice(0, -1));
  };

  return (
    <CodepadContainer>
      <CodepadRow>
        <Codebox code={codes.slice(0, 1)} highlight={codes.length === 1} />
        <Codebox code={codes.slice(1, 2)} highlight={codes.length === 2} />
        <Codebox code={codes.slice(2, 3)} highlight={codes.length === 3} />
        <Codebox code={codes.slice(3, 4)} highlight={codes.length === 4} />
      </CodepadRow>
      <Numberpad
        onNumberPress={(number) => updateCode(number)}
        onDeletePress={deleteCode}
        code={codes}
        confirmCode={confirmCode}
      />
    </CodepadContainer>
  );
};

export default Codepad;
