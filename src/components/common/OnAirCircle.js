import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { COLORS } from "../../utils/theme";

const OnAirCircleContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Shadow = styled.div`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

const OnAirCircleBack = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OnAirCircleInner = styled(motion.div)`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  border: 1px solid ${COLORS.textColor};
`;

const OnAirCircle = ({ color, onPress }) => {
  const scaleControls = useAnimation();
  const unscaleControls = useAnimation();

// controls.start()가 컴포넌트가 마운트된 후에 호출되도록 보장하기 위해
// scaleControls와 unscaleControls를 연결하기 위해 animate() 사용
// 하나의 useEffect() 사용
  useEffect(() => {
    const animate = async () => {
      try {
        await scaleControls.start({ scale: 1.2, transition: { duration: 1, ease: "easeInOut" } });
        await scaleControls.start({ scale: 1, transition: { duration: 1, ease: "easeInOut" } });
        await unscaleControls.start({ scale: 0.8, transition: { duration: 1, ease: "easeInOut" } });
        await unscaleControls.start({ scale: 1, transition: { duration: 1, ease: "easeInOut" } });
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    animate();

    return () => {
      scaleControls.stop();
      unscaleControls.stop();
    };
  }, [scaleControls, unscaleControls]);

  return (
    <OnAirCircleContainer animate={scaleControls}>
      <Shadow>
        <OnAirCircleBack color={color} onClick={onPress}>
          <OnAirCircleInner color={color} animate={unscaleControls} />
        </OnAirCircleBack>
      </Shadow>
    </OnAirCircleContainer>
  );
};

const StatusCircleContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${COLORS.light_gray};
  border-radius: 50%;
  border-width: 0.8px;
  border-style: solid;
  border-color: ${COLORS.textColor};
`;

const StatusCircle = () => <StatusCircleContainer />;

export { OnAirCircle, StatusCircle };
