import React, { useState } from 'react';
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
function Paginator({ totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active' : ''}
          style={{backgroundColor:"white", marginLeft:"4px",marginRight:"4px", padding:"4px",paddingLeft:"8px",paddingRight:"8px",borderRadius:"50%"}}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="paginator">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="contained"
      >
        <KeyboardArrowLeftIcon/>
      </Button>
      <span >{renderPageNumbers()}</span>
      
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="contained"
      >
        <ChevronRightIcon/>
      </Button>
    </div>
  );
}

export default Paginator;
