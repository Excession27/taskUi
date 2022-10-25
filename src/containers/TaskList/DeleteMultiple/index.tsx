import { useMutation } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import axiosClient from "../../../api/axios";
import { invalidateQuery } from "../../../components/ReactQueryProvider";
import { SelectionContext } from "../../../components/SelectionContext";
import Modal from "../Task/Modal";

const DeleteMultiple = () => {
  const modal = useRef<HTMLDialogElement>(null);
  const { selectionList, setSelectionList, display } =
    useContext(SelectionContext);

  const deleteTask = useMutation(
    (id: number[]) => {
      setSelectionList([]);
      return axiosClient.delete(`/api/Task`, { data: id });
    },
    { onSuccess: invalidateQuery }
  );

  return (
    <>
      {display && (
        <button
          onClick={() => {
            modal.current?.showModal();
          }}
        >
          Delete selected
        </button>
      )}
      <Modal modal={modal} id={selectionList} deleteTask={deleteTask} />
    </>
  );
};

export default DeleteMultiple;
