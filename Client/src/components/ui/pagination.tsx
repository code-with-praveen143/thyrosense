const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
    const handlePrev = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    const handlePageClick = (page: number) => {
      if (page !== currentPage) {
        onPageChange(page);
      }
    };
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`px-3 py-1 mx-1 rounded-md ${
              i === currentPage ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      }
      return pageNumbers;
    };
  
    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={handlePrev}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

export default Pagination
  