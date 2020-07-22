import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import PostInsertBtn from "./PostInsertBtn";

const columns = [
  { id: "id", label: "No", minWidth: 50 },
  { id: "author", label: "작성자", minWidth: 170 },
  { id: "title", label: "제목", minWidth: 300 },
  {
    id: "views",
    label: "조회수",
    minWidth: 50,
    align: "right",
    format: (value) => value,
  },
  {
    id: "commentNum",
    label: "댓글수",
    minWidth: 50,
    align: "right",
    format: (value) => value,
  },
];

function createData(id, author, title, views, commmnetNum) {
  return { id, author, title, views, commmnetNum };
}

const rows = [
  createData("India", "게시글 내용11111", 3, 1),
  createData("China", "게시글 내용222222", 11, 4),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function PostTable({
  page,
  rowsPerPage,
  rows,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const classes = useStyles();
  const style = {
    // border: '1px solid black',
    // padding: '8px',
    //margin: '15px',
    //color: "white",
    textDecoration: "none", //<Link>의 밑줄제거
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const updateKey = row.id;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      console.log("컬럼:" + JSON.stringify(column));
                      console.log(`column.id:${column.id}`);
                      console.log(`row[column.id]:${row[column.id]}`);
                      const value = row[column.id];
                      const updateUrl = `posts/update/${updateKey}`;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "title" ? (
                            <Link style={style} to={updateUrl}>
                              {value}
                            </Link>
                          ) : (
                            value
                          )}
                          {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <PostInsertBtn />
    </Paper>
  );
}
