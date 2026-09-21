import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '../../context/language';
import { translations } from '../../locales/notre-approche';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';
import { secondaryFontStyle } from '../../styles/shared/text';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import AnimateOnScreen from '../../components/AnimateOnScreen';
import Arrow from '../../components/Icons/Arrow';
import routes, { methodologyRoutes } from '../../utils/constants/routes';
import PdfViewerModal from '../../components/PdfViewer';
import {
  Compass,
  Layers,
  Server,
  Sparkles,
  Database,
  GitBranch,
  CheckCircle,
  Rocket,
  Users,
  Shield,
  FilePdf,
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
  margin-bottom: 120px;

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 70px;
  `};
`;

const SubtitleTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.red};
  ${secondaryFontStyle};
  font-size: 1.1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -1.5px;
  margin: 0 0 32px;
  max-width: 980px;
  text-transform: uppercase;

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 2.3rem;
    line-height: 1.1;
  `};
`;

const HeroLead = styled.p`
  font-size: 1.625rem;
  line-height: 1.35;
  color: ${({ theme }) => theme.text};
  opacity: 0.85;
  max-width: 800px;
  margin: 0;

  ${({ theme }) => theme.breakpoints.tablet`
    font-size: 1.2rem;
  `};
`;

const VideoSection = styled.section`
  width: 100%;
  max-width: 1234px;
  padding: 0 32px;
  margin: 0 auto 140px;

  & video {
    width: 100%;
    height: 520px;
    object-fit: cover;
    display: block;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 80px;
    & video {
      height: 300px;
    }
  `};
`;

const SectionContainer = styled.section`
  ${containerStyles};
  margin-bottom: 140px;

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 90px;
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

const EcosystemCard = styled.div`
  background: ${({ theme }) => (theme.name === 'light' ? '#f5f5f5' : '#0c0c0c')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e0e0e0' : '#1f1f1f')};
  padding: 56px 48px;
  margin-top: 36px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${({ theme }) => theme.colors.red};
  }

  & p {
    font-size: 1.35rem;
    line-height: 1.6;
    margin: 0 0 20px;
    max-width: 900px;

    &:last-child {
      margin-bottom: 0;
      color: ${({ theme }) => theme.colors.red};
      font-weight: 700;
    }
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 32px 24px;
    & p {
      font-size: 1.1rem;
    }
  `};
`;

const StepCard = styled.div`
  background: ${({ theme }) => (theme.name === 'light' ? '#fafafa' : '#0e0e0e')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e5e5e5' : '#1b1b1b')};
  padding: 48px 40px;
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.red};
  }

  ${({ theme }) => theme.breakpoints.small`
    padding: 32px 20px;
  `};
`;

const QuestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;

  ${({ theme }) => theme.breakpoints.tablet`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${({ theme }) => theme.breakpoints.small`
    grid-template-columns: 1fr;
  `};
