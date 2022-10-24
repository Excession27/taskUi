import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import axiosClient from "../../../api/axios";
import { invalidateQuery } from "../../../components/ReactQueryProvider";
import { SelectionContext } from "../../../components/SelectionContext";

const DeleteMultiple = () => {
  const { selectionList, setSelectionList, display } =
    useContext(SelectionContext);

  const deleteTask = useMutation(
    (id: number[]) => {
      return axiosClient.delete(`/api/Task`, { data: id });
    },
    { onSuccess: invalidateQuery }
  );

  return (
    <>
      {display && (
        <button
          onClick={() => {
            deleteTask.mutate(selectionList);
            setSelectionList([]);
          }}
        >
          Delete selected
        </button>
      )}
    </>
  );
};

export default DeleteMultiple;
