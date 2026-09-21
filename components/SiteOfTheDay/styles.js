import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  transform: translateY(-50%);
  top: 50%;
  right: 0;
  width: 52px;
  height: 180px;
  z-index: ${({ theme }) => theme.zIndex.awwwards};
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-50%) translateX(-4px);
  }

  & a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
    padding: 14px 0 16px;
    border-radius: 6px 0 0 6px;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.25);
    text-decoration: none;
    user-select: none;
  }

  ${({ theme }) => theme.breakpoints.small`
    display: none;
  `};
`;

export const BadgeIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

export const BadgeText = styled.span`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.background};
`;
