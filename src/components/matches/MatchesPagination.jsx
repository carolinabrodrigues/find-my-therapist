import React from 'react';

function MatchesPagination({ pageCount, handlePageChange, currentPage }) {
  // Function to calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  // Function to handle click on page number
  const handlePageClick = pageNumber => {
    handlePageChange(pageNumber);
  };
  // Render the pagination controls

  return (
    <div>
      <button onClick={() => handlePageClick(currentPage - 1)}>Previous</button>
      <button onClick={() => handlePageClick(currentPage + 1)}>Next</button>
    </div>
  );
}

export default MatchesPagination;
