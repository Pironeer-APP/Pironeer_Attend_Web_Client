import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledContainer from '../components/Container';
import { HeaderDetail } from '../components/Header';
import { findNextSession } from '../utils';
import { Box } from '../components/Box';
import { StyledSubText, StyledText } from '../components/Text';
import { COLORS } from '../utils/theme';
import Gap, { GapH } from '../components/Gap';
import { MainButton } from '../components/Button';
import IsFaceBox from '../components/IsFaceBox';
import Modal from 'react-modal';
import Codepad from '../components/Codepad';
import { MediumLoader } from '../components/Loader';
import OnAirCircle from '../components/OnAirCircle';
import StatusCircle from '../components/StatusCircle';
import { client } from '../utils/client';
import useClientTime from '../utils/clientTime';
import { getData } from '../utils';

export const RowView = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const AsgContainer = styled.div`
  flex-direction: row;
  align-items: center;
`;

const AttendStatusCircle = ({ type = null }) => {
  let imageSource;
  if (type === '결석') {
    imageSource = `/images/icons/circle_ex.png`;
  } else if (type === '출석') {
    imageSource = `/images/icons/circle_donggrami.png`;
  } else if (type === '지각') {
    imageSource = `/images/icons/circle_semo.png`;
  } else {
    imageSource = `/images/icons/circle_none.png`;
  }
  return (
    <div>
      <img source={imageSource} style={{ width: 30, height: 30 }} />
    </div>
  );
};

const StatusLine = styled.div`
  background-color: ${COLORS.icon_gray};
  width: 1px;
  flex: 1;
`;



const InProgressAttendBox = (props) => {
  const {
    renderYear,
    renderMonth,
    renderDate,
    renderDay,
    renderHour,
    renderMinute,
    renderMillisec,
  } = useClientTime(props.date);
  return (
    <AsgContainer style={{ gap: 20 }}>
      <ColumnCenter>
        <ColumnCenterInner>
          <StatusLine />
          {props.nextSession.cnt === props.cnt ? <OnAirCircle /> : <StatusCircle />}
          <StatusLine />
        </ColumnCenterInner>
      </ColumnCenter>
      <ContentColumn>
        <Box>
          <PaddingView>
            <RowView style={{ marginBottom: 10 }}>
              <StyledSubText content={`${renderMonth}.${renderDate} ${renderDay}`} />
              <IsFaceBox isFace={props.isFace} />
            </RowView>
            <StyledText content={props.title} fontSize={20} />
            <Gap height={14} />
            {props.isFace === 1 && (
              <>
                <IconRow>
                  <img source='/images/location_icon.png' style={{ width: 15, height: 15 }} resizeMode="contain" />
                  <GapH width={9} />
                  <StyledSubText content={props.location} />
                </IconRow>
                <Gap height={5} />
              </>
            )}
            <IconRow>
              <img source='/images/time_icon.png' style={{ width: 15, height: 15 }} resizeMode="contain" />
              <GapH width={9} />
              <StyledSubText content={`${renderHour}:${renderMinute}`} />
            </IconRow>
          </PaddingView>
        </Box>
      </ContentColumn>
    </AsgContainer>
  );
};

const DoneAttendBox = (props) => {
  const {
    renderYear,
    renderMonth,
    renderDate,
    renderDay,
    renderHour,
    renderMinute,
    renderMillisec,
  } = useClientTime(props.date);
  return (
    <AsgContainer>
      <Column>
        <ColumnCenterInner>
          <StatusLine />
          <AttendStatusCircle type={props.attenType} />
          <StatusLine />
        </ColumnCenterInner>
      </Column>
      <ContentColumn>
        <PaddingView>
          <RowView style={{ marginVertical: 10 }}>
            <AlignCenter>
              <StyledSubText content={`${renderMonth}.${renderDate}`} fontSize={20} />
              <StyledSubText content={renderDay} fontSize={20} />
            </AlignCenter>
            <TitleContainer>
              <StyledText content={props.title} fontSize={18} />
            </TitleContainer>
          </RowView>
        </PaddingView>
      </ContentColumn>
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
      const sessionAttendsLen = await client.post('/attend/getSessionAttend', {
        userToken,
        session_id: attendance[i].session_id,
      });
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

  const renderAttendItem = (item) => (
    <>
      {nextSession?.cnt <= item.cnt ? (
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
        <DoneAttendBox status={item.attend_id} title={item.title} date={item.date} attenType={item.type} />
      )}
    </>
  );

  const [codes, setCodes] = useState('');

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
    setTimeout(() => setModalVisible(true), 1000);
    setTimeout(() => setModalVisible(false), 3000);
    setCodes('');
  };

  return (
    <StyledContainer>
      <HeaderDetail title="출석" />
      {isLoading ? (
        <MediumLoader />
      ) : (
        <FlexContainer>
          <ul style={{ paddingRight: 20, paddingLeft: 10 }}>
            {attendance.map((item) => (
              <li key={item.session_id}>{renderAttendItem(item)}</li>
            ))}
          </ul>
          {isTodaySession && (
            <ButtonContainer>
              <MainButton height={60} content="출석하기" onPress={toggleBottomSheet} marginBottom={0} />
            </ButtonContainer>
          )}
          <Modal isVisible={isBottomSheetVisible} onBackdropPress={toggleBottomSheet} style={{ justifyContent: 'flex-end', margin: 0 }}>
            <ModalContainer>
              <Codepad confirmCode={confirmCode} codes={codes} setCodes={setCodes} />
            </ModalContainer>
          </Modal>
          <Modal
            isVisible={isModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 22 }}
          >
            <CenteredView>
              {codeConfirmed === false ? (
                <>
                  <img source='/images/attend_failed.png' resizeMode="contain" style={{ width: 120, height: 120 }} />
                  <StyledText content="출석 실패" fontSize={25} />
                </>
              ) : codeConfirmed === 'exist' ? (
                <>
                  <img source='/images/attend_success.png' resizeMode="contain" style={{ width: 120, height: 120 }} />
                  <StyledText content="출석 정보 존재" fontSize={25} />
                </>
              ) : (
                <>
                  <img source='/images/attend_success.png' resizeMode="contain" style={{ width: 120, height: 120 }} />
                  <StyledText content="출석 성공" fontSize={25} />
                </>
              )}
            </CenteredView>
          </Modal>
        </FlexContainer>
      )}
    </StyledContainer>
  );
};

export default AttendanceScreen;

const FlexContainer = styled.div`
  flex: 1;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnCenter = styled(Column)`
  align-items: center;
`;

const ColumnCenterInner = styled(ColumnCenter)`
  flex: 1;
  justify-content: center;
  width: 50px;
`;

const ContentColumn = styled(Column)`
  flex: 1;
  justify-content: center;
  margin-vertical: 10px;
`;

const PaddingView = styled.div`
  padding-horizontal: 17px;
  padding-vertical: 10px;
`;

const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;
`;

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
  padding-horizontal: 20px;
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
  width: 300px;
  background-color: ${COLORS.gray};
  border-radius: 20px;
  padding: 35px;
  gap: 20px;
  position: absolute;
`;

