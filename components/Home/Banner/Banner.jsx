import React from 'react';
import { motion } from 'framer-motion';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useWindowSize from '../../../hooks/useWindowSize';
import useStyledTheme from '../../../hooks/useStyledTheme';
import { useLanguage } from '../../../context/language';
import CanvasEraser from '../../CanvasEraser';
import {
  BannerSection,
  BannerTitle,
  BannerSubtitle,
  VideoContainer,
} from './styles';

const titleAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemTitleAnimation = {
  initial: { y: '100vh' },
  animate: {
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Banner = () => {
  const canvasRef = React.useRef(null);
  const windowSize = useWindowSize();
  const theme = useStyledTheme();
  const { lang } = useLanguage();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <BannerSection style={{ height: windowSize.height }}>
      <VideoContainer>
        <video
          src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Christ_Church_Cathedral_Dublin_video.webm"
          height="100%"
          width="100%"
          loop
          autoPlay
          muted
          playsInline
          style={{ filter: 'grayscale(100%) brightness(0.7)' }}
        />
      </VideoContainer>
      <CanvasEraser
        ref={canvasRef}
        width={windowSize.width}
        height={windowSize.height}
        size={120}
        background={theme.background}
        onMouseEnter={addCursorBorder}
        onMouseLeave={removeCursorBorder}
      />
      <BannerSubtitle>
        {lang === 'fr' ? 'CRAFTI & l’EMUC.' : 'CRAFTI & EMUC.'}
      </BannerSubtitle>
      <BannerTitle
        variants={titleAnimation}
        initial="initial"
        animate="animate"
      >
        <motion.span variants={itemTitleAnimation}>CRAFTI</motion.span>
        <motion.span variants={itemTitleAnimation}>STUDIO</motion.span>
      </BannerTitle>
    </BannerSection>
  );
};

export default React.memo(Banner);
