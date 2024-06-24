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

  useEffect(() => {
    const scaleSequence = async () => {
      while (true) {
        await scaleControls.start({
          scale: 1.2,
          transition: { duration: 1, ease: "easeInOut" },
        });
        await scaleControls.start({
          scale: 1,
          transition: { duration: 1, ease: "easeInOut" },
        });
      }
    };

    const unscaleSequence = async () => {
      while (true) {
        await unscaleControls.start({
          scale: 0.8,
          transition: { duration: 1, ease: "easeInOut" },
        });
        await unscaleControls.start({
          scale: 1,
          transition: { duration: 1, ease: "easeInOut" },
        });
      }
    };

    scaleSequence();
    unscaleSequence();
  }, [scaleControls, unscaleControls]);

  return (
    <OnAirCircleContainer animate={scaleControls} onClick={onPress}>
      <Shadow>
        <OnAirCircleBack color={color}>
          <OnAirCircleInner color={color} animate={unscaleControls} />
        </OnAirCircleBack>
      </Shadow>
    </OnAirCircleContainer>
  );
};

export default OnAirCircle;
