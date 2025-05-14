import axios from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (page = 1, search = '') => {
  const { data } = await instance.get('/notes', {
    params: { page, perPage: 12, search },
  });
  return data;
};

export const createNote = async (noteData: Omit<Note, 'id'>) => {
  const { data } = await instance.post('/notes', noteData);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await instance.delete(`/notes/${id}`);
  return data;
};