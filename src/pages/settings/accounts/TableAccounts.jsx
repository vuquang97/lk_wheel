import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableAccounts({ rows = [] }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>stt</TableCell>
            <TableCell align="right">account</TableCell>
            <TableCell align="right">Prize</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell align="right">{row.account}</TableCell>
              <TableCell align="right">{row.prize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
