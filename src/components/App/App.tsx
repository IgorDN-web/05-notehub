import { useState } from 'react';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBar';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination />
        <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button>
      </header>

      <NoteList />
      {showModal && <NoteModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
