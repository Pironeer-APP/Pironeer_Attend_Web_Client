import React from 'react';
import { useParams } from 'react-router-dom';
import { MainButton } from '../common/Button';
import { Container } from '../common/Container';
import Logo from '../common/Logo';
import { Header } from '../common/Header';
import { startAttendCheck,endAttendCheck } from '../../utils/admin';
import { useState } from 'react';
import { COLORS } from '../../utils/theme';

const CreateCode = () => {
  const { sessionId } = useParams();
  const [code, setCode] = useState(null);

  const createCode = async () => {
    try {
      const response = await startAttendCheck(sessionId);
      setCode(response.code);
      alert(`Code: ${response.code}`);
    } catch (error) {
      console.error('Failed to create code:', error);
    }
  };
  const endCode = async () => {
    try {
      const response = await endAttendCheck();
      setCode(null);
    } catch (error) {
      console.error('Failed to end attendance check:', error);
    }
  };
  return (
    <Container>
      <Logo />
      <Header text={`반가워요, 어드민님!`} />
      {code ? (
        <>
        <Header text={`현재 생성된 코드는 ${code} 입니다.`} />
        <MainButton content={"강제 종료"} onPress={endCode} backgroundColor={COLORS.red}/>
        </>
        
      ) : (
        <MainButton content={"코드 생성"} onPress={createCode} />
      )}
    </Container>
  );
};

export default CreateCode;
