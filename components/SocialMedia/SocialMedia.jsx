import React from 'react';
import useCursorStyle from '../../hooks/useCursorStyle';
import { Facebook, Instagram, LinkedIn, TikTok } from '../Icons';
import StickyCursor from '../StickyCursor';
import { Container, Link } from './styles';

const medias = [
  { component: Instagram, url: 'https://www.instagram.com/studio.crafti?igsh=MWkyN3Fya2FibTdheg%3D%3D&utm_source=qr' },
  { component: Facebook, url: 'https://www.facebook.com/share/1BbTcBFFNA/' },
  { component: TikTok, url: 'https://www.tiktok.com/@crafti.studio7?_r=1&_t=ZS-98vvECFdOZ2' },
  { component: LinkedIn, url: 'https://www.linkedin.com/company/139073975/' },
];

const SocialMedia = props => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <Container {...props}>
      {medias.map(({ component: Component, url }) => (
        <StickyCursor key={url}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={url}
            onMouseEnter={addCursorBorder}
            onMouseLeave={removeCursorBorder}
          >
            <Component />
          </Link>
        </StickyCursor>
      ))}
    </Container>
  );
};

export default React.memo(SocialMedia);
