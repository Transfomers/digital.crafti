import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';
import { secondaryFontStyle } from '../../styles/shared/text';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import AnimateOnScreen from '../../components/AnimateOnScreen';
import { useLanguage } from '../../context/language';
import { translations } from '../../locales/notre-methode';
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

  & .output-badge {
    display: inline-block;
    padding: 12px 20px;
    background: ${({ theme }) => (theme.name === 'light' ? '#f0f0f0' : '#161616')};
    border-left: 3px solid ${({ theme }) => theme.colors.red};
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
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
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  padding: 36px 28px;
  background: ${({ theme }) => (theme.name === 'light' ? '#f2f2f2' : '#0a0a0a')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#dedede' : '#1c1c1c')};
  margin: 32px 0;

  & .node {
    font-size: 1.1rem;
    font-weight: 800;
    text-transform: uppercase;
    padding: 10px 18px;
    background: ${({ theme }) => (theme.name === 'light' ? '#ffffff' : '#141414')};
    border: 1px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.text};
  }

  & .sep {
    color: ${({ theme }) => theme.colors.red};
    font-size: 1.25rem;
    font-weight: 900;
  }

  ${({ theme }) => theme.breakpoints.small`
    flex-direction: column;
    align-items: stretch;
    & .sep { text-align: center; }
  `};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 36px;
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e5e5e5' : '#1a1a1a')};

  & table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  & th, & td {
    padding: 18px 24px;
    border-bottom: 1px solid ${({ theme }) => (theme.name === 'light' ? '#ebebeb' : '#1a1a1a')};
    font-size: 1.05rem;
  }

  & th {
    background: ${({ theme }) => (theme.name === 'light' ? '#f0f0f0' : '#121212')};
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.red};
  }

  & tr:last-child td {
    border-bottom: none;
  }

  & td:last-child {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
`;

const DifferenceCard = styled.div`
  background: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.background};
  padding: 72px 48px;
  margin-top: 48px;

  & h2 {
    font-size: 2.75rem;
    font-weight: 900;
    margin: 0 0 24px;
    text-transform: uppercase;
  }

  & .lead-q {
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0 0 32px;
  }

  & .q-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 32px;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 24px;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 40px 24px;
    & h2 { font-size: 1.9rem; }
    & .lead-q { font-size: 1.3rem; }
    & .q-list { grid-template-columns: 1fr; }
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

