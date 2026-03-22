import axios from "axios";
import type { Note, NoteData, NotesResponse } from "../types/note";

const NOTE_KEY = import.meta.env.VITE_NOTE_TOKEN;

const notesInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});
export const getNotes = async (
  search: string,
  page: number,
  perPage: number,
): Promise<NotesResponse> => {
  const { data } = await notesInstance.get<NotesResponse>("/notes", {
    params: {
      page: page,
      perPage: perPage,
      search: search,
    },
    headers: {
      Authorization: `Bearer ${NOTE_KEY}`,
    },
  });
  return data;
};
export const createNote = async (noteData: NoteData) => {
  const { data } = await notesInstance.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${NOTE_KEY}`,
    },
  });
  return data;
};

export const deleteNote = async (id: Note["id"]) => {
  const { data } = await notesInstance.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${NOTE_KEY}`,
    },
  });
  return data;
};
