import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import axiosClient from "../../api/axios";
import Pagination from "../../components/Pagination";
import { invalidateQuery } from "../../components/ReactQueryProvider";
import { SelectionContext } from "../../components/SelectionContext";
import Create from "./Create";
import Task, { TaskType } from "./Task";
import useTasklist from "./useTasklist";

const TaskList = () => {
  const { taskArray, nextPage, previousPage, pageMetadata, pageParams } =
    useTasklist();
  const { selectionList, setSelectionList } = useContext(SelectionContext);

  const deleteTask = useMutation(
    (id: number[]) => {
      return axiosClient.delete(`/api/Task`, { data: id });
    },
    { onSuccess: invalidateQuery }
  );

  return (
    <div className="w-100">
      <Create />
      {
        <button
          onClick={() => {
            console.log(selectionList);
            deleteTask.mutate(selectionList);
            setSelectionList([]);
          }}
        >
          Delete selected
        </button>
      }
      {taskArray?.data.map((task: TaskType, index: number) => (
        <Task
          key={index}
          id={task.id}
          task={task.task}
          isCompleted={task.isCompleted}
          entryDate={task.entryDate}
        />
      ))}
      {pageMetadata.TotalCount > pageParams.itemsPerPage && (
        <Pagination
          page={pageMetadata.CurrentPage}
          previousPage={previousPage}
          nextPage={nextPage}
          lastPage={pageMetadata.TotalPages}
        />
      )}
    </div>
  );
};

export default TaskList;
