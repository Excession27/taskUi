import React from "react";

type PaginationType = {
  page: number;
  lastPage: number;
  nextPage: () => void;
  previousPage: () => void;
  display: boolean;
};

const Pagination = ({
  page,
  previousPage,
  nextPage,
  lastPage,
  display,
}: PaginationType) => {
  // TODO: Fix Cannot update a component (`TaskList`) while rendering a different component (`Pagination`)
  if (page > lastPage) {
    previousPage();
  }
  return (
    <div className={`${display ? "flex" : "hidden"} flex-col justify-evenly `}>
      <p className=" p-2 text-center">Page: {page}</p>
      <div className="flex justify-evenly">
        <button
          className={`rounded ${
            page !== 1 && "bg-lime-200 text-black"
          } w-24 p-2`}
          disabled={page === 1}
          onClick={() => previousPage()}
        >
          Previous
        </button>
        <button
          className={`rounded ${
            page !== lastPage && "bg-lime-200 text-black"
          } w-24 p-2`}
          disabled={page === lastPage}
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
