import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';

export const Slider = styled(({ renderAs, ...props }) => {
  const Component = motion[renderAs] || 'div';
  return <Component {...props} />;
})`
  position: fixed;
  right: 0;
  left: 0;
  will-change: transform;
  z-index: ${({ theme }) => theme.zIndex.slider};
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
    width: 160px;
    height: 42px;
    top: 20px;
  `};

  ${({ theme }) => theme.breakpoints.small`
    width: 130px;
    height: 34px;
    top: 22px;
  `};
`;

export const MenuWrapper = styled.div`
  position: absolute;
  top: 54px;
  right: 32px;
  margin: -20px;

  ${({ theme }) => theme.breakpoints.tablet`
    top: 29px;
  `};
`;
