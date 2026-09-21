/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '../../context/theme';
import { useMenuContext } from '../../context/menu';
import { useLanguage } from '../../context/language';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import useMediaQuery from '../../hooks/useMediaQuery';
import routes from '../../utils/constants/routes';
import Arrow from '../Icons/Arrow';
import { LanguageToggle, ThemeToggle } from '../Toggles';
import {
  listVariants,
  listItemsVariants,
  linkVariants,
  videoRevealVariants,
  videoVariants,
  transition,
} from './variants';
import {
  Backdrop,
  Container,
  CloseButton,
  Header,
  Navigation,
  List,
  Link,
  ArrowContainer,
  Footer,
  FooterBlock,
  FooterText,
  VideoContainer,
  VideoReveal,
  Video,
  Address,
  SocialMedia,
} from './styles';

const Menu = () => {
  const router = useRouter();
  const containerRef = React.useRef(null);
  const videoContainerRef = React.useRef(null);
  const [revealVideo, setRevealVideo] = React.useState(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const { lang } = useLanguage();
  const theme = useStyledTheme();
  const [{ isMenuOpen }, menuDispatch] = useMenuContext();
  const {
    addCursorBorder,
    removeCursorBorder,
    addCursorColor,
    resetCursorColor,
  } = useCursorStyle();
  const isMobile = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.small}px)`,
  );

  const handleCloseMenu = React.useCallback(() => {
    removeCursorBorder();
    menuDispatch({ type: 'CLOSE_MENU' });
  }, [removeCursorBorder, menuDispatch]);

  React.useEffect(() => {
    const handleRouteChange = () => {
      menuDispatch({ type: 'CLOSE_MENU' });
      resetCursorColor();
      removeCursorBorder();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, menuDispatch, resetCursorColor, removeCursorBorder]);

  const handleAnimationComplete = React.useCallback(() => {
    addCursorColor(theme.text);
  }, [addCursorColor, theme.text]);

  const handleExitComplete = React.useCallback(() => {
    resetCursorColor();
  }, [resetCursorColor]);

  const handleHoverStart = React.useCallback(
    event => {
      addCursorBorder();
      setRevealVideo(event.target.name);
    },
    [addCursorBorder],
  );

  const handleHoverEnd = React.useCallback(() => {
    removeCursorBorder();
    setRevealVideo(null);
  }, [removeCursorBorder]);

  React.useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && containerRef.current && videoContainerRef.current) {
        const offset = 256;
        const { width } = containerRef.current.getBoundingClientRect();
        const left = (window.innerWidth - width) / 2 + offset;

        videoContainerRef.current.style.left = `${left}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isMenuOpen && (
        <Backdrop onAnimationComplete={handleAnimationComplete}>
          <Container ref={containerRef}>
            <Header>
              <h3>{lang === 'fr' ? 'Projets' : 'Projects'}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '20px' }}>
                <LanguageToggle
                  activeBg={theme.background}
                  invertColor={theme.colors.red}
                />
                <ThemeToggle
                  activeBg={theme.background}
                  invertColor={theme.colors.red}
                />
                <CloseButton onClick={handleCloseMenu} />
              </div>
            </Header>
            <Navigation>
              <List
                variants={listVariants}
                initial="hidden"
                animate="show"
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                {routes.map(route => (
                  <motion.li
                    key={route.id}
                    variants={listItemsVariants}
                    transition={{
                      duration: 0.9,
                      ease: transition.ease,
                    }}
                  >
                    <NextLink href={route.path} passHref>
                      <Link
                        key={`${route.id}_${isMobile}`}
                        name={route.id}
                        onClick={handleCloseMenu}
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}
                        custom={{ isMobile, color: theme.text }}
                        initial="initial"
                        whileHover="hover"
                        variants={linkVariants}
                        transition={transition}
                      >
                        <ArrowContainer>
                          <Arrow fillColor={theme.background} />
                        </ArrowContainer>
                        {route.title[lang] || route.title.fr}
                      </Link>
                    </NextLink>
                  </motion.li>
                ))}
              </List>
            </Navigation>
            <Footer>
              <FooterBlock>
                <FooterText
                  className="link"
                  as="a"
                  href="mailto:contact@craftistudio.tech"
                  onClick={handleCloseMenu}
                  onMouseEnter={addCursorBorder}
                  onMouseLeave={removeCursorBorder}
                >
                  contact@craftistudio.tech
                </FooterText>
                <FooterText
                  className="link"
                  as="a"
                  href="mailto:dev@crafti.digital"
                  onClick={handleCloseMenu}
                  onMouseEnter={addCursorBorder}
                  onMouseLeave={removeCursorBorder}
                >
                  dev@crafti.digital
                </FooterText>
                <FooterText
                  className="link"
                  as="a"
                  href="tel:+237695266214"
                  onClick={handleCloseMenu}
                  onMouseEnter={addCursorBorder}
                  onMouseLeave={removeCursorBorder}
                  style={{ marginTop: '16px' }}
                >
                  +237 695 266 214
                </FooterText>
                <FooterText
                  className="link"
                  as="a"
                  href="tel:+237679428243"
                  onClick={handleCloseMenu}
                  onMouseEnter={addCursorBorder}
                  onMouseLeave={removeCursorBorder}
                >
                  +237 679 428 243
                </FooterText>
              </FooterBlock>
              <FooterText className="copyright">© Crafti studio 2026</FooterText>
              {isMobile && (
                <Address>
                  <FooterText>
                    Yaoundé, Cameroon
                  </FooterText>
                </Address>
              )}
              <SocialMedia />
            </Footer>
          </Container>
          {!isMobile && (
            <VideoContainer ref={videoContainerRef}>
              <VideoReveal
                variants={videoRevealVariants}
                transition={transition}
                initial="show"
                animate={isHovering ? 'hidden' : 'show'}
              />
              {routes.map(route => (
                <Video
                  key={route.id}
                  src={route.video.startsWith('http') ? route.video : `/videos/${route.video}`}
                  variants={videoVariants}
                  initial="hidden"
                  animate={route.id === revealVideo ? 'show' : 'hidden'}
                  transition={transition}
                  loop
                  autoPlay
                  style={{ filter: 'grayscale(100%) brightness(0.7)' }}
                ></Video>
              ))}
            </VideoContainer>
          )}
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Menu);
