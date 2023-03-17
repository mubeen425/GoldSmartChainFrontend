import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Card, Table } from "react-bootstrap";

const TabelComponent = ({ cols, data, tabeltitle, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setCurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset2 = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset2);
  };
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>{tabeltitle}</Card.Title>
        </Card.Header>
        <Card.Body>
          <div id="job_data" className="dataTables_wrapper">
            <Table responsive>
              <thead>
                <tr>
                  {cols.map((headerItem, index) => (
                    <th key={index}>{headerItem.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, index) => (
                  <tr key={index}>
                    {cols.map((col, key) => (
                      <td key={key}>{col?.render(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
              <div className="dataTables_info">
                {data?.length > 0 && (
                  <span>
                    Showing {itemOffset + 1} to
                    <span className="mx-1">
                      {data?.length < itemsPerPage
                        ? currentItems?.length
                        : endOffset > data?.length
                        ? data?.length
                        : endOffset}
                    </span>
                    of {data?.length} entries
                  </span>
                )}
              </div>
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default TabelComponent;
