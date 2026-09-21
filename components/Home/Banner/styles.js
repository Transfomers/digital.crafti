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
    z-index: 1;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 90px;

    & canvas {
      display: none !important;
    }
  `};

  ${({ theme }) => theme.breakpoints.small`
    margin-bottom: 60px;
  `};
`;

export const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 0;

  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.theme === 'light'
        ? 'rgba(255, 255, 255, 0.4)'
        : 'rgba(0, 0, 0, 0.45)'};
    pointer-events: none;
    z-index: 1;
    display: none;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    &::after {
      display: block;
    }
  `};
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
    top: 85px;
    left: 20px;
    font-size: 0.95rem;
  `};

  ${({ theme }) => theme.breakpoints.small`
    top: 75px;
    left: 16px;
    font-size: 0.8125rem;
    letter-spacing: 1px;
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
  z-index: 2;
  color: ${({ theme }) => theme.text};

  & span {
    display: block;
    will-change: transform;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    left: 16px;
    bottom: 24px;
    font-size: 20vw;
    line-height: 0.85;
  `};

  ${({ theme }) => theme.breakpoints.small`
    left: 12px;
    bottom: 24px;
    font-size: 18.5vw;
    line-height: 0.88;
  `};
`;
