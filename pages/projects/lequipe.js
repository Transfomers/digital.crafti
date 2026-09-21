import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';
import { secondaryFontStyle } from '../../styles/shared/text';
import useCursorStyle from '../../hooks/useCursorStyle';
import AnimateOnScreen from '../../components/AnimateOnScreen';
import LinkedIn from '../../components/Icons/LinkedIn';
import { useLanguage } from '../../context/language';
import { translations } from '../../locales/lequipe';
import routes, { methodologyRoutes } from '../../utils/constants/routes';
import PdfViewerModal from '../../components/PdfViewer';
import { Users, FilePdf } from '../../components/Icons/ProjectIcons';

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

  & .step-subtitle {
    font-size: 1.2rem;
    line-height: 1.4;
    font-weight: 500;
    color: ${({ theme }) => (theme.name === 'light' ? '#444' : '#bbb')};
    margin: 0 0 24px;
  }

  & .step-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px;
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      font-size: 1.05rem;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 10px;

      &::before {
        content: '•';
        color: ${({ theme }) => theme.colors.red};
        font-weight: bold;
        font-size: 1.2rem;
        line-height: 1;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.small`
    padding: 28px 20px;
    & .step-subtitle { font-size: 1.05rem; }
    & .step-list { grid-template-columns: 1fr; gap: 10px; }
  `};
`;

const MemberHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => (theme.name === 'light' ? '#ebebeb' : '#1f1f1f')};
  padding-bottom: 20px;
  gap: 16px;

  ${({ theme }) => theme.breakpoints.small`
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  `};
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MemberName = styled.h3`
  font-size: 2.1rem;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.text};

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 1.6rem;
  `};
`;

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.red};
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 0.95rem;
  `};
`;

const LinkedInButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 9999px;
  border: 1.5px solid ${({ theme }) => (theme.name === 'light' ? '#e0e0e0' : '#262626')};
  background: ${({ theme }) => (theme.name === 'light' ? '#ffffff' : '#141414')};
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.25s ease;
  flex-shrink: 0;

  & svg {
    width: 17px;
    height: 17px;
    fill: ${({ theme }) => theme.colors.red};
    transition: transform 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.red};
    background: ${({ theme }) => theme.colors.red};
    color: #ffffff;

    & svg {
      fill: #ffffff;
      transform: scale(1.1);
    }
  }

  ${({ theme }) => theme.breakpoints.small`
    padding: 8px 16px;
    font-size: 0.8125rem;
    align-self: flex-start;
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
            <div style={{ marginTop: '36px' }}>
              <PdfViewerModal
                pdfUrl="/docs/presentation-crafti.pdf"
                title={lang === 'fr' ? 'Présentation de l’Équipe & Dossier CRAFTI' : 'CRAFTI Team & Company Dossier'}
                buttonText={lang === 'fr' ? 'Consulter le Dossier Complet (PDF)' : 'View Full Dossier (PDF)'}
              />
            </div>
          </AnimateOnScreen>
        </HeroSection>

        {/* TEAM PROFILES */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.s1Tag}</SectionTag>
              <SectionHeading>{t.s1Head}</SectionHeading>
            </SectionHeader>

            {t.members && t.members.map((member, idx) => (
              <StepCard key={idx}>
                <MemberHeader>
                  <MemberInfo>
                    <MemberName>{member.name}</MemberName>
                    <RoleBadge>{member.role}</RoleBadge>
                  </MemberInfo>
                  {member.linkedin && (
                    <LinkedInButton
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={addCursorBorder}
                      onMouseLeave={removeCursorBorder}
                      title={`LinkedIn: ${member.name}`}
                    >
                      <LinkedIn />
                      <span>LinkedIn</span>
                    </LinkedInButton>
                  )}
                </MemberHeader>
                <h4 className="step-subtitle">{member.sub}</h4>
                <ul className="step-list">
                  {member.skills.map((skill, sIdx) => (
                    <li key={sIdx}>{skill}</li>
                  ))}
                </ul>
                {member.quote && (
                  <QuoteCard style={{ marginTop: '24px', borderColor: theme.colors.red, padding: '24px' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </QuoteCard>
                )}
              </StepCard>
            ))}

          </AnimateOnScreen>
        </SectionContainer>

        {/* PDF BANNER */}
        <SectionContainer>
          <AnimateOnScreen>
            <div style={{
              padding: '48px 40px',
              borderRadius: '16px',
              border: '1.5px solid #EA281E',
              background: '#fff8f8',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}>
              <div>
                <span style={{ color: '#EA281E', fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Users size={18} color="#EA281E" />
                  {lang === 'fr' ? 'ÉQUIPE PROJET DÉDIÉE' : 'DEDICATED PROJECT TEAM'}
                </span>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  {lang === 'fr' ? 'Dossier de Compétences & Présentation' : 'Skills & Presentation Dossier'}
                </h3>
                <p style={{ margin: 0, opacity: 0.85, fontSize: '1.05rem', maxWidth: '600px' }}>
                  {lang === 'fr'
                    ? 'Découvrez les profils de nos experts, notre méthodologie de travail et notre engagement de qualité.'
                    : 'Discover expert profiles, development methodology, and quality commitments.'}
                </p>
              </div>
              <PdfViewerModal
                pdfUrl="/docs/presentation-crafti.pdf"
                title={lang === 'fr' ? 'Dossier de Présentation CRAFTI' : 'CRAFTI Presentation Dossier'}
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

export default TheTeamPage;
