import {
     FirstPageOutlined,
     KeyboardArrowLeftOutlined,
     KeyboardArrowRightOutlined,
     LastPageOutlined,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface TablePaginationActionsProps {
     count: number;
     page: number;
     rowsPerPage: number;
     onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export const TablePaginationActions = (props: TablePaginationActionsProps) => {
     const { count, page, rowsPerPage, onPageChange } = props;

     const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          onPageChange(event, 0);
     };

     const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          onPageChange(event, page - 1);
     };

     const handleNextbuttonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          onPageChange(event, page + 1);
     };

     const handleLastPagebuttonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
     };

     return (
          <Box sx={{ flexShrink: 0, ml: 2.5 }}>
               <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
                    <FirstPageOutlined />
               </IconButton>
               <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
                    <KeyboardArrowLeftOutlined />
               </IconButton>
               <IconButton
                    onClick={handleNextbuttonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
               >
                    <KeyboardArrowRightOutlined />
               </IconButton>
               <IconButton
                    onClick={handleLastPagebuttonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
               >
                    <LastPageOutlined />
               </IconButton>
               <IconButton></IconButton>
          </Box>
     );
};
