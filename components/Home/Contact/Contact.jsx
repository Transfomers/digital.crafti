import React from 'react';
import useCursorStyle from '../../../hooks/useCursorStyle';
import { useLanguage } from '../../../context/language';
import AnimateOnScreen from '../../AnimateOnScreen';
import SocialMedia from '../../SocialMedia';
import { ContactSection } from './styles';

const Contact = () => {
  const { lang } = useLanguage();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <AnimateOnScreen>
      <ContactSection>
        <div className="column">
          <div className="contact-group">
            <a
              className="contact-text"
              href="mailto:contact@craftistudio.tech"
              onMouseEnter={addCursorBorder}
              onMouseLeave={removeCursorBorder}
            >
              contact@craftistudio.tech
            </a>
            <a
              className="contact-text"
              href="mailto:dev@crafti.digital"
              onMouseEnter={addCursorBorder}
              onMouseLeave={removeCursorBorder}
            >
              dev@crafti.digital
            </a>
          </div>
          <div className="contact-group">
            <a
              className="contact-text"
              href="tel:+237695266214"
              onMouseEnter={addCursorBorder}
              onMouseLeave={removeCursorBorder}
            >
              +237 695 266 214
            </a>
            <a
              className="contact-text"
              href="tel:+237679428243"
              onMouseEnter={addCursorBorder}
              onMouseLeave={removeCursorBorder}
            >
              +237 679 428 243
            </a>
          </div>
        </div>
        <div className="column address-col">
          <address className="contact-text">
            Yaoundé, {lang === 'fr' ? 'Cameroun' : 'Cameroon'}
          </address>
          <span className="copyright-text">
            © Crafti studio 2026
          </span>
        </div>
        <SocialMedia className="column" />
      </ContactSection>
    </AnimateOnScreen>
  );
};

export default React.memo(Contact);
