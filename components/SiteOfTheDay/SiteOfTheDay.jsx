import React from 'react';
import Link from 'next/link';
import useStyledTheme from '../../hooks/useStyledTheme';
import useCursorStyle from '../../hooks/useCursorStyle';
import { Container, BadgeIcon, BadgeText } from './styles';

const SiteOfTheDay = () => {
  const theme = useStyledTheme();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  return (
    <Container onMouseEnter={addCursorBorder} onMouseLeave={removeCursorBorder}>
      <Link href="https://craftistudio.tech/our_studio" passHref>
        <a target="_blank" rel="noopener noreferrer" title="Crafti Studio">
          {/* Crafti Mark Icon */}
          <BadgeIcon>
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Arc in theme.background color (e.g. black on white badge) */}
              <path
                d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18c9.941 0 18-8.059 18-18h-8.8c0 5.081-4.119 9.2-9.2 9.2-5.081 0-9.2-4.119-9.2-9.2 0-5.081 4.119-9.2 9.2-9.2V0z"
                fill={theme.background}
              />
              {/* Signature Red Accent Tab */}
              <path
                d="M20.5 0h8.5c3.866 0 7 3.134 7 7v10.5h-8.5c-3.866 0-7-3.134-7-7V0z"
                fill="#EA281E"
              />
            </svg>
          </BadgeIcon>

          {/* Vertical Badge Text */}
          <BadgeText>
            CRAFTI STUDIO
          </BadgeText>
        </a>
      </Link>
    </Container>
  );
};

export default React.memo(SiteOfTheDay);
