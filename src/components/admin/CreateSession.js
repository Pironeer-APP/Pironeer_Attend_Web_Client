import React, { useState } from 'react';
import { MainButton } from '../common/Button';
import { InputContainer } from '../common/Container';
import StyledInput from '../common/Input';
import { createSession } from '../../utils/admin';

function useCreateSession() {
  const [sessionName, setSessionName] = useState('');
  const [date, setDate] = useState('');

  const onChangeSessionName = (value) => {
    setSessionName(value);
  };

  const onChangeDate = (value) => {
    setDate(value);
  };

  const onPressCreateSession = async () => {
    try {
      const formattedDate = new Date(date).toISOString();
      console.log('Formatted Date:', formattedDate); 
      const response = await createSession(sessionName, formattedDate);
      alert(`새로운 세션이 생성되었습니다.`);
    } catch (error) {
      console.error('Failed to create session:', error); 
    }
  };

  return {
    sessionName,
    date,
    onChangeSessionName,
    onChangeDate,
    onPressCreateSession,
  };
}

const CreateSessionForm = () => {
  const {
    sessionName,
    date,
    message,
    onChangeSessionName,
    onChangeDate,
    onPressCreateSession,
  } = useCreateSession();

  return (
    <InputContainer>
      <StyledInput
        placeholder="세션 이름"
        keyboardType="default"
        value={sessionName}
        onChangeText={onChangeSessionName}
        maxLength={50}
      />
      <StyledInput
        type="date"
        placeholder="세션 날짜(YYYY-MM-DD)"
        value={date}
        onChangeText={onChangeDate}
      />
      <MainButton content="세션 생성" onPress={onPressCreateSession} />
    </InputContainer>
  );
};

export default CreateSessionForm;