`;

const QuestionCard = styled.div`
  background: ${({ theme }) => (theme.name === 'light' ? '#f8f8f8' : '#0e0e0e')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e5e5e5' : '#1a1a1a')};
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.red};
  }

  & .q-num {
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.9rem;
    font-weight: 800;
    font-family: monospace;
    margin-bottom: 16px;
  }

  & .q-text {
    font-size: 1.15rem;
    line-height: 1.35;
    font-weight: 600;
    margin: 0;
  }
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 48px;

  ${({ theme }) => theme.breakpoints.tablet`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${({ theme }) => theme.breakpoints.small`
    grid-template-columns: 1fr;
  `};
`;

const PillarCard = styled.div`
  border-top: 2px solid ${({ theme }) => theme.colors.red};
  padding-top: 24px;

  & h3 {
    font-size: 1.35rem;
    font-weight: 800;
    margin: 0 0 12px;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.text};
  }

  & p {
    font-size: 1.05rem;
    line-height: 1.45;
    opacity: 0.8;
    margin: 0;
  }
`;

const JourneyFlow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
  padding: 40px 32px;
  background: ${({ theme }) => (theme.name === 'light' ? '#f4f4f4' : '#0a0a0a')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e2e2e2' : '#1b1b1b')};

  ${({ theme }) => theme.breakpoints.small`
    flex-direction: column;
    align-items: flex-start;
  `};
`;

const JourneyNode = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  & .name {
    font-size: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 10px 18px;
    background: ${({ theme }) => (theme.name === 'light' ? '#ffffff' : '#141414')};
    border: 1px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.text};
  }

  & .arrow {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 900;
    font-size: 1.25rem;
  }

  ${({ theme }) => theme.breakpoints.small`
    & .arrow {
      transform: rotate(90deg);
      margin: 4px 0 4px 18px;
    }
  `};
`;

const JourneysList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;

  ${({ theme }) => theme.breakpoints.tablet`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${({ theme }) => theme.breakpoints.small`
    grid-template-columns: 1fr;
  `};
`;

const JourneyItem = styled.div`
  padding: 24px;
  background: ${({ theme }) => (theme.name === 'light' ? '#fafafa' : '#0f0f0f')};
  border-left: 3px solid ${({ theme }) => theme.colors.red};

  & p {
    font-size: 1.1rem;
    line-height: 1.4;
    font-weight: 600;
    margin: 0;
  }
`;

const StudioIdentity = styled.div`
  background: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.background};
  padding: 80px 48px;
  margin-top: 40px;

  & h2 {
    font-size: 3rem;
    font-weight: 900;
    margin: 0 0 8px;
    text-transform: uppercase;
  }

  & h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 32px;
    opacity: 0.9;
  }

  & p {
    font-size: 1.3rem;
    line-height: 1.5;
    max-width: 900px;
    margin: 0 0 16px;
  }

  & .tags {
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 48px 24px;
    & h2 { font-size: 2rem; }
    & h3 { font-size: 1.2rem; }
    & p { font-size: 1.05rem; }
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

const ProjectPage = () => {
  const router = useRouter();
  const theme = useStyledTheme();
  const { lang } = useLanguage();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const currentPath = router.asPath;
  const t = translations[lang];

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
            <SubtitleTag>
              <span>{t.tag1}</span>
              <span>•</span>
              <span>2026</span>
            </SubtitleTag>
            <MainTitle>
              {t.mainTitle}
            </MainTitle>
            <HeroLead>
              {t.heroLead}
            </HeroLead>
            <div style={{ marginTop: '36px' }}>
              <PdfViewerModal
                pdfUrl="/docs/presentation-crafti.pdf"
                title={lang === 'fr' ? 'Dossier Méthodologique & Technique CRAFTI' : 'CRAFTI Technical & Methodological Dossier'}
                buttonText={lang === 'fr' ? 'Consulter le Dossier PDF' : 'View Full PDF Dossier'}
              />
            </div>
          </AnimateOnScreen>
        </HeroSection>

        {/* VIDEO PREVIEW */}
        <VideoSection>
          <AnimateOnScreen>
            <video loop autoPlay muted playsInline src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Christ_Church_Cathedral_Dublin_video.webm" style={{ filter: 'grayscale(100%) brightness(0.7)' }} />
          </AnimateOnScreen>
        </VideoSection>

        {/* ECOSYSTEM SHIFT */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.visionTag}</SectionTag>
              <SectionHeading>
                {t.visionHeading}
              </SectionHeading>
            </SectionHeader>
            <EcosystemCard>
              <p>
                {t.visionText1}
              </p>
              <p style={{ color: theme.colors.red, fontWeight: 700, fontSize: '1.6rem' }}>
                {t.visionHighlight}
              </p>
              <p>
                {t.visionText2}
              </p>
            </EcosystemCard>
          </AnimateOnScreen>
        </SectionContainer>

        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.archTag}</SectionTag>
              <SectionHeading>{t.archHeading}</SectionHeading>
            </SectionHeader>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <StepCard style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: theme.colors.red, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={26} color="#EA281E" />
                  <span>{t.archPeopleTitle}</span>
                </h3>
                <p style={{ fontSize: '1.15rem', opacity: 0.9 }}>
                  {t.archPeopleText}
                </p>
              </StepCard>

              <StepCard style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: theme.colors.red, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Shield size={26} color="#EA281E" />
                  <span>{t.archManagementTitle}</span>
                </h3>
                <p style={{ fontSize: '1.15rem', opacity: 0.9 }}>
                  {t.archManagementText}
                </p>
              </StepCard>

              <StepCard style={{ padding: '32px', background: theme.name === 'light' ? '#eee' : '#111' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: theme.text, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Server size={26} color={theme.text} />
                  <span>{t.archInfraTitle}</span>
                </h3>
                <p style={{ fontSize: '1.15rem', opacity: 0.9 }}>
                  {t.archInfraText}
                </p>
              </StepCard>
            </div>
          </AnimateOnScreen>
        </SectionContainer>

        {/* QUESTIONS - WE DON'T START WITH CODE */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.discoveryTag}</SectionTag>
              <SectionHeading>{t.discoveryHeading}</SectionHeading>
              <p style={{ marginTop: '16px', fontSize: '1.25rem', opacity: 0.85 }}>
                {t.discoveryText}
              </p>
            </SectionHeader>

            <QuestionsGrid>
              <QuestionCard>
                <span className="q-num">01 / AUDIENCE</span>
                <p className="q-text">{t.q1}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">02 / INTENTION</span>
                <p className="q-text">{t.q2}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">03 / ACCÈS</span>
                <p className="q-text">{t.q3}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">04 / SOUTIEN</span>
                <p className="q-text">{t.q4}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">05 / ENGAGEMENT</span>
                <p className="q-text">{t.q5}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">06 / RÉCEPTION</span>
                <p className="q-text">{t.q6}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">07 / RESPONSABILITÉ</span>
                <p className="q-text">{t.q7}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">08 / AUTOMATISATION</span>
                <p className="q-text">{t.q8}</p>
              </QuestionCard>
              <QuestionCard>
                <span className="q-num">09 / TOUCHE HUMAINE</span>
                <p className="q-text">{t.q9}</p>
              </QuestionCard>
            </QuestionsGrid>
          </AnimateOnScreen>
        </SectionContainer>

        {/* CRAFTI APPROACH PILLARS */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.pillarsTag}</SectionTag>
              <SectionHeading>
                {t.pillarsHeading}
              </SectionHeading>
            </SectionHeader>

            <PillarsGrid>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><Compass size={28} /></div>
                <h3>STRATÉGIE</h3>
                <p>{t.p1}</p>
              </PillarCard>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><Layers size={28} /></div>
                <h3>UX / UI</h3>
                <p>{t.p2}</p>
              </PillarCard>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><Server size={28} /></div>
                <h3>TECHNOLOGIE</h3>
                <p>{t.p3}</p>
              </PillarCard>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><Sparkles size={28} /></div>
                <h3>IA</h3>
                <p>{t.p4}</p>
              </PillarCard>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><Database size={28} /></div>
                <h3>DONNÉES</h3>
                <p>{t.p5}</p>
              </PillarCard>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><GitBranch size={28} /></div>
                <h3>INTÉGRATION</h3>
                <p>{t.p6}</p>
              </PillarCard>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><CheckCircle size={28} /></div>
                <h3>QUALITÉ</h3>
                <p>{t.p7}</p>
              </PillarCard>
              <PillarCard>
                <div style={{ color: '#EA281E', marginBottom: '12px' }}><Rocket size={28} /></div>
                <h3>ÉVOLUTION</h3>
                <p>{t.p8}</p>
              </PillarCard>
            </PillarsGrid>
          </AnimateOnScreen>
        </SectionContainer>

        {/* ONE PROJECT. MANY CONNECTIONS */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.journeyTag}</SectionTag>
              <SectionHeading>{t.journeyHeading}</SectionHeading>
              <p style={{ marginTop: '16px', fontSize: '1.25rem', opacity: 0.85 }}>
                {t.journeyText}
              </p>
            </SectionHeader>

            <JourneyFlow>
              {t.jNodes.map((node) => (
                <JourneyNode key={node}>
                  <span className="name">{node}</span>
                  <span className="arrow">→</span>
                </JourneyNode>
              ))}
              <JourneyNode>
                <span className="name" style={{ borderColor: theme.text, background: theme.colors.red, color: '#fff' }}>
                  {t.jImpact}
                </span>
              </JourneyNode>
            </JourneyFlow>
          </AnimateOnScreen>
        </SectionContainer>

        {/* OUR COMMITMENT */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.commitmentTag}</SectionTag>
              <SectionHeading>{t.commitmentHeading}</SectionHeading>
              <p style={{ marginTop: '16px', fontSize: '1.25rem', opacity: 0.85 }}>
                {t.commitmentText}
              </p>
            </SectionHeader>

            <JourneysList>
              {t.cItems.map((item, index) => (
                <JourneyItem key={index}>
                  <p>{item}</p>
                </JourneyItem>
              ))}
            </JourneysList>
          </AnimateOnScreen>
        </SectionContainer>

        {/* STUDIO IDENTITY */}
        <SectionContainer>
          <AnimateOnScreen>
            <StudioIdentity>
              <h2>{t.studioTitle}</h2>
              <h3>{t.studioSubtitle}</h3>
              <p>
                {t.studioText1}
              </p>
              <p>
                {t.studioText2}
              </p>
              <div className="tags">
                {t.studioTags}
              </div>
            </StudioIdentity>
          </AnimateOnScreen>
        </SectionContainer>

        {/* CALL TO ACTION & ROUTE NAV */}
        <NextProjectNav>
          <AnimateOnScreen>
            <h2>{t.nextTitle}</h2>
            <p>
              {t.nextText}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ color: theme.colors.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t.nextExplore}
              </span>
            </div>

            <RouteChips>
              {[...routes, ...methodologyRoutes].map(route => {
                const isActive = currentPath === route.path || (route.id === 'our-approach' && currentPath.includes('our-approach'));
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

export default ProjectPage;
