import { Box, Button, TextField } from "@mui/material";
import TableAccounts from "./TableAccounts";
import { apiCreateAccount, apiGetAccounts } from "../../../apis";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const Accounts = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      account: "",
    },
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await apiGetAccounts();
    if (res?.status === 200 && res?.data) {
      setAccounts(res.data);
    }
  };

  const handleAddAccount = (val) => {
    setLoading(true);
    apiCreateAccount({
      account: val?.account,
      prize: "",
    }).then(() => {
      reset();
      setLoading(false);
      fetchAccounts();
    });
  };
  return (
    <Box
      sx={{
        width: "500px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <TextField
          id="outlined-basic"
          label="account"
          variant="outlined"
          {...register("account")}
        />
        <Button
          variant="contained"
          onClick={handleSubmit(handleAddAccount)}
          disabled={loading}
        >
          Send
        </Button>
      </Box>
      <TableAccounts rows={accounts} />
    </Box>
  );
};

export default Accounts;
