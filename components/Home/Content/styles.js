import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../../styles/shared/container';

export const ContentSection = styled(motion.section)`
  ${containerStyles};

  margin-bottom: 210px;

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 107px;
  `};
`;

export const TextWrapper = styled.div`
  margin-left: 8.333%;
  width: calc(75% - 32px);

  ${({ theme }) => theme.breakpoints.small`
    width: 100%;
    margin-left: 0;
  `};
`;

export const Text = styled.h2`
  margin: 0;
  font-size: 2.25rem;
  line-height: 1.25;
  font-weight: 500;
  max-width: 860px;

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 1.35rem;
    line-height: 1.3;
  `};
`;
