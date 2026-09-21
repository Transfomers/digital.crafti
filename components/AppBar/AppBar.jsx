import React from 'react';
import Link from 'next/link';
import Logo from '../Icons/Logo';
import MenuButton from '../MenuButton';
import { useLanguage } from '../../context/language';
import { useMenuContext } from '../../context/menu';
import { LanguageToggle, ThemeToggle } from '../Toggles';
import { Slider, Container, StyledLink, MenuWrapper } from './styles';

const getStyles = (direction = '') => {
  if (direction === 'down') return { top: 0 };
  if (direction === 'up') return { bottom: 0 };

  return {};
};

const variants = {
  hidden: { y: -131 },
  show: { y: 0 },
};

const AppBar = props => {
  const {
    direction = 'down',
    offset = 105,
    logoProps = {},
    style: styleProp = {},
    ...rootProps
  } = props;
  const [hidden, setHidden] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { lang } = useLanguage();
  const [{ isMenuOpen }, menuDispatch] = useMenuContext();
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop;

      if (direction === 'down') {
        setIsScrolled(currentY > 40);

        if (isMenuOpen || currentY <= 80) {
          setHidden(false);
        } else {
          const scrollDelta = currentY - lastScrollY.current;
          if (scrollDelta < -4) {
            // Reveal header immediately on upward scroll
            setHidden(false);
          } else if (scrollDelta > 4 && currentY > 120) {
            // Hide header when scrolling down
            setHidden(true);
          }
        }
        lastScrollY.current = currentY;
      } else if (direction === 'up') {
        const intersection = document.documentElement.scrollHeight - offset;
        const currentYPosition = currentY + window.innerHeight;
        setHidden(currentYPosition <= intersection);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hidden, direction, offset, isMenuOpen]);

  const styles = getStyles(direction);

  return (
    <Slider
      variants={variants}
      initial="hidden"
      animate={hidden ? 'hidden' : 'show'}
      isScrolled={isScrolled}
      transition={{
        duration: 0.45,
        ease: [0.666, 0, 0.237, 1],
      }}
      style={{
        ...styles,
        ...styleProp,
      }}
      {...rootProps}
    >
      <Container>
        <Link href="/" passHref>
          <StyledLink title="Crafti" onClick={() => menuDispatch({ type: 'CLOSE_MENU' })}>
            <Logo {...logoProps} />
          </StyledLink>
        </Link>
        <MenuWrapper>
          {direction === 'down' && (
            <>
              <LanguageToggle />
              <ThemeToggle />
            </>
          )}
          <MenuButton title={lang === 'fr' ? 'Projets' : 'Projects'} />
        </MenuWrapper>
      </Container>
    </Slider>
  );
};

export default React.memo(AppBar);
