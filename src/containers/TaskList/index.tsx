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
          key={task.id}
          id={task.id}
          task={task.task}
          isCompleted={task.isCompleted}
          entryDate={task.entryDate}
        />
      ))}
      {
        <Pagination
          page={pageMetadata.CurrentPage}
          previousPage={previousPage}
          nextPage={nextPage}
          lastPage={pageMetadata.TotalPages}
          display={pageMetadata.TotalCount > pageParams.itemsPerPage}
        />
      }
    </div>
  );
};

export default TaskList;
