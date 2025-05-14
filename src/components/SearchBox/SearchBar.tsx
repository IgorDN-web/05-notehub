import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import css from './SearchBox.module.css';

const SearchBox = () => {
  const [input, setInput] = useState('');
  const [debouncedValue] = useDebounce(input, 500);

  // Логика передачи debouncedValue в fetchNotes будет в App

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchBox;