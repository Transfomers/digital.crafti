import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../../styles/shared/container';
import { secondaryFontStyle } from '../../../styles/shared/text';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useStyledTheme from '../../../hooks/useStyledTheme';
import AnimateOnScreen from '../../AnimateOnScreen';
import { useLanguage } from '../../../context/language';
import PdfViewerModal from '../../PdfViewer';
import {
  FilePdf,
  Download,
  Eye,
  CheckCircle,
  Compass,
  Server,
  Users,
} from '../../Icons/ProjectIcons';

const SectionWrapper = styled.section`
  ${containerStyles};
  margin: 80px auto 140px;

  ${({ theme }) => theme.breakpoints.tablet`
    margin: 60px auto 100px;
  `};
`;

const CardContainer = styled.div`
  position: relative;
  border-radius: 20px;
  padding: 56px 48px;
  background: ${({ theme }) =>
    theme.name === 'light'
      ? 'linear-gradient(135deg, #ffffff 0%, #fff5f5 100%)'
      : 'linear-gradient(135deg, #141414 0%, #1f0d0d 100%)'};
  border: 1.5px solid ${({ theme }) => (theme.name === 'light' ? '#f0d0d0' : 'rgba(234, 40, 30, 0.3)')};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 36px 24px;
  `};
`;

const AccentGlow = styled.div`
  position: absolute;
  top: -80px;
  right: -80px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(234, 40, 30, 0.15) 0%, rgba(234, 40, 30, 0) 70%);
  pointer-events: none;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 40px;

  & .text-block {
    max-width: 720px;
  }

  & .tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.red};
    ${secondaryFontStyle};
    font-size: 0.95rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
    font-weight: 700;
  }

  & h2 {
    font-size: 2.75rem;
    line-height: 1.1;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    margin: 0 0 16px;
    color: ${({ theme }) => theme.text};

    ${({ theme }) => theme.breakpoints.tablet`
      font-size: 1.85rem;
    `};
  }

  & p {
    font-size: 1.2rem;
    line-height: 1.5;
    opacity: 0.85;
    margin: 0;
    color: ${({ theme }) => theme.text};

    ${({ theme }) => theme.breakpoints.tablet`
      font-size: 1.05rem;
    `};
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const DirectDownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.red};
  color: #ffffff;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(234, 40, 30, 0.35);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  & svg {
    width: 20px;
    height: 20px;
    stroke: #ffffff;
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(234, 40, 30, 0.5);
    background: #ff3b30;

    & svg {
      transform: translateY(2px);
    }
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 12px 24px;
    font-size: 0.875rem;
    width: 100%;
    justify-content: center;
  `};
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 36px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => (theme.name === 'light' ? '#ecdada' : 'rgba(255, 255, 255, 0.08)')};

  ${({ theme }) => theme.breakpoints.tablet`
    grid-template-columns: 1fr;
    gap: 16px;
  `};
`;

const HighlightCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 12px;
  background: ${({ theme }) => (theme.name === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.03)')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#eaeaea' : 'rgba(255, 255, 255, 0.05)')};

  & .icon-wrap {
    color: ${({ theme }) => theme.colors.red};
    flex-shrink: 0;
    margin-top: 2px;
  }

  & .text-wrap {
    & h4 {
      font-size: 1rem;
      font-weight: 800;
      text-transform: uppercase;
      margin: 0 0 4px;
      color: ${({ theme }) => theme.text};
      letter-spacing: 0.5px;
    }

    & p {
      font-size: 0.875rem;
      line-height: 1.4;
      opacity: 0.8;
      margin: 0;
      color: ${({ theme }) => theme.text};
    }
  }
`;

const PdfDownloadSection = () => {
  const { lang } = useLanguage();
  const theme = useStyledTheme();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const pdfPath = '/docs/presentation-crafti.pdf';

  return (
    <SectionWrapper>
      <AnimateOnScreen>
        <CardContainer>
          <AccentGlow />
          
          <HeaderRow>
            <div className="text-block">
              <span className="tag">
                <FilePdf size={18} color="#EA281E" />
                {lang === 'fr' ? 'DOCUMENT OFFICIEL • FORMAT PDF' : 'OFFICIAL DOCUMENT • PDF FORMAT'}
              </span>
              <h2>
                {lang === 'fr'
                  ? 'Dossier de Présentation & Méthodologie'
                  : 'Presentation & Methodology Dossier'}
              </h2>
              <p>
                {lang === 'fr'
                  ? 'Téléchargez le dossier complet de Crafti Studio comprenant l’architecture technique, le cycle de vie en 9 étapes, les spécifications du projet EMUC et la présentation de l’équipe.'
                  : 'Download the complete Crafti Studio dossier featuring technical architecture, the 9-stage lifecycle, EMUC project specifications, and team member profiles.'}
              </p>
            </div>

            <ActionsGroup>
              <DirectDownloadButton
                href={pdfPath}
                download="presentation-crafti.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={addCursorBorder}
                onMouseLeave={removeCursorBorder}
              >
                <Download />
                <span>{lang === 'fr' ? 'Télécharger le PDF' : 'Download PDF'}</span>
              </DirectDownloadButton>

              <PdfViewerModal
                pdfUrl={pdfPath}
                title={
                  lang === 'fr'
                    ? 'Dossier Technique & Méthodologie CRAFTI'
                    : 'CRAFTI Technical & Methodology Dossier'
                }
                buttonText={lang === 'fr' ? 'Consulter en Ligne' : 'View Online'}
              />
            </ActionsGroup>
          </HeaderRow>

          <HighlightsGrid>
            <HighlightCard>
              <div className="icon-wrap">
                <Compass size={24} />
              </div>
              <div className="text-wrap">
                <h4>{lang === 'fr' ? '9 Étapes Méthodologiques' : '9 Methodology Stages'}</h4>
                <p>
                  {lang === 'fr'
                    ? 'De la phase Découverte au Support et à l’Évolution continue.'
                    : 'From Discovery phase to Support and continuous Evolution.'}
                </p>
              </div>
            </HighlightCard>

            <HighlightCard>
              <div className="icon-wrap">
                <Server size={24} />
              </div>
              <div className="text-wrap">
                <h4>{lang === 'fr' ? 'Architecture Web & Mobile' : 'Web & Mobile Architecture'}</h4>
                <p>
                  {lang === 'fr'
                    ? 'APIs partagées, modèle de données, intégration IA et sécurité renforcée.'
                    : 'Shared APIs, data model, AI integration, and robust security.'}
                </p>
              </div>
            </HighlightCard>

            <HighlightCard>
              <div className="icon-wrap">
                <Users size={24} />
              </div>
              <div className="text-wrap">
                <h4>{lang === 'fr' ? 'Équipe Pluridisciplinaire' : 'Multidisciplinary Team'}</h4>
                <p>
                  {lang === 'fr'
                    ? 'Experts IA, Direction Technique, Product Owner, UI/UX et Développeurs.'
                    : 'AI experts, Technical Lead, Product Owner, UI/UX, and Developers.'}
                </p>
              </div>
            </HighlightCard>
          </HighlightsGrid>
        </CardContainer>
      </AnimateOnScreen>
    </SectionWrapper>
  );
};

export default React.memo(PdfDownloadSection);
