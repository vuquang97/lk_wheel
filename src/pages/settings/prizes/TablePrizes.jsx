import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField } from "@mui/material";
import { apiDeletePrizes, apiUpdatePrizes } from "../../../apis";

export default function TablePrizes({
  rows = [],
  register,
  handleSubmit,
  getValues,
  fetchPrizes,
}) {
  const [loading, setLoading] = React.useState(false);

  const handleUpdate = (idx) => {
    const { id, ...body } = getValues(`prizes[${idx}]`);
    setLoading(true);
    apiUpdatePrizes(id, body).then(() => {
      setLoading(false);
      fetchPrizes();
    });
  };
  const handleDelete = (id) => {
    setLoading(true);
    apiDeletePrizes(id).then(() => {
      setLoading(false);
      fetchPrizes();
    });
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>stt</TableCell>
            <TableCell>prize</TableCell>
            <TableCell>img</TableCell>
            <TableCell>dàn xếp tỉ số</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, idx) => {
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    {...register(`prizes[${idx}].text`)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <img src={row?.img} width={50} height={50} alt="img" />
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      {...register(`prizes[${idx}].img`)}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    {...register(`prizes[${idx}].fixed`)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      onClick={() => handleUpdate(idx)}
                      disabled={loading}
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      sửa
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(row.id)}
                      disabled={loading}
                      color="error"
                    >
                      xóa
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
