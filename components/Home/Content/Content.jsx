import React from 'react';
import AnimateOnScreen from '../../AnimateOnScreen';
import { useLanguage } from '../../../context/language';
import { ContentSection, TextWrapper, Text } from './styles';

const Content = () => {
  const { lang } = useLanguage();

  return (
    <AnimateOnScreen>
      <ContentSection>
        <TextWrapper>
          <Text>
            {lang === 'fr'
              ? "Nous soumettons cette proposition de collaboration pour la conception, le développement et le déploiement de la plateforme web et de l'application mobile de l'EMUC. Les idées deviennent plus claires lorsque la stratégie, la technologie et la communication travaillent de concert. Nous allons au-delà de la simple création de produits numériques - nous découvrons le véritable besoin, concevons la bonne solution et construisons des plateformes qui créent une valeur significative."
              : "We submit this collaboration proposal for the design, development, and deployment of the EMUC web platform and mobile application. Ideas become clearer when strategy, technology and communication work together. We go beyond building digital products - we uncover the real need, shape the right solution, and build platforms that create meaningful value."}
          </Text>
        </TextWrapper>
      </ContentSection>
    </AnimateOnScreen>
  );
};

export default Content;
