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
        <div className="w-100 mb-6 flex flex-col">
          <input
            className="mx-[2px] mb-2 h-10 rounded border pl-4 text-center"
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
        <button className="w-100 mb-6" onClick={() => setShow(true)}>
          Create a task
        </button>
      )}
    </>
  );
};

export default Create;
