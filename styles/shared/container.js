import { css } from 'styled-components';

export default css`
  max-width: 1234px;
  padding: 0 32px;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    padding: 0 20px;
  }
`;
