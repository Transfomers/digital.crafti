import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';
import { secondaryFontStyle } from '../../styles/shared/text';
import useCursorStyle from '../../hooks/useCursorStyle';
import AnimateOnScreen from '../../components/AnimateOnScreen';
import { useLanguage } from '../../context/language';
import { translations } from '../../locales/decouverte';
import routes, { methodologyRoutes } from '../../utils/constants/routes';
import PdfViewerModal from '../../components/PdfViewer';
import {
  Search,
  Compass,
  Users,
  Database,
  Shield,
  FilePdf,
  CheckCircle,
  Target,
} from '../../components/Icons/ProjectIcons';

// ================= STYLES ================= //

const PageWrapper = styled.div`
  padding-top: 140px;
  padding-bottom: 120px;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.tablet`
    padding-top: 100px;
    padding-bottom: 80px;
  `};
`;

const HeroSection = styled.section`
  ${containerStyles};
  margin-bottom: 100px;

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 60px;
  `};
`;

const MainTitle = styled.h1`
  font-size: 4.25rem;
  line-height: 1.02;
  font-weight: 900;
  letter-spacing: -1.5px;
  margin: 0 0 28px;
  max-width: 980px;
  text-transform: uppercase;

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 2.4rem;
    line-height: 1.1;
  `};
`;

const HeroLead = styled.p`
  font-size: 1.625rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  max-width: 860px;
  margin: 0 0 32px;

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 1.2rem;
  `};
`;

const QuoteCard = styled.div`
  background: ${({ theme }) => (theme.name === 'light' ? '#f5f5f5' : '#0c0c0c')};
  border-left: 5px solid ${({ theme }) => theme.colors.red};
  padding: 32px 36px;
  margin-top: 36px;
  max-width: 920px;

  & p {
    font-size: 1.35rem;
    line-height: 1.5;
    font-weight: 600;
    margin: 0;
    color: ${({ theme }) => theme.text};
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 24px 20px;
    & p { font-size: 1.1rem; }
  `};
`;

const SectionContainer = styled.section`
  ${containerStyles};
  margin-bottom: 130px;

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 80px;
  `};
`;

const SectionHeader = styled.div`
  margin-bottom: 48px;
`;

const SectionTag = styled.span`
  color: ${({ theme }) => theme.colors.red};
  ${secondaryFontStyle};
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
`;

const SectionHeading = styled.h2`
  font-size: 2.75rem;
  line-height: 1.1;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  max-width: 850px;

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 1.85rem;
  `};
`;

const StepCard = styled.div`
  background: ${({ theme }) => (theme.name === 'light' ? '#fafafa' : '#0e0e0e')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e5e5e5' : '#1b1b1b')};
  padding: 48px 40px;
  margin-bottom: 32px;
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.red};
  }

  & .step-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => (theme.name === 'light' ? '#ebebeb' : '#1f1f1f')};
    padding-bottom: 16px;
  }

  & .step-num {
    color: ${({ theme }) => theme.colors.red};
    font-size: 1.35rem;
    font-weight: 900;
    font-family: monospace;
    letter-spacing: 1px;
  }

  & .step-title {
    font-size: 1.85rem;
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
  }

  & .step-subtitle {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.red};
    margin: 0 0 24px;
  }

  & .step-body {
    font-size: 1.15rem;
    line-height: 1.6;
    opacity: 0.88;
    margin: 0 0 28px;
  }

  & .step-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px;
    margin: 0 0 28px;
    padding: 0;
    list-style: none;

    & li {
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 10px;

      &::before {
        content: '•';
        color: ${({ theme }) => theme.colors.red};
        font-weight: bold;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.small`
    padding: 32px 20px;
    & .step-header { flex-direction: column; gap: 8px; }
    & .step-title { font-size: 1.4rem; }
    & .step-list { grid-template-columns: 1fr; }
  `};
`;

const NextProjectNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 32px 40px;
  text-align: center;

  & h2 {
    font-size: 2.75rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0 0 24px;
  }

  & p {
    font-size: 1.25rem;
    max-width: 700px;
    margin: 0 0 48px;
    opacity: 0.85;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 60px 20px 20px;
    & h2 { font-size: 1.8rem; }
  `};
`;

const RouteChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const RouteChip = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.red : theme.text)};
  color: ${({ active, theme }) => (active ? theme.colors.red : theme.text)};
  background: ${({ active, theme }) => (active ? (theme.name === 'light' ? '#fff0f0' : '#1a0505') : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.red};
    border-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.background};
  }
`;

// ================= COMPONENT ================= //

const DiscoveryPage = () => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const currentPath = '/projects/decouverte';
  const theme = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDesc} />
      </Head>

      <PageWrapper>
        {/* HERO */}
        <HeroSection>
          <AnimateOnScreen>
            <MainTitle>{t.mainTitle}</MainTitle>
            <HeroLead>
              {t.heroLead}
            </HeroLead>
            <QuoteCard style={{ marginTop: '24px', borderColor: theme.colors.red }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.4rem' }}>
                {t.quote}
              </p>
            </QuoteCard>
            <div style={{ marginTop: '36px' }}>
              <PdfViewerModal
                pdfUrl="/docs/presentation-crafti.pdf"
                title={lang === 'fr' ? 'Dossier de Découverte & Spécifications' : 'Discovery & Specifications Dossier'}
                buttonText={lang === 'fr' ? 'Consulter le Rapport de Découverte (PDF)' : 'View Discovery Report (PDF)'}
              />
            </div>
          </AnimateOnScreen>
        </HeroSection>

        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.s1Tag}</SectionTag>
              <SectionHeading>{t.s1Head}</SectionHeading>
              <p style={{ marginTop: '16px', fontSize: '1.25rem', opacity: 0.85 }}>
                {t.s1Text.split('<br/><br/>').map((part, i, arr) => i < arr.length - 1 ? <React.Fragment key={i} dangerouslySetInnerHTML={{ __html: part + '<br/><br/>' }} /> : <span key={i} dangerouslySetInnerHTML={{ __html: part }} />)}/strong>
              </p>
            </SectionHeader>
          </AnimateOnScreen>
        </SectionContainer>

        {/* 6 AREAS SECTION */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.s2Tag}</SectionTag>
              <SectionHeading>{t.s2Head}</SectionHeading>
            </SectionHeader>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.a1Num}</span>
                <Compass size={24} color="#EA281E" style={{ marginLeft: '10px', marginRight: '6px' }} />
                <h3 className="step-title">{t.a1Title}</h3>
              </div>
              <ul className="step-list">
                <li>{t.a1L[0]}</li>
                <li>{t.a1L[1]}</li>
                <li>{t.a1L[2]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.a2Num}</span>
                <Users size={24} color="#EA281E" style={{ marginLeft: '10px', marginRight: '6px' }} />
                <h3 className="step-title">{t.a2Title}</h3>
              </div>
              <ul className="step-list">
                <li>{t.a2L[0]}</li>
                <li>{t.a2L[1]}</li>
                <li>{t.a2L[2]}</li>
                <li>{t.a2L[3]}</li>
                <li>{t.a2L[4]}</li>
                <li>{t.a2L[5]}</li>
                <li>{t.a2L[6]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.a3Num}</span>
                <Search size={24} color="#EA281E" style={{ marginLeft: '10px', marginRight: '6px' }} />
                <h3 className="step-title">{t.a3Title}</h3>
              </div>
              <ul className="step-list">
                <li>{t.a3L[0]}</li>
                <li>{t.a3L[1]}</li>
                <li>{t.a3L[2]}</li>
                <li>{t.a3L[3]}</li>
                <li>{t.a3L[4]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.a4Num}</span>
                <Database size={24} color="#EA281E" style={{ marginLeft: '10px', marginRight: '6px' }} />
                <h3 className="step-title">{t.a4Title}</h3>
              </div>
              <ul className="step-list">
                <li>{t.a4L[0]}</li>
                <li>{t.a4L[1]}</li>
                <li>{t.a4L[2]}</li>
                <li>{t.a4L[3]}</li>
                <li>{t.a4L[4]}</li>
                <li>{t.a4L[5]}</li>
                <li>{t.a4L[6]}</li>
              </ul>
              
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #eaeaea' }}>
                <h4 className="step-subtitle">{t.a4Sub}</h4>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>{t.a4D}</p>
              </div>
            </StepCard>

          </AnimateOnScreen>
        </SectionContainer>
        
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.s3Tag}</SectionTag>
              <SectionHeading>{t.s3Head}</SectionHeading>
            </SectionHeader>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.d1Num}</span>
                <h3 className="step-title">{t.d1Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.d1Sub}</h4>
              <ul className="step-list">
                <li>{t.d1L[0]}</li>
                <li>{t.d1L[1]}</li>
                <li>{t.d1L[2]}</li>
                <li>{t.d1L[3]}</li>
                <li>{t.d1L[4]}</li>
                <li>{t.d1L[5]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.d2Num}</span>
                <h3 className="step-title">{t.d2Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.d2Sub}</h4>
              <ul className="step-list">
                <li>{t.d2L[0]}</li>
                <li>{t.d2L[1]}</li>
                <li>{t.d2L[2]}</li>
                <li>{t.d2L[3]}</li>
                <li>{t.d2L[4]}</li>
                <li>{t.d2L[5]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.d3Num}</span>
                <h3 className="step-title">{t.d3Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.d3Sub}</h4>
              <ul className="step-list">
                <li>{t.d3L[0]}</li>
                <li>{t.d3L[1]}</li>
                <li>{t.d3L[2]}</li>
                <li>{t.d3L[3]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.d4Num}</span>
                <h3 className="step-title">{t.d4Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.d4Sub}</h4>
              <ul className="step-list">
                <li>{t.d4L[0]}</li>
                <li>{t.d4L[1]}</li>
                <li>{t.d4L[2]}</li>
                <li>{t.d4L[3]}</li>
                <li>{t.d4L[4]}</li>
                <li>{t.d4L[5]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.d5Num}</span>
                <h3 className="step-title">{t.d5Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.d5Sub}</h4>
              <ul className="step-list">
                <li>{t.d5L[0]}</li>
                <li>{t.d5L[1]}</li>
                <li>{t.d5L[2]}</li>
                <li>{t.d5L[3]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.d6Num}</span>
                <h3 className="step-title">{t.d6Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.d6Sub}</h4>
              <ul className="step-list">
                <li>{t.d6L[0]}</li>
                <li>{t.d6L[1]}</li>
                <li>{t.d6L[2]}</li>
                <li>{t.d6L[3]}</li>
                <li>{t.d6L[4]}</li>
                <li>{t.d6L[5]}</li>
              </ul>
            </StepCard>

          </AnimateOnScreen>
        </SectionContainer>

        {/* PDF BANNER */}
        <SectionContainer>
          <AnimateOnScreen>
            <div style={{
              padding: '48px 40px',
              borderRadius: '16px',
              border: '1.5px solid #EA281E',
              background: theme.name === 'light' ? '#fff8f8' : 'rgba(234,40,30,0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}>
              <div>
                <span style={{ color: '#EA281E', fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FilePdf size={18} color="#EA281E" />
                  {lang === 'fr' ? 'DOSSIER DE CADRAGE' : 'SCOPING DOSSIER'}
                </span>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  {lang === 'fr' ? 'Télécharger les Résultats de Découverte' : 'Download Discovery Findings'}
                </h3>
                <p style={{ margin: 0, opacity: 0.85, fontSize: '1.05rem', maxWidth: '600px' }}>
                  {lang === 'fr'
                    ? 'Découvrez les modèles d’analyse, les grilles de questions et les exigences structurelles du projet.'
                    : 'Discover analysis models, question frameworks, and structural project requirements.'}
                </p>
              </div>
              <PdfViewerModal
                pdfUrl="/docs/presentation-crafti.pdf"
                title={lang === 'fr' ? 'Dossier de Découverte CRAFTI' : 'CRAFTI Discovery Dossier'}
                buttonText={lang === 'fr' ? 'Consulter le PDF' : 'View PDF'}
              />
            </div>
          </AnimateOnScreen>
        </SectionContainer>

        {/* CALL TO ACTION & ROUTE NAV */}
        <NextProjectNav>
          <AnimateOnScreen>
            <h2>{t.nextTitle}</h2>
            <p>
              {t.nextDesc}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ color: '#EA281E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t.nextExplore}
              </span>
            </div>

            <RouteChips>
              {[...routes, ...methodologyRoutes].map(route => {
                const isActive = route.path === currentPath;
                return (
                  <Link key={route.id} href={route.path} passHref>
                    <RouteChip
                      active={isActive}
                      onMouseEnter={addCursorBorder}
                      onMouseLeave={removeCursorBorder}
                    >
                      <span>{route.title[lang] || route.title.fr}</span>
                      {isActive && <span>✓</span>}
                    </RouteChip>
                  </Link>
                );
              })}
            </RouteChips>
          </AnimateOnScreen>
        </NextProjectNav>
      </PageWrapper>
    </>
  );
};

export default DiscoveryPage;
