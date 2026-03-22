export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface NoteData {
  title: string;
  content: string;
  tag: string;
}
