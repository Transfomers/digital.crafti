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
import { translations } from '../../locales/lequipe';
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

const TheTeamPage = () => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const currentPath = '/projects/lequipe';
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
          </AnimateOnScreen>
        </HeroSection>

        {/* TEAM PROFILES */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.s1Tag}</SectionTag>
              <SectionHeading>{t.s1Head}</SectionHeading>
            </SectionHeader>

            <StepCard>
              <div className="step-header">
                <h3 className="step-title">{t.p1Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.p1Sub}</h4>
              <ul className="step-list">
                <li>{t.p1L[0]}</li>
                <li>{t.p1L[1]}</li>
                <li>{t.p1L[2]}</li>
                <li>{t.p1L[3]}</li>
                <li>{t.p1L[4]}</li>
                <li>{t.p1L[5]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <h3 className="step-title">{t.p2Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.p2Sub}</h4>
              <ul className="step-list">
                <li>{t.p2L[0]}</li>
                <li>{t.p2L[1]}</li>
                <li>{t.p2L[2]}</li>
                <li>{t.p2L[3]}</li>
                <li>{t.p2L[4]}</li>
                <li>{t.p2L[5]}</li>
                <li>{t.p2L[6]}</li>
                <li>{t.p2L[7]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <h3 className="step-title">{t.p3Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.p3Sub}</h4>
              <ul className="step-list">
                <li>{t.p3L[0]}</li>
                <li>{t.p3L[1]}</li>
                <li>{t.p3L[2]}</li>
                <li>{t.p3L[3]}</li>
                <li>{t.p3L[4]}</li>
                <li>{t.p3L[5]}</li>
                <li>{t.p3L[6]}</li>
                <li>{t.p3L[7]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <h3 className="step-title">{t.p4Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.p4Sub}</h4>
              <ul className="step-list">
                <li>{t.p4L[0]}</li>
                <li>{t.p4L[1]}</li>
                <li>{t.p4L[2]}</li>
                <li>{t.p4L[3]}</li>
                <li>{t.p4L[4]}</li>
                <li>{t.p4L[5]}</li>
                <li>{t.p4L[6]}</li>
                <li>{t.p4L[7]}</li>
              </ul>
              <QuoteCard style={{ marginTop: '24px', borderColor: theme.colors.red, padding: '24px' }}>
                <p style={{ fontStyle: 'italic', fontSize: '1.25rem' }}>
                  {t.p4Quote}
                </p>
              </QuoteCard>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <h3 className="step-title">{t.p5Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.p5Sub}</h4>
              <ul className="step-list">
                <li>{t.p5L[0]}</li>
                <li>{t.p5L[1]}</li>
                <li>{t.p5L[2]}</li>
                <li>{t.p5L[3]}</li>
                <li>{t.p5L[4]}</li>
                <li>{t.p5L[5]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <h3 className="step-title">{t.p6Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.p6Sub}</h4>
              <ul className="step-list">
                <li>{t.p6L[0]}</li>
                <li>{t.p6L[1]}</li>
                <li>{t.p6L[2]}</li>
                <li>{t.p6L[3]}</li>
                <li>{t.p6L[4]}</li>
                <li>{t.p6L[5]}</li>
                <li>{t.p6L[6]}</li>
              </ul>
            </StepCard>

            <StepCard>
              <div className="step-header">
                <h3 className="step-title">{t.p7Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.p7Sub}</h4>
              <ul className="step-list">
                <li>{t.p7L[0]}</li>
                <li>{t.p7L[1]}</li>
                <li>{t.p7L[2]}</li>
                <li>{t.p7L[3]}</li>
                <li>{t.p7L[4]}</li>
                <li>{t.p7L[5]}</li>
                <li>{t.p7L[6]}</li>
              </ul>
            </StepCard>

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

export default TheTeamPage;
