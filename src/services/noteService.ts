import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

// Base API URL
const API_URL = 'https://notehub-public.goit.study/api/notes';

// Проверяем, есть ли токен
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

// Создаем экземпляр axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Добавляем токен в заголовок только если он существует
axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error('VITE_NOTEHUB_TOKEN is not defined');
  }
  return config;
});

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

// Запрос на получение заметок
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, any> = { page, perPage };
  if (search) params.search = search;

  const { data }: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('/', { params });
  return data;
};

// Запрос на создание заметки
interface CreateNotePayload {
  title: string;
  content?: string;
  tag: Note['tag'];
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await axiosInstance.post('/', note);
  return data;
};

// Запрос на удаление заметки
export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const { data }: AxiosResponse<{ message: string }> = await axiosInstance.delete(`/${id}`);
  return data;
};
