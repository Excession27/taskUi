import Pagination from "../../components/Pagination";

import Create from "./Create";
import DeleteMultiple from "./DeleteMultiple";
import Task, { TaskType } from "./Task";
import useTasklist from "./useTasklist";

const TaskList = () => {
  const { taskArray, nextPage, previousPage, pageMetadata, pageParams } =
    useTasklist();

  return (
    <div className="w-100">
      <Create />
      <DeleteMultiple />
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
