import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';

export const Slider = styled(({ renderAs, isScrolled, ...props }) => {
  const Component = motion[renderAs] || 'div';
  return <Component {...props} />;
})`
  position: fixed;
  right: 0;
  left: 0;
  will-change: transform;
  z-index: ${({ theme }) => theme.zIndex.slider};
  ${({ isScrolled, theme, renderAs }) =>
    renderAs === 'header' && isScrolled
      ? `
    background: ${theme.name === 'light' ? 'rgba(255, 255, 255, 0.88)' : 'rgba(10, 10, 10, 0.88)'};
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 4px 20px ${theme.name === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.4)'};
    height: 110px;

    ${theme.breakpoints.tablet`
      height: 76px;
    `};

    ${theme.breakpoints.small`
      height: 68px;
    `};
  `
      : ''}
`;

export const Container = styled.div`
  ${containerStyles};
  position: relative;
`;

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  position: absolute;
  top: 36px;
  left: auto;
  width: 220px;
  height: 57px;
  cursor: pointer;

  ${({ theme }) => theme.breakpoints.tablet`
    width: 150px;
    height: 40px;
    top: 24px;
  `};

  ${({ theme }) => theme.breakpoints.small`
    width: 100px;
    height: 30px;
    top: 22px;
  `};
`;

export const MenuWrapper = styled.div`
  position: absolute;
  top: 54px;
  right: 32px;
  margin: -20px;
  display: flex;
  align-items: center;
  gap: 16px;

  ${({ theme }) => theme.breakpoints.tablet`
    top: 28px;
    right: 20px;
    gap: 10px;
  `};

  ${({ theme }) => theme.breakpoints.small`
    top: 20px;
    right: 16px;
    gap: 6px;
  `};
`;
