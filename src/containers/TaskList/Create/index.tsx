import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosClient from "../../../api/axios";
import { invalidateQuery } from "../../../components/ReactQueryProvider";

const Create = () => {
  const [task, setTask] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const createTask = useMutation(
    (task: string) => {
      const newTask = { isCompleted: false, task };
      return axiosClient.post("/api/Task", newTask);
    },
    { onSuccess: invalidateQuery }
  );
  return (
    <>
      {show ? (
        <div className="mb-6 w-100 flex flex-col">
          <input
            className="h-10 pl-4 mb-2 mx-[2px] border text-center rounded"
            name="task"
            value={task}
            onChange={(e: any) => setTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <div>
            <button className="h-10 w-1/2" onClick={() => setShow(false)}>
              Cancel
            </button>
            <button
              className="h-10 w-1/2"
              onClick={() => {
                createTask.mutate(task);
                setTask("");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <button className="mb-6 w-100" onClick={() => setShow(true)}>
          Create a task
        </button>
      )}
    </>
  );
};

export default Create;
