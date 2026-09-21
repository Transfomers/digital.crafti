import React from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useMenuContext } from '../../../context/menu';
import { useLanguage } from '../../../context/language';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useStyledTheme from '../../../hooks/useStyledTheme';
import AnimateOnScreen from '../../AnimateOnScreen';
import Arrow from '../../Icons/Arrow';
import PdfViewerModal from '../../PdfViewer';
import { Download } from '../../Icons/ProjectIcons';
import {
  ContentSection,
  ProjectAnchor,
  ProjectInfo,
  ProjectTitle,
  VideoPreview,
  MenuContainer,
  MenuButton,
  PdfDownloadLink,
} from './styles';

const transition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1],
};

const FeaturedProject = () => {
  const controlsInfo = useAnimation();
  const controlsArrow = useAnimation();
  const { lang } = useLanguage();
  const theme = useStyledTheme();
  const [{ isMenuOpen }] = useMenuContext();
  const {
    addCursorColor,
    resetCursorColor,
    addCursorBorder,
    removeCursorBorder,
  } = useCursorStyle();
  const isTabletView = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.tablet}px)`,
  );

  const handleMouseEnter = React.useCallback(() => {
    addCursorBorder();
    addCursorColor(theme.text);
  }, [addCursorColor, addCursorBorder, theme.text]);

  const handleMouseLeave = React.useCallback(async () => {
    if (isMenuOpen) return;

    removeCursorBorder();
    resetCursorColor();
  }, [removeCursorBorder, resetCursorColor, isMenuOpen]);

  const handleAnchorHoverStart = React.useCallback(() => {
    addCursorBorder();

    // animate controls
    controlsInfo.start({ opacity: 1 });
    controlsArrow.start({ x: 0 });
  }, [addCursorBorder, controlsInfo, controlsArrow]);

  const handleAnchorHoverEnd = React.useCallback(() => {
    removeCursorBorder();

    // animate controls
    controlsInfo.start({ opacity: 0 });
    controlsArrow.start({ x: isTabletView ? -25.19 : -33 });
  }, [removeCursorBorder, controlsInfo, controlsArrow, isTabletView]);

  React.useEffect(() => {
    // animate arrow programmatically because initial prop was not working properly.
    // I probably did something wrong :P
    controlsArrow.start({ x: isTabletView ? -25.19 : -33 });
  }, [controlsArrow, isTabletView]);

  return (
    <ContentSection>
      <AnimateOnScreen>
        <motion.div>
          <Link href="/projects/notre-approche" passHref>
            <ProjectAnchor
              onHoverStart={handleAnchorHoverStart}
              onHoverEnd={handleAnchorHoverEnd}
            >
              <ProjectInfo>
                <h3>{lang === 'fr' ? 'Projet en Vedette' : 'Featured Project'}</h3>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={controlsInfo}
                  transition={transition}
                  className="project-info"
                >
                  <h4>CRAFTI × EMUC</h4>
                  <h4>2026</h4>
                </motion.div>
                <ProjectTitle>
                  {lang === 'fr' ? 'NOTRE' : 'OUR'} <br /> {lang === 'fr' ? 'APPROCHE' : 'APPROACH'}
                  <span className="arrow">
                    <Arrow animate={controlsArrow} transition={transition} />
                  </span>
                </ProjectTitle>
              </ProjectInfo>
              <VideoPreview>
                <video
                  loop
                  autoPlay
                  muted
                  playsInline
                  style={{ filter: 'grayscale(100%) brightness(0.7)' }}
                >
                  <source src="/videos/featured-video.mp4" type="video/mp4" />
                  <source src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Christ_Church_Cathedral_Dublin_video.webm" type="video/webm" />
                </video>
              </VideoPreview>
            </ProjectAnchor>
          </Link>
        </motion.div>
      </AnimateOnScreen>
      <AnimateOnScreen>
        <MenuContainer>
          <PdfDownloadLink
            href="/docs/presentation-crafti.pdf"
            download="presentation-crafti.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title={lang === 'fr' ? 'Télécharger le PDF' : 'Download PDF'}
            aria-label={lang === 'fr' ? 'Télécharger le PDF' : 'Download PDF'}
            onMouseEnter={addCursorBorder}
            onMouseLeave={removeCursorBorder}
          >
            <Download />
          </PdfDownloadLink>

          <PdfViewerModal
            iconOnly={true}
            pdfUrl="/docs/presentation-crafti.pdf"
            title={lang === 'fr' ? 'Dossier de Présentation CRAFTI × EMUC' : 'CRAFTI × EMUC Presentation Dossier'}
            buttonText={lang === 'fr' ? 'Consulter le PDF' : 'View PDF'}
          />

          <MenuButton
            sticky={false}
            title={lang === 'fr' ? 'Tous les Projets' : 'All Projects'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </MenuContainer>
      </AnimateOnScreen>
    </ContentSection>
  );
};

export default FeaturedProject;
