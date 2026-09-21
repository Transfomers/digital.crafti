import styled from 'styled-components';
import { motion } from 'framer-motion';
import { secondaryFontStyle } from '../../../styles/shared/text';

export const BannerSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  margin-bottom: 240px;
  background: ${({ theme }) => theme.background};

  & canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 90px;
  `};
`;

export const VideoContainer = styled.div`
  height: 100%;
  width: 100%;

  & video {
    object-fit: cover;
  }
`;

export const BannerSubtitle = styled.div`
  position: absolute;
  top: 130px;
  left: 48px;
  ${secondaryFontStyle};
  color: ${({ theme }) => theme.colors.red};
  font-size: 1.15rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 2;
  pointer-events: none;

  ${({ theme }) => theme.breakpoints.tablet`
    top: 90px;
    left: 24px;
    font-size: 0.95rem;
  `};
`;

export const BannerTitle = styled(motion.h1)`
  position: absolute;
  bottom: -60px;
  left: 24px;
  font-size: 22vw;
  font-weight: 900;
  pointer-events: none;
  line-height: 0.76;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin: 0;

  & span {
    display: block;
    will-change: transform;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    left: 16px;
    bottom: -30px;
    font-size: 24vw;
    line-height: 0.78;
  `};

  ${({ theme }) => theme.breakpoints.small`
    left: 12px;
    bottom: -20px;
    font-size: 25vw;
  `};
`;
