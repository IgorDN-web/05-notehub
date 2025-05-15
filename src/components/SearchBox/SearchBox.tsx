import React, { useEffect, useState } from 'react';
import css from './SearchBox.module.css';
import { useDebounce } from 'use-debounce';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
      aria-label="Search notes"
    />
  );
};

export default SearchBox;
