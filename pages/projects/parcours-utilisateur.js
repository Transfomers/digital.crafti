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
import { translations } from '../../locales/parcours-utilisateur';
import routes, { methodologyRoutes } from '../../utils/constants/routes';

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

const FlowChain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 36px 28px;
  background: ${({ theme }) => (theme.name === 'light' ? '#f2f2f2' : '#0a0a0a')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#dedede' : '#1c1c1c')};
  margin: 32px 0;

  & .node {
    font-size: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    padding: 16px 24px;
    background: ${({ theme }) => (theme.name === 'light' ? '#ffffff' : '#141414')};
    border: 2px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.text};
    text-align: center;
    width: 100%;
    max-width: 400px;
  }
  
  & .node-sub {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.8;
    display: block;
    margin-top: 4px;
  }

  & .sep {
    color: ${({ theme }) => theme.colors.red};
    font-size: 1.5rem;
    font-weight: 900;
  }
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

const ParcoursPage = () => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const currentPath = '/projects/parcours-utilisateur';
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
          </AnimateOnScreen>
        </HeroSection>
        
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.s1Tag}</SectionTag>
              <SectionHeading>{t.s1Head}</SectionHeading>
            </SectionHeader>

            <FlowChain>
              <div className="node">
                {t.n1}
                <span className="node-sub">{t.n1Sub}</span>
              </div>
              <span className="sep">↓</span>
              
              <div className="node">
                {t.n2}
                <span className="node-sub">{t.n2Sub}</span>
              </div>
              <span className="sep">↓</span>
              
              <div className="node">
                {t.n3}
                <span className="node-sub">{t.n3Sub}</span>
              </div>
              <span className="sep">↓</span>
              
              <div className="node">
                {t.n4}
                <span className="node-sub">{t.n4Sub}</span>
              </div>
              <span className="sep">↓</span>
              
              <div className="node">
                {t.n5}
                <span className="node-sub">{t.n5Sub}</span>
              </div>
            </FlowChain>

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

export default ParcoursPage;
