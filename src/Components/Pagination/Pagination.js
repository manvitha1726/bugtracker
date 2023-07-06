import React from "react";
import "./Pagination.css";

const Pagination = ({
    currentPage,
    noOfpages,
    setCurrentPage
}) => {
    let pages = [];

    for (let i = 1; i <= noOfpages; i++) {
        pages.push(i);
    }

    return (
    <div className="pagination-container">
        <div className='pagination'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() =>setCurrentPage(page)}// add functionality dispatch
                        className={page == currentPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    </div>
    );
};

export default Pagination;