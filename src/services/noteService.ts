import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!token) {
  throw new Error('VITE_NOTEHUB_TOKEN is not defined');
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
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

interface CreateNotePayload {
  title: string;
  content?: string;
  tag: Note['tag'];
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await axiosInstance.post('/', note);
  return data;
};

export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const { data }: AxiosResponse<{ message: string }> = await axiosInstance.delete(`/${id}`);
  return data;
};