const OurMethodPage = () => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const theme = useStyledTheme();
  const currentPath = '/projects/notre-methode';
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta
          name="description"
          content={t.metaDesc}
        />
      </Head>

      <PageWrapper>
        {/* HERO */}
        <HeroSection>
          <AnimateOnScreen>
            <MainTitle>{t.mainTitle}</MainTitle>
            <HeroLead>
              {t.heroLead}
            </HeroLead>
            <QuoteCard>
              <p>
                {t.quote}
              </p>
            </QuoteCard>
          </AnimateOnScreen>
        </HeroSection>

        {/* 9 STAGES SECTION */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.stepsTag}</SectionTag>
              <SectionHeading>{t.stepsHeading}</SectionHeading>
            </SectionHeader>

            {/* 01 DISCOVER */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.step1Num}</span>
                <h3 className="step-title">{t.step1Title}</h3>
              </div>
              <h4 className="step-subtitle">{t.step1Subtitle}</h4>
              <p className="step-body">
                {t.step1Body}
              </p>
              <ul className="step-list">
                <li>Objectifs organisationnels & publics cibles</li>
                <li>Profils des utilisateurs & outils numériques existants</li>
                <li>Contenu existant & canaux de communication</li>
                <li>Besoins de formation & structures communautaires</li>
                <li>Flux d'information & processus de suivi</li>
                <li>Exigences administratives & contraintes techniques</li>
                <li>Normes de sécurité & intégrations existantes</li>
                <li>Parcours utilisateurs principaux, de la découverte à l'action</li>
              </ul>
              <div className="output-badge">
                LIVRABLE : Rapport de Découverte + Définition des Exigences + Cartographie Utilisateurs & Informations
              </div>
            </StepCard>

            {/* 02 DEFINE */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.step2Num}</span>
                <h3 className="step-title">DÉFINIR</h3>
              </div>
              <h4 className="step-subtitle">Transformer les besoins en structure de produit.</h4>
              <p className="step-body">
                Une fois la réalité comprise, nous la traduisons en une définition de produit structurée pour éviter que le projet ne devienne une simple collection de fonctionnalités déconnectées :
              </p>
              <ul className="step-list">
                <li><strong>Utilisateurs :</strong> Qui utilise le système ?</li>
                <li><strong>Rôles :</strong> Qui gère, valide ou reçoit l'information ?</li>
                <li><strong>Parcours :</strong> Que doit accomplir chaque utilisateur ?</li>
                <li><strong>Fonctionnalités :</strong> Quelles capacités sont réellement nécessaires ?</li>
                <li><strong>Contenu :</strong> Quelles informations doivent exister ?</li>
                <li><strong>Données :</strong> Quelles informations doivent être collectées et pourquoi ?</li>
                <li><strong>Intégrations :</strong> Quels systèmes doivent communiquer ?</li>
                <li><strong>Priorités :</strong> Qu'est-ce qui est essentiel pour la première version ?</li>
              </ul>
              <div className="output-badge">
                LIVRABLE : Spécifications Fonctionnelles + Parcours Utilisateurs + Priorités Produit
              </div>
            </StepCard>

            {/* 03 EXPERIENCE & UI/UX */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.step3Num}</span>
                <h3 className="step-title">EXPÉRIENCE & UI/UX</h3>
              </div>
              <h4 className="step-subtitle">Concevoir l'expérience avant de la développer.</h4>
              <p className="step-body">
                Nous transformons les exigences en expériences utilisateur intuitives et compréhensibles grâce à l'architecture de l'information, aux maquettes, au design d'interface, aux systèmes de conception et aux prototypes interactifs.
              </p>
              <FlowChain>
                <span className="node">DÉCOUVRIR</span>
                <span className="sep">↓</span>
                <span className="node">{t.fComprendre}</span>
                <span className="sep">↓</span>
                <span className="node">APPRENDRE</span>
                <span className="sep">↓</span>
                <span className="node">DEMANDER</span>
                <span className="sep">↓</span>
                <span className="node">CONNECTER</span>
                <span className="sep">↓</span>
                <span className="node">PARTICIPER</span>
                <span className="sep">↓</span>
                <span className="node">SUIVRE</span>
              </FlowChain>
              <div className="output-badge">
                LIVRABLE : Direction UX/UI validée + prototypes + système de conception
              </div>
            </StepCard>

            {/* 04 ARCHITECT */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.step4Num}</span>
                <h3 className="step-title">ARCHITECTURE</h3>
              </div>
              <h4 className="step-subtitle">Construire une fondation pour de multiples expériences.</h4>
              <p className="step-body">
                La plateforme Web et l'application mobile partagent une base technique cohérente avec des services backend partagés, des APIs, une architecture de base de données, une authentification, des rôles/permissions, des formulaires, des services d'IA et une sécurité.
              </p>
              <div className="output-badge">
                LIVRABLE : Architecture Technique + Modèle de Données + Stratégie d'Intégration + Approche Sécuritaire
              </div>
            </StepCard>

            {/* 05 BUILD */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">{t.step5Num}</span>
                <h3 className="step-title">DÉVELOPPEMENT</h3>
              </div>
              <h4 className="step-subtitle">Développer en incréments structurés.</h4>
              <p className="step-body">
                Le développement est organisé autour de modules fonctionnels (portail Web, application mobile, base de données/formulaires, chatbot IA et intégrations API) en incréments de travail continus.
              </p>
              <div className="output-badge">
                LIVRABLE : Incréments de produit fonctionnels progressivement intégrés dans l'écosystème
              </div>
            </StepCard>

            {/* 06 INTEGRATE */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">ÉTAPE 06</span>
                <h3 className="step-title">INTÉGRATION</h3>
              </div>
              <h4 className="step-subtitle">Faire fonctionner les pièces ensemble.</h4>
              <p className="step-body">
                Nous validons Web ↔ API, Mobile ↔ API, Formulaires ↔ Base de données, Chatbot ↔ Information, Utilisateurs ↔ Communautés, et Interactions ↔ Suivi afin que l'information soutienne la prochaine action réelle.
              </p>
              <div className="output-badge">
                LIVRABLE : Écosystème numérique connecté et intégré
              </div>
            </StepCard>

            {/* 07 TEST */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">ÉTAPE 07</span>
                <h3 className="step-title">TEST</h3>
              </div>
              <h4 className="step-subtitle">Le construire. Le défier. L'améliorer.</h4>
              <p className="step-body">
                Tests continus des exigences fonctionnelles, des parcours utilisateurs, de la validation des données, de l'authentification, des permissions, des comportements responsives, des performances, de la sécurité et de la validation de l'EMUC.
              </p>
              <div className="output-badge">
                LIVRABLE : Solution validée, corrigée et prête à être lancée
              </div>
            </StepCard>

            {/* 08 DEPLOY & TRANSFER */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">ÉTAPE 08</span>
                <h3 className="step-title">DÉPLOIEMENT & TRANSFERT</h3>
              </div>
              <h4 className="step-subtitle">Un lancement réussi inclut les personnes qui utilisent le système.</h4>
              <p className="step-body">
                Déploiement en production (hébergement, SSL, bases de données, packaging pour les app-stores) combiné avec une documentation complète, un accès administratif, des directives opérationnelles et un transfert technique.
              </p>
              <div className="output-badge">
                LIVRABLE : Déploiement opérationnel + documentation complète & transfert de formation
              </div>
            </StepCard>

            {/* 09 SUPPORT & EVOLVE */}
            <StepCard>
              <div className="step-header">
                <span className="step-num">ÉTAPE 09</span>
                <h3 className="step-title">SUPPORT & ÉVOLUTION</h3>
              </div>
              <h4 className="step-subtitle">Le lancement est le début du cycle de vie du produit.</h4>
              <p className="step-body">
                Maintenance continue, mises à jour de sécurité, surveillance, améliorations des performances et évolution des capacités futures sans avoir à reconstruire les fondations.
              </p>
              <div className="output-badge">
                LIVRABLE : Croissance à long terme durable et stabilité technique
              </div>
            </StepCard>
          </AnimateOnScreen>
        </SectionContainer>

        {/* VALIDATION LOOP */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>{t.agileTag}</SectionTag>
              <SectionHeading>{t.agileHeading}</SectionHeading>
              <p style={{ marginTop: '16px', fontSize: '1.25rem', opacity: 0.85, maxWidth: '850px' }}>
                {t.agileDesc}
              </p>
            </SectionHeader>

            <QuoteCard style={{ margin: '0 0 40px', maxWidth: '100%', borderColor: theme.colors.red }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.4rem' }}>
                {t.agileQuote}
              </p>
            </QuoteCard>

            <FlowChain>
              <span className="node">COMPRENDRE</span>
              <span className="sep">↓</span>
              <span className="node">{t.fStructurer}</span>
              <span className="sep">↓</span>
              <span className="node">{t.fPrototyper}</span>
              <span className="sep">↓</span>
              <span className="node">{t.fConstruire}</span>
              <span className="sep">↓</span>
              <span className="node">{t.fDemontrer}</span>
              <span className="sep">↓</span>
              <span className="node">TESTER</span>
              <span className="sep">↓</span>
              <span className="node">DÉPLOYER</span>
              <span className="sep">↓</span>
              <span className="node">TRANSFÉRER</span>
            </FlowChain>
          </AnimateOnScreen>
        </SectionContainer>

        {/* A METHOD BUILT AROUND REAL PROJECT EXPERIENCE (TRANSDJA) */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>Expérience de Projet Réel</SectionTag>
              <SectionHeading>Notre méthodologie n'est pas théorique.</SectionHeading>
              <p style={{ marginTop: '16px', fontSize: '1.25rem', opacity: 0.85, maxWidth: '850px' }}>
                L'approche de Crafti est nourrie par l'expérience de projets numériques où la technologie doit connecter <strong>les utilisateurs, les informations, les services et les besoins opérationnels</strong>.
              </p>
            </SectionHeader>

            <StepCard>
              <div className="step-header">
                <span className="step-num">ÉTUDE DE CAS</span>
                <h3 className="step-title" style={{ fontSize: '1.25rem' }}>Trandjia, ERP FOR ORGANISATION THAT CAN BE SEEN HERE AND OTHERS as po</h3>
              </div>
              <h4 className="step-subtitle">Une expérience de projet qui informe notre approche des produits numériques connectés.</h4>
              <p className="step-body">
                Notre travail sur <strong>Trandjia</strong> nous a donné une expérience directe des réalités d'un produit numérique où la solution devait être considérée bien au-delà de l'interface elle-même. Cette expérience a renforcé un principe essentiel :
              </p>
              <QuoteCard style={{ margin: '20px 0 28px', maxWidth: '100%' }}>
                <p>
                  “Un produit numérique n'est utile que lorsque la technologie, l'information, les utilisateurs et la réalité opérationnelle fonctionnent ensemble.”
                </p>
              </QuoteCard>
              <Link href="/projects" passHref>
                <a style={{ display: 'inline-block', marginBottom: '24px', color: '#EA281E', fontWeight: 600, textDecoration: 'underline' }}>
                  {lang === 'fr' ? 'Découvrez plus de projets sur notre site web' : 'Discover more projects on our website'}
                </a>
              </Link>
              <p className="step-body" style={{ marginBottom: '16px', fontWeight: 600 }}>
                Pour le projet EMUC, nous apportons cette même façon de penser :
              </p>
              <ul className="step-list">
                <li>Comprendre le contexte</li>
                <li>Structurer l'information</li>
                <li>Concevoir l'expérience utilisateur</li>
                <li>Construire la base technique</li>
                <li>Connecter les composants</li>
                <li>Tester avec des cas d'utilisation réels</li>
                <li>Préparer l'organisation à l'exploitation</li>
                <li>Assurer un transfert de connaissances fluide</li>
              </ul>
              <div className="output-badge">
                MÉTHODOLOGIE ÉPROUVÉE • TESTÉE DANS DES ENVIRONNEMENTS OPÉRATIONNELS RÉELS
              </div>
            </StepCard>
          </AnimateOnScreen>
        </SectionContainer>

        {/* REQUIREMENTS MAPPING TABLE */}
        <SectionContainer>
          <AnimateOnScreen>
            <SectionHeader>
              <SectionTag>Alignement Direct</SectionTag>
              <SectionHeading>Ce que cela signifie pour l'EMUC</SectionHeading>
            </SectionHeader>

            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Exigence de l'EMUC</th>
                    <th>Méthodologie Crafti</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Analyse des besoins</td>
                    <td>Découvrir</td>
                  </tr>
                  <tr>
                    <td>Architecture fonctionnelle & technique</td>
                    <td>Définir + Architecturer</td>
                  </tr>
                  <tr>
                    <td>Parcours utilisateurs</td>
                    <td>Découvrir + UX/UI</td>
                  </tr>
                  <tr>
                    <td>Plateforme Web nationale</td>
                    <td>Concevoir + Développer</td>
                  </tr>
                  <tr>
                    <td>Formation en ligne</td>
                    <td>Produit + Développer + Tester</td>
                  </tr>
                  <tr>
                    <td>Chatbot intelligent</td>
                    <td>Définir + IA + Intégrer + Tester</td>
                  </tr>
                  <tr>
                    <td>Base de données & formulaires</td>
                    <td>Architecturer + Développer + Intégrer</td>
                  </tr>
                  <tr>
                    <td>Application mobile</td>
                    <td>Concevoir + Développer + Intégrer</td>
                  </tr>
                  <tr>
                    <td>Cohérence Web/mobile</td>
                    <td>Architecture partagée</td>
                  </tr>
                  <tr>
                    <td>{t.rS}</td>
                    <td>{t.rS_Crafti}</td>
                  </tr>
                  <tr>
                    <td>{t.rDoc}</td>
                    <td>Transférer</td>
                  </tr>
                  <tr>
                    <td>{t.rDep}</td>
                    <td>Déployer</td>
                  </tr>
                  <tr>
                    <td>{t.rAss}</td>
                    <td>Support</td>
                  </tr>
                </tbody>
              </table>
            </TableWrapper>
          </AnimateOnScreen>
        </SectionContainer>

        {/* THE CRAFTI DIFFERENCE */}
        <SectionContainer>
          <AnimateOnScreen>
            <DifferenceCard>
              <h2>{t.diffTitle}</h2>
              <p className="lead-q">
                {t.diffLead.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
              </p>
              <div className="q-list">
                <div>{t.diffQ1}</div>
                <div>{t.diffQ2}</div>
                <div>{t.diffQ3}</div>
                <div>{t.diffQ4}</div>
                <div>{t.diffQ5}</div>
                <div>{t.diffQ6}</div>
              </div>
            </DifferenceCard>
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

export default OurMethodPage;
