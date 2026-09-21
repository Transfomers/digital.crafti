import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from '../../context/theme';
import useCursorStyle from '../../hooks/useCursorStyle';

const SwitchWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 52px;
  height: 28px;
  border-radius: 20px;
  border: 1.5px solid currentColor;
  background: rgba(128, 128, 128, 0.15);
  cursor: pointer;
  padding: 2px;
  user-select: none;
  color: inherit;
  transition: opacity 0.2s ease, transform 0.15s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.96);
  }

  ${({ theme }) => theme.breakpoints.tablet`
    width: 48px;
    height: 26px;
  `};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  pointer-events: none;
  opacity: 0.7;

  & svg {
    width: 12px;
    height: 12px;
    display: block;
  }
`;

const Thumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $activeBg }) => $activeBg || 'currentColor'};
  transform: translateX(${({ $isDark }) => ($isDark ? '24px' : '0px')});
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  & svg {
    width: 11px;
    height: 11px;
    color: ${({ $invertColor }) => $invertColor || '#000'};
  }

  ${({ theme }) => theme.breakpoints.tablet`
    width: 18px;
    height: 18px;
    transform: translateX(${({ $isDark }) => ($isDark ? '22px' : '0px')});
  `};
`;

const SunIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" fill={color} />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ThemeToggle = ({ activeBg, invertColor, className, style }) => {
  const [themeState, themeDispatch] = useThemeContext();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const isDark = themeState.theme === 'dark';

  const handleToggle = () => {
    themeDispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <SwitchWrapper
      type="button"
      onClick={handleToggle}
      onMouseEnter={addCursorBorder}
      onMouseLeave={removeCursorBorder}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={className}
      style={style}
    >
      <IconWrapper>
        <SunIcon color="currentColor" />
        <MoonIcon color="currentColor" />
      </IconWrapper>
      <Thumb $isDark={isDark} $activeBg={activeBg} $invertColor={invertColor}>
        {isDark ? <MoonIcon color={invertColor || '#000'} /> : <SunIcon color={invertColor || '#fff'} />}
      </Thumb>
    </SwitchWrapper>
  );
};

export default React.memo(ThemeToggle);
