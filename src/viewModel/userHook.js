import { api } from "../utils/api";
import { useState } from "react";

function useAttend() {
    const [pin, setPin] = useState("");
    const [warning, setWarning] = useState("");
  
    const onChangePin = (value) => {
      setPin(value);
    };
  
    const onPressAttend = async (navigate, setIsAttend) => {
      const userId = sessionStorage.getItem("id");
  
      // 숫자가 아닌 경우 경고
      if (isNaN(pin)) {
        setPin("");
        setWarning("출석 코드는 0~9의 숫자로 이루어져야 합니다.");
        return;
      }
      // 네자리가 아닌 경우 경고
      if (pin.length !== 4) {
        setPin("");
        setWarning("출석코드는 4자리 숫자로 이루어져야 합니다.");
        return;
      }
      // 정상 입력된 경우 기존의 경고 삭제
      setWarning("");
  
      // 서버에 출석 정보 전달
      try {
        const endpoint = `/session/checkAttend/${userId}`;
        const body = { code: pin };
  
        const response = await api.post(endpoint, body);
        
        if (response.status === 201) {
          setIsAttend(true);
        }
        setWarning(response.message);
      }  catch (error) {
        setWarning(error);
      }
      setPin("");
    };
  
    return {
      pin,
      warning,
      onChangePin,
      onPressAttend,
    };
  }
export { useAttend };