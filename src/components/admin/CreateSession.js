import React, { useState } from 'react';
import { MainButton } from '../common/Button';
import { InputContainer } from '../common/Container';
import StyledInput from '../common/Input';
import { createSession } from '../../utils/admin';

function useCreateSession() {
  const [sessionName, setSessionName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const onChangeSessionName = (value) => {
    setSessionName(value);
  };

  const onChangeDate = (value) => {
    setDate(value);
  };

  const onPressCreateSession = async () => {
    try {
      const formattedDate = new Date(date).toISOString();
      const response = await createSession(sessionName, formattedDate);
      setMessage(response.message);
    } catch (error) {
      setMessage('세션 생성에 실패했습니다.');
    }
  };

  return {
    sessionName,
    date,
    message,
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
      <MainButton content="세션 생성" onClick={onPressCreateSession} />
      {message && <p>{message}</p>}
    </InputContainer>
  );
};

export default CreateSessionForm;
