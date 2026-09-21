import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from '../../context/theme';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const Logo = props => {
  const { ...rootProps } = props;

  const theme = useStyledTheme();
  const [state, dispatch] = useThemeContext();
  const {
    addCursorBorder,
    removeCursorBorder,
    addCursorColor,
    resetCursorColor,
  } = useCursorStyle();

  const handleToggleTheme = React.useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      dispatch({ type: 'TOGGLE_THEME' });

      // reset the cursor color so that it uses the theme text color as default
      addCursorColor(null);
    },
    [dispatch, addCursorColor],
  );

  const isLight = state.theme === 'light';
  const logoSrc = isLight ? '/crafti-logo-black.png' : '/crafti-logo.png';

  return (
    <LogoWrapper
      onMouseEnter={addCursorBorder}
      onMouseLeave={removeCursorBorder}
      onClick={handleToggleTheme}
      {...rootProps}
    >
      <LogoImage
        src={logoSrc}
        alt="Crafti"
        onMouseEnter={() => addCursorColor(theme.text)}
        onMouseLeave={resetCursorColor}
      />
    </LogoWrapper>
  );
};

export default Logo;
