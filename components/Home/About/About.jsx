import React from 'react';
import items from '../../../utils/constants/services-items';
import useCursorStyle from '../../../hooks/useCursorStyle';
import { useLanguage } from '../../../context/language';
import AnimateOnScreen from '../../AnimateOnScreen';
import {
  ContentSection,
  TextWrapper,
  ServicesWrapper,
  AccordionToggle,
  AccordionContent,
} from './styles';

const About = () => {
  const [selectedItem, setSelectedItem] = React.useState(0);
  const { lang } = useLanguage();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  const handleMouseEnter = React.useCallback(
    curr => {
      if (curr === selectedItem) return;

      addCursorBorder();
    },
    [selectedItem, addCursorBorder],
  );

  const handleMouseLeave = React.useCallback(
    curr => {
      if (curr === selectedItem) return;

      removeCursorBorder();
    },
    [selectedItem, removeCursorBorder],
  );

  return (
    <AnimateOnScreen>
      <ContentSection>
        <TextWrapper>
          <h2>
            {lang === 'fr'
              ? "Crafti est un Studio de Technologie & Communication qui aide les entreprises, institutions et organisations à transformer des besoins complexes en solutions numériques pratiques."
              : "Crafti is a Technology & Communication Studio that helps companies, institutions, and organizations transform complex needs into practical digital solutions."}
          </h2>
          <p>
            {lang === 'fr'
              ? "De la stratégie et l'UX au développement, en passant par l'IA, les intégrations et la communication numérique, nous associons la réflexion à l'exécution technique pour construire des solutions performantes aujourd'hui et capables d'évoluer demain."
              : "From strategy and UX to development, AI, integrations, and digital communication, we pair strategic thinking with technical execution to build solutions that perform today and scale tomorrow."}
          </p>
        </TextWrapper>
        <ServicesWrapper>
          <h3>{lang === 'fr' ? "Services" : "Services"}</h3>
          {items[lang].map(([item, servicesList], itemIndex) => (
            <React.Fragment key={item}>
              <AccordionToggle
                aria-expanded={itemIndex === selectedItem}
                onClick={() => setSelectedItem(itemIndex)}
                onMouseEnter={() => handleMouseEnter(itemIndex)}
                onMouseLeave={() => handleMouseLeave(itemIndex)}
              >
                {item}
              </AccordionToggle>
              <AccordionContent
                animate={{ height: itemIndex === selectedItem ? '100%' : '0' }}
                transition={{ duration: 0.7, ease: [0, 0.7, 0.29, 0.97] }}
              >
                {servicesList.map((service, serviceIndex) => (
                  <p key={`${itemIndex}_${serviceIndex}`}>{service}</p>
                ))}
              </AccordionContent>
            </React.Fragment>
          ))}
        </ServicesWrapper>
      </ContentSection>
    </AnimateOnScreen>
  );
};

export default React.memo(About);
