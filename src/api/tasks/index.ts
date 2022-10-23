import { useMutation } from "@tanstack/react-query";
import { invalidateQuery } from "../../components/ReactQueryProvider";
import { TaskType } from "../../containers/TaskList/Task";
import axiosClient from "../axios";

// Fetch all tasks

export const getTasks = (page = 1, itemsPerPage = 10) =>
  axiosClient.get("/api/Task", {
    params: { page, itemsPerPage },
  });
