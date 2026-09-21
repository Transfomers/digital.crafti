import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePdf, Download, Printer, XClose, Eye } from '../Icons/ProjectIcons';
import useCursorStyle from '../../hooks/useCursorStyle';
import { useLanguage } from '../../context/language';

const TriggerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  border-radius: 9999px;
  border: 1.5px solid ${({ theme }) => theme.colors.red};
  background: ${({ theme }) => (theme.name === 'light' ? '#fff0f0' : 'rgba(234, 40, 30, 0.1)')};
  color: ${({ theme }) => theme.colors.red};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(234, 40, 30, 0.15);

  & svg {
    width: 18px;
    height: 18px;
    stroke: ${({ theme }) => theme.colors.red};
    transition: transform 0.2s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.red};
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(234, 40, 30, 0.3);

    & svg {
      stroke: #ffffff;
      transform: scale(1.1);
    }
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 10px 20px;
    font-size: 0.875rem;
    gap: 8px;
  `};
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  ${({ theme }) => theme.breakpoints.small`
    padding: 12px;
  `};
`;

const ModalContainer = styled(motion.div)`
  width: 100%;
  max-width: 1080px;
  height: 90vh;
  background: ${({ theme }) => (theme.name === 'light' ? '#ffffff' : '#111111')};
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e0e0e0' : '#262626')};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => (theme.name === 'light' ? '#e5e5e5' : '#222222')};
  background: ${({ theme }) => (theme.name === 'light' ? '#f8f8f8' : '#161616')};
  gap: 16px;

  & .title-group {
    display: flex;
    align-items: center;
    gap: 12px;

    & h4 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: ${({ theme }) => theme.text};
    }
  }

  & .actions-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  ${({ theme }) => theme.breakpoints.small`
    padding: 12px 16px;
    flex-wrap: wrap;
    & .title-group h4 { font-size: 0.95rem; }
  `};
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#d5d5d5' : '#333333')};
  background: ${({ theme }) => (theme.name === 'light' ? '#ffffff' : '#202020')};
  color: ${({ theme }) => theme.text};
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;

  & svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.red};
  }

  ${({ theme }) => theme.breakpoints.small`
    padding: 6px 12px;
    font-size: 0.75rem;
  `};
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => (theme.name === 'light' ? '#d5d5d5' : '#333333')};
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s ease;

  & svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.red};
    border-color: ${({ theme }) => theme.colors.red};
    color: #ffffff;
  }
`;

const IframeWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  background: #2b2b2b;

  & iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MobileFallback = styled.div`
  display: none;
  padding: 24px;
  text-align: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  & p {
    margin-bottom: 16px;
    font-size: 0.95rem;
  }

  ${({ theme }) => theme.breakpoints.small`
    display: block;
  `};
`;

const PdfViewerModal = ({
  pdfUrl = '/docs/presentation-crafti.pdf',
  title = 'Dossier Technique & Méthodologie',
  buttonText,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { lang } = useLanguage();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  const handlePrint = () => {
    window.open(pdfUrl, '_blank')?.print();
  };

  const defaultButtonLabel = buttonText || (lang === 'fr' ? 'Consulter le PDF' : 'View PDF Document');

  return (
    <>
      <TriggerButton
        type="button"
        onClick={() => setIsOpen(true)}
        onMouseEnter={addCursorBorder}
        onMouseLeave={removeCursorBorder}
      >
        <FilePdf />
        <span>{defaultButtonLabel}</span>
      </TriggerButton>

      <AnimatePresence>
        {isOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <ModalContainer
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <ModalHeader>
                <div className="title-group">
                  <FilePdf color="#EA281E" />
                  <h4>{title}</h4>
                </div>

                <div className="actions-group">
                  <ActionButton
                    href={pdfUrl}
                    download="presentation-crafti-emuc.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download />
                    <span>{lang === 'fr' ? 'Télécharger' : 'Download'}</span>
                  </ActionButton>

                  <ActionButton
                    as="button"
                    type="button"
                    onClick={handlePrint}
                  >
                    <Printer />
                    <span>{lang === 'fr' ? 'Imprimer' : 'Print'}</span>
                  </ActionButton>

                  <CloseButton
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Fermer"
                  >
                    <XClose />
                  </CloseButton>
                </div>
              </ModalHeader>

              <MobileFallback>
                <p>
                  {lang === 'fr'
                    ? 'Sur mobile, vous pouvez ouvrir directement le document PDF complet :'
                    : 'On mobile devices, open the full PDF document directly:'}
                </p>
                <ActionButton
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', padding: '10px 20px', background: '#EA281E', color: '#fff', borderColor: '#EA281E' }}
                >
                  <Eye stroke="#fff" />
                  <span>{lang === 'fr' ? 'Ouvrir en plein écran' : 'Open Fullscreen PDF'}</span>
                </ActionButton>
              </MobileFallback>

              <IframeWrapper>
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=0`}
                  title={title}
                />
              </IframeWrapper>
            </ModalContainer>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(PdfViewerModal);
