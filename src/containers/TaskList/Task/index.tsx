import { useMutation } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import axiosClient from "../../../api/axios";
import { invalidateQuery } from "../../../components/ReactQueryProvider";
import Modal from "./Modal";
import * as dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Task.css";
import {
  SelectionContext,
  SelectionContextType,
} from "../../../components/SelectionContext";

export type TaskType = {
  id?: number;
  task: string;
  isCompleted: boolean;
  entryDate?: string;
};

const Task = ({ id, task, isCompleted, entryDate }: TaskType) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [edit, setEdit] = useState(false);
  const [newTask, setTask] = useState(task);
  const { selectionList, setSelectionList } =
    useContext<SelectionContextType>(SelectionContext);

  const deleteTask = useMutation(
    (id: number[]) => {
      return axiosClient.delete(`/api/Task`, { data: id });
    },
    { onSuccess: invalidateQuery }
  );

  const duplicateTask = useMutation(
    (id: number) => {
      return axiosClient.post(`/api/Task/Duplicate/${id}`);
    },
    { onSuccess: invalidateQuery }
  );

  const markAsCompleted = useMutation(
    (task: TaskType) => {
      task.isCompleted = !isCompleted;
      return axiosClient.put(`/api/Task`, { ...task });
    },
    { onSuccess: invalidateQuery }
  );

  const editTask = useMutation(
    (task: TaskType) => {
      return axiosClient.put(`/api/Task`, { ...task });
    },
    { onSuccess: invalidateQuery }
  );

  const date = dayjs(entryDate).format("DD/MM/YY HH:mm:ss");

  return (
    <div className="flex p-2 border rounded-lg mb-2 justify-between items-center h-16 flex-grow">
      <div className="flex flex-grow justify-start pr-4 overflow-auto">
        <p className="text-xs w-10 my-auto mr-4">{date}</p>
        {!edit ? (
          <p className={`pr-3 overflow-auto ${isCompleted && "line-through"}`}>
            {task}
          </p>
        ) : (
          <input
            className="pr-3 mx-[2px]"
            name="task"
            value={newTask}
            onChange={(e: any) => setTask(e.target.value)}
          />
        )}
      </div>

      {!edit ? (
        <div className="flex flex-shrink-0">
          <button
            className="text-xs tooltip"
            onClick={() => {
              modal.current?.showModal();
            }}
          >
            <span className="tooltiptext">Delete</span>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <button
            className="text-xs tooltip"
            onClick={() => {
              markAsCompleted.mutate({ id, isCompleted, task, entryDate });
            }}
          >
            <span className="tooltiptext">Mark as done</span>
            <FontAwesomeIcon
              className={`${isCompleted && "text-green-600"} `}
              icon={faCheckCircle}
            />
          </button>
          <button
            className="text-xs tooltip"
            onClick={() => {
              duplicateTask.mutate(id!);
            }}
          >
            <span className="tooltiptext">Make a copy</span>
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <button onClick={() => setEdit(true)} className="text-xs tooltip">
            <span className="tooltiptext">Edit</span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <input
            type="checkbox"
            onClick={(e: any) => {
              setSelectionList((prev: number[]) => {
                const index = selectionList.findIndex(
                  (x) => x === e.target.value
                );
                if (index === -1) {
                  prev.push(e.target.value);
                }
                if (index > -1) {
                  prev.splice(index, 1);
                }
                return prev;
              });
            }}
            readOnly
            value={id}
          ></input>
        </div>
      ) : (
        <>
          <button onClick={() => setEdit(false)} className="text-xs tooltip">
            <span className="tooltiptext">Cancel</span>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button
            onClick={() => {
              setEdit(false);
              editTask.mutate({ id, task: newTask, entryDate, isCompleted });
            }}
            className="text-xs tooltip"
          >
            <span className="tooltiptext">Save</span>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </>
      )}

      <Modal modal={modal} deleteTask={deleteTask} id={id!} />
    </div>
  );
};

export default Task;
