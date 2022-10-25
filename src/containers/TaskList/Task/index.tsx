import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../../../api/axios";
import { invalidateQuery } from "../../../components/ReactQueryProvider";
import Modal from "./Modal";
import * as dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
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
  const [clicked, setClicked] = useState(false);
  const [newTask, setTask] = useState(task);
  const { selectionList, setSelectionList } =
    useContext<SelectionContextType>(SelectionContext);

  // useEffect(() => {
  //   ;
  // }, [selectionList.length]);

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
    <div className="mb-2 flex h-16 flex-grow items-center justify-between rounded-lg border p-2">
      <div className="flex flex-grow justify-start overflow-auto pr-4">
        <p className="my-auto mr-4 w-10 text-xs">{date}</p>
        {!edit ? (
          <p className={`overflow-auto pr-3 ${isCompleted && "line-through"}`}>
            {task}
          </p>
        ) : (
          <input
            className="mx-[2px] pr-3"
            name="task"
            value={newTask}
            onChange={(e: any) => setTask(e.target.value)}
          />
        )}
      </div>

      {!edit ? (
        <div className="flex flex-shrink-0">
          <button
            className="tooltip text-xs"
            onClick={() => {
              modal.current?.showModal();
            }}
          >
            <span className="tooltiptext">Delete</span>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <button
            className="tooltip text-xs"
            onClick={() => {
              markAsCompleted.mutate({ id, isCompleted, task, entryDate });
            }}
          >
            <span className="tooltiptext">Mark as done</span>
            <FontAwesomeIcon
              className={`${isCompleted && "text-green-600"} `}
              icon={faCheckDouble}
            />
          </button>
          <button
            className="tooltip text-xs"
            onClick={() => {
              duplicateTask.mutate(id!);
            }}
          >
            <span className="tooltiptext">Make a copy</span>
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <button onClick={() => setEdit(true)} className="tooltip text-xs">
            <span className="tooltiptext">Edit</span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          {!clicked ? (
            <button
              onClick={() => {
                setClicked((prev) => !prev);
                setSelectionList((prev: number[]) => {
                  const index = selectionList.findIndex((x) => {
                    return x === id;
                  });
                  if (index === -1) {
                    prev.push(id!);
                  }

                  return [...prev];
                });
              }}
            >
              <FontAwesomeIcon icon={faSquare} />
            </button>
          ) : (
            <button
              onClick={() => {
                setClicked((prev) => !prev);
                setSelectionList((prev: number[]) => {
                  const index = selectionList.findIndex((x) => {
                    return x === id;
                  });
                  if (index > -1) {
                    prev.splice(index, 1);
                  }
                  return [...prev];
                });
              }}
            >
              <FontAwesomeIcon
                name={`id!.toString()${clicked}`}
                icon={faSquareXmark}
              />
            </button>
          )}
        </div>
      ) : (
        <>
          <button onClick={() => setEdit(false)} className="tooltip text-xs">
            <span className="tooltiptext">Cancel</span>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button
            onClick={() => {
              setEdit(false);
              editTask.mutate({ id, task: newTask, entryDate, isCompleted });
            }}
            className="tooltip text-xs"
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
