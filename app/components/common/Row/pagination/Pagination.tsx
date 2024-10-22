import React from 'react';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number | any[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {

  const totalItemsCount = Array.isArray(totalItems) ? totalItems.length : totalItems;
  const totalPages = Math.ceil(totalItemsCount / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const renderPageDots = () => {
    const dots = [];
    const maxVisibleDots = 5;
    let startDot = Math.max(0, Math.min(currentPage - Math.floor(maxVisibleDots / 2), totalPages - maxVisibleDots));
    let endDot = Math.min(startDot + maxVisibleDots, totalPages);

    for (let i = startDot; i < endDot; i++) {
      const isActive = i === currentPage;
      dots.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 flex items-center justify-center size-3 rounded-full focus:outline-none ${isActive
              ? 'bg-green-500'
              : 'bg-gray-200 hover:bg-gray-300'
            }`}
          aria-label={`Page ${i + 1}`}
          aria-current={isActive ? 'page' : undefined}
        />
      );
    }

    return dots;
  };

  return (
    <div className="pagination flex justify-center items-center space-x-2">
      <button
        onClick={() => handlePageChange(0)}
        disabled={currentPage === 0}
        className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none disabled:opacity-50"
        aria-label="First page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none disabled:opacity-50"
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      {/* {renderPageDots()} */}
      <span className="mx-2 text-sm font-medium text-gray-700">
        {currentPage + 1} / {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none disabled:opacity-50"
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none disabled:opacity-50"
        aria-label="Last page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;