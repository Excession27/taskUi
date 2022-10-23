import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTasks } from "../../api/tasks";

type ParamsType = {
  page: number;
  itemsPerPage: number;
};
type PageMetadataType = {
  CurrentPage: number;
  HasNext: boolean;
  HasPrevious: boolean;
  TotalCount: number;
  TotalPages: number;
};

const useTasklist = () => {
  const [pageParams, setPageParams] = useState<ParamsType>({
    page: 1,
    itemsPerPage: 10,
  });
  let pageMetadata: PageMetadataType = {} as PageMetadataType;

  const { data: taskArray } = useQuery(["task-list", pageParams], () => {
    const data = getTasks(pageParams.page, pageParams.itemsPerPage);
    return data;
  });

  const header = taskArray?.headers["x-pagination"];
  if (typeof header === typeof "") {
    pageMetadata = JSON.parse(header as string);
  }

  const nextPage = () => {
    setPageParams((prev) => {
      if (prev.page < pageMetadata.TotalPages) {
        prev.page = pageMetadata.CurrentPage + 1;
      }
      return { ...prev };
    });
  };

  const previousPage = () => {
    setPageParams((prev) => {
      if (prev.page !== 1) {
        prev.page = pageMetadata.CurrentPage - 1;
      }
      return { ...prev };
    });
  };
  return { previousPage, nextPage, taskArray, pageMetadata, pageParams };
};

export default useTasklist;
