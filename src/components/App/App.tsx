import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { getNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";

function App() {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const perPage = 12;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getNotes", searchValue, page],
    queryFn: () => getNotes(searchValue, page, perPage),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    if (!isLoading && !isError && notes.length === 0 && searchValue !== "") {
      toast.error("No notes found for your search!");
    }

    if (isError) {
      toast.error("Server error! Please try again.");
    }
  }, [notes.length, isLoading, isError, searchValue]);

  const onClose = () => {
    setIsOpen(false);
  };

  const searchNote = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, 500);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={searchNote} value={searchValue} />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}

          <button className={css.button} onClick={() => setIsOpen(true)}>
            Create note +
          </button>
        </header>
        {isLoading ? (
          <BarLoader color="#0029ff" />
        ) : notes.length === 0 ? (
          <p>Notes not found</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>
      {isOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClick={onClose} />
        </Modal>
      )}
    </>
  );
}

export default App;
