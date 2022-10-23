import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { RefObject } from "react";

type ModalType = {
  modal: RefObject<HTMLDialogElement>;
  deleteTask: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    number[],
    unknown
  >;
  id: number;
};

const Modal = ({ modal, deleteTask, id }: ModalType) => {
  return (
    <dialog
      ref={modal}
      className="bg-slate-700 rounded-lg backdrop:bg-gray-700/50"
    >
      <h2>Are you sure you want to delete this task?</h2>
      <button
        onClick={() => {
          deleteTask.mutate([id!]);
          modal.current?.close();
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          modal.current?.close();
        }}
      >
        No
      </button>
    </dialog>
  );
};

export default Modal;
