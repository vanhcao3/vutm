import { Pagination } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface PaginationProps {
     className?: string;
     currentPage?: number;
     pageSize?: number;
     totalItems: number;
     onPageChange?: (data: number) => void;
}

export function CustomPagination(props: PaginationProps) {
     const pageSize = props.pageSize || 10;
     const totalItems = props.totalItems || 0;
     const totalPage = Math.ceil(totalItems / pageSize);
     const [_currentPage, setCurrentPage] = useState(props.currentPage || 1);
     const handlePageChange = useCallback(
          (page: number) => {
               setCurrentPage(page);
               props.onPageChange && props.onPageChange(page);
          },
          [props.onPageChange]
     );

     useEffect(() => {
          // if (props.currentPage || (props.currentPage === _currentPage)) return;
          setCurrentPage(props.currentPage);
     }, [props.currentPage, _currentPage]);

     return (
          <div className="flex justify-center items-center mt-2">
               <Pagination
                    color="primary"
                    defaultPage={1}
                    page={_currentPage}
                    count={totalPage}
                    onChange={(event, page) => handlePageChange(page)}
               />
          </div>
     );
}
