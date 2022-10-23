import React from "react";

type PaginationType = {
  page: number;
  lastPage: number;
  nextPage: () => void;
  previousPage: () => void;
};

const Pagination = ({
  page,
  previousPage,
  nextPage,
  lastPage,
}: PaginationType) => {
  return (
    <div className="flex flex-col justify-evenly">
      <p className=" p-2 text-center">Page: {page}</p>
      <div className="flex justify-evenly">
        <button
          className={`rounded ${
            page !== 1 && "bg-lime-200 text-black"
          } p-2 w-24`}
          disabled={page === 1}
          onClick={() => previousPage()}
        >
          Previous
        </button>
        <button
          className={`rounded ${
            page !== lastPage && "bg-lime-200 text-black"
          } p-2 w-24`}
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
