import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiGetAccounts } from "../../apis";
import { redirect, useNavigate } from "react-router-dom";
import { showMess } from "../lucky-wheel/utils";
import "./style.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
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

  const handleLogin = (val) => {
    const acc = accounts.find((item) => item.account === val.account);
    if (acc) {
      navigate("/wheel");
      localStorage.setItem("_account", JSON.stringify(acc));
    } else {
      showMess("Không tồn tại account này", "error");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="bg"
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
          onClick={handleSubmit(handleLogin)}
          disabled={loading}
        >
          Quay
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
