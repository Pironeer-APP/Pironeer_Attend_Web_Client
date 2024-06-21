import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Container} from '../components/common/Container';
import { HeaderDetail } from '../components/common/Header';
import { findNextSession } from '../utils';
import { Box } from '../components/common/Box';
import { StyledSubText, StyledText } from '../components/common/Text';
import { COLORS } from '../utils/theme';
import Gap, { GapH } from '../components/common/Gap';
import { MainButton } from '../components/common/Button';
import IsFaceBox from '../components/common/IsFaceBox';
import Modal from 'react-modal';
import Codepad from '../components/common/Codepad';
import { MediumLoader } from '../components/common/Loader';
import OnAirCircle from '../components/common/OnAirCircle';
import { client } from '../utils/client';
import useClientTime from '../utils/clientTime';
import { getData } from '../utils';

// Styled Components
const StatusCircleContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${COLORS.light_gray};
  border-radius: 50%;
  border: 0.8px solid ${COLORS.textColor};
`;

const StatusLine = styled.div`
  background-color: ${COLORS.icon_gray};
  width: 1px;
  flex: 1;
`;

const AsgContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const RowView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: ${COLORS.gray};
  padding: 16px;
  min-height: 500px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding-horizontal: 30px;
`;

const CenteredView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  background-color: ${COLORS.gray};
  width: 300px;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  gap: 20px;
