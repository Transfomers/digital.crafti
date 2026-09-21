import styled from 'styled-components';
import { secondaryFontStyle } from '../../styles/shared/text';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: -10px;

  ${({ theme }) => theme.breakpoints.small`
    margin-left: -10px;
  `};
`;

export const Link = styled.a`
  ${secondaryFontStyle};
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  height: 24px;
  line-height: 24px;

  & svg {
    max-height: 20px;
    width: auto;
    display: block;
  }

  &:hover svg path {
    fill: ${({ theme }) => theme.text};
  }
`;
