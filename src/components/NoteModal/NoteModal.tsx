import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';

interface NoteModalProps {
  onClose: () => void;
}

const NoteModal = ({ onClose }: NoteModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
      <div className={css.modal}>
        <NoteForm onSuccess={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;