`;

const AttendStatusCircle = ({ type = null }) => {
  let imageSource;
  switch (type) {
    case '결석':
      imageSource = '/assets/icons/circle_ex.png';
      break;
    case '출석':
      imageSource = '/assets/icons/circle_donggrami.png';
      break;
    case '지각':
      imageSource = '/assets/icons/circle_semo.png';
      break;
    default:
      imageSource = '/assets/icons/circle_none.png';
      break;
  }
  return (
    <StatusCircleContainer>
      <img src={imageSource} alt={type} style={{ width: 30, height: 30 }} />
    </StatusCircleContainer>
  );
};

const InProgressAttendBox = (props) => {
  const {
    renderMonth,
    renderDate,
    renderDay,
    renderHour,
    renderMinute,
  } = useClientTime(props.date);

  return (
    <AsgContainer>
      <div style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 50, display: 'flex' }}>
          <StatusLine />
          {props.nextSession.cnt === props.cnt ? <OnAirCircle /> : <StatusCircleContainer />}
          <StatusLine />
        </div>
      </div>
      <div style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', marginVertical: 10, display: 'flex' }}>
        <Box>
          <div style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
            <RowView style={{ marginBottom: 10 }}>
              <StyledSubText content={`${renderMonth}.${renderDate} ${renderDay}`} />
              <IsFaceBox isFace={props.isFace} />
            </RowView>
            <StyledText content={props.title} fontSize={20} />
            <Gap height={14} />
            {props.isFace === 1 && (
              <>
                <div style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 30, display: 'flex' }}>
                  <img src="/assets/images/location_icon.png" alt="location" style={{ width: 15, height: 15 }} />
                  <GapH width={9} />
                  <StyledSubText content={props.location} />
                </div>
                <Gap height={5} />
              </>
            )}
            <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
              <img src="/assets/images/time_icon.png" alt="time" style={{ width: 15, height: 15 }} />
              <GapH width={9} />
              <StyledSubText content={`${renderHour}:${renderMinute}`} />
            </div>
          </div>
        </Box>
      </div>
    </AsgContainer>
  );
};

const DoneAttendBox = (props) => {
  const {
    renderMonth,
    renderDate,
    renderDay,
  } = useClientTime(props.date);

  return (
    <AsgContainer>
      <div style={{ flexDirection: 'column', display: 'flex' }}>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 50, display: 'flex' }}>
          <StatusLine />
          <AttendStatusCircle type={props.attenType} />
          <StatusLine />
        </div>
      </div>
      <div style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', display: 'flex' }}>
        <div style={{ padding: 20 }}>
          <RowView style={{ marginVertical: 10 }}>
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <StyledSubText content={`${renderMonth}.${renderDate}`} fontSize={20} />
              <StyledSubText content={renderDay} fontSize={20} />
            </div>
            <div style={{ flex: 1, marginLeft: 20 }}>
              <StyledText content={props.title} fontSize={18} />
            </div>
          </RowView>
        </div>
      </div>
    </AsgContainer>
  );
};

const AttendanceScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isTodaySession, setIsTodaySession] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [codeConfirmed, setCodeConfirmed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextSession, setNextSession] = useState(null);
  const [codes, setCodes] = useState('');

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const userSessionInfo = async () => {
    setRefreshing(true);
    const userToken = await getData('user_token');
    const url = `/attend/getSessionAndAttend`;
    const body = { userToken };
    try {
      const fetchAttendData = await client.post(url, body);
      setAttendance(fetchAttendData.sessions);
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.log('에러 발생: ', error);
    }
  };

  useEffect(() => {
    userSessionInfo();
  }, []);

  const findNextSessionFun = async () => {
    const nextSessionInfo = await findNextSession(attendance);
    setNextSession(nextSessionInfo);

    const userToken = await getData('user_token');
    for (let i = 0; i < attendance.length; i++) {
      const sessionAttendsLen = await client.post('/attend/getSessionAttend', { userToken, session_id: attendance[i].session_id });
      if (sessionAttendsLen.len === 0) {
        const now = new Date();
        const standard = new Date(attendance[i].date);
        setIsTodaySession(now >= standard);
        break;
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      findNextSessionFun();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [attendance]);

  const renderAttendItem = (item) => {
    return nextSession?.cnt <= item.cnt ? (
      <InProgressAttendBox
        status={item.attend_id}
        title={item.title}
        date={item.date}
        location={item.location}
        isFace={item.is_face}
        attenType={item.type}
        cnt={item.cnt}
        nextSession={nextSession}
      />
    ) : (
      <DoneAttendBox
        status={item.attend_id}
        title={item.title}
        date={item.date}
        attenType={item.type}
      />
    );
  };

  const confirmCode = async () => {
    const userToken = await getData('user_token');
    const url = `/attend/addAttend`;
    const body = {
      token: userToken,
      input_code: codes,
    };
    const attenResult = await client.post(url, body);
    setCodeConfirmed(attenResult.result);
    setBottomSheetVisible(!isBottomSheetVisible);
    setTimeout(() => {
      setModalVisible(true);
    }, 1000);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
    setCodes('');
  };

  return (
    <Container>
      <HeaderDetail title={'출석'} />
      {isLoading ? (
        <MediumLoader />
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <div style={{ paddingRight: 20, paddingLeft: 10 }}>
              {attendance.map((item) => (
                renderAttendItem(item)
              ))}
            </div>
            {isTodaySession && (
              <div style={{ paddingHorizontal: 20 }}>
                <MainButton
                  height={60}
                  content={'출석하기'}
                  onClick={toggleBottomSheet}
                  marginBottom={0}
                />
              </div>
            )}
          </div>
          <Modal
            isOpen={isBottomSheetVisible}
            onRequestClose={toggleBottomSheet}
            style={{
              content: {
                justifyContent: 'flex-end',
                margin: 0,
                padding: 0,
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
            }}
          >
            <ModalContainer>
              <Codepad
                confirmCode={confirmCode}
                codes={codes}
                setCodes={setCodes}
              />
            </ModalContainer>
          </Modal>
          <Modal
            isOpen={isModalVisible}
            style={{
              content: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
            }}
          >
            <ModalView>
              {codeConfirmed === false ? (
                <>
                  <img
                    src="/assets/images/attend_failed.png"
                    alt="Attend Failed"
                    style={{ width: 120, height: 120 }}
                  />
                  <StyledText content={'출석 실패'} fontSize={25} />
                </>
              ) : codeConfirmed === 'exist' ? (
                <>
                  <img
                    src="/assets/images/attend_success.png"
                    alt="Attend Success"
                    style={{ width: 120, height: 120 }}
                  />
                  <StyledText content={'출석 정보 존재'} fontSize={25} />
                </>
              ) : (
                <>
                  <img
                    src="/assets/images/attend_success.png"
                    alt="Attend Success"
                    style={{ width: 120, height: 120 }}
                  />
                  <StyledText content={'출석 성공'} fontSize={25} />
                </>
              )}
            </ModalView>
          </Modal>
        </div>
      )}
    </Container>
  );
};

export default AttendanceScreen;
