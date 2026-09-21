import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../context/language';
import useCursorStyle from '../../hooks/useCursorStyle';

const ToggleWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  background: rgba(128, 128, 128, 0.15);
  border: 1.5px solid currentColor;
  border-radius: 20px;
  padding: 2px;
  cursor: pointer;
  position: relative;
  user-select: none;
  font-family: inherit;
  color: inherit;
  transition: opacity 0.2s ease, transform 0.15s ease;
  line-height: 1;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Option = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 9px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 16px;
  transition: all 0.2s ease;
  color: ${({ $active, $invertColor }) => ($active ? ($invertColor || '#fff') : 'inherit')};
  background: ${({ $active, $activeBg }) => ($active ? ($activeBg || 'currentColor') : 'transparent')};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 4px 7px;
    font-size: 0.75rem;
  `};
`;

const LanguageToggle = ({ activeBg, invertColor, className, style }) => {
  const { lang, toggleLang } = useLanguage();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <ToggleWrapper
      type="button"
      onClick={toggleLang}
      onMouseEnter={addCursorBorder}
      onMouseLeave={removeCursorBorder}
      aria-label="Toggle language"
      title={lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
      className={className}
      style={style}
    >
      <Option
        $active={lang === 'fr'}
        $activeBg={activeBg}
        $invertColor={invertColor}
      >
        FR
      </Option>
      <Option
        $active={lang === 'en'}
        $activeBg={activeBg}
        $invertColor={invertColor}
      >
        EN
      </Option>
    </ToggleWrapper>
  );
};

export default React.memo(LanguageToggle);
