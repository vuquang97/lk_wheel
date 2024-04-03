import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  apiCreateAccount,
  apiCreatePrizes,
  apiGetAccounts,
  apiGetPrizes,
} from "../../../apis";
import TablePrizes from "./TablePrizes";

const Prizes = () => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, getValues, reset, watch, setValue } = useForm(
    {
      defaultValues: {
        text: "",
        img: "",
        prizes: [],
      },
    }
  );

  const prizes = watch("prizes");

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    const res = await apiGetPrizes();
    if (res?.status === 200 && res?.data) {
      setValue("prizes", res.data);
    }
  };

  const handleAddAccount = (val) => {
    setLoading(true);
    apiCreatePrizes({
      text: val.text,
      img: val.img,
      number: 1,
      percentpage: 0.01,
      fixed: "",
    }).then(() => {
      reset();
      setLoading(false);
      fetchPrizes();
    });
  };
  return (
    <Box
      sx={{
        width: "1000px",
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
          label="tên"
          variant="outlined"
          {...register("text")}
        />
        <TextField
          id="outlined-basic"
          label="link ảnh"
          variant="outlined"
          {...register("img")}
        />
        <Button
          variant="contained"
          onClick={handleSubmit(handleAddAccount)}
          disabled={loading}
        >
          Send
        </Button>
      </Box>
      <TablePrizes
        rows={prizes}
        register={register}
        handleSubmit={handleSubmit}
        getValues={getValues}
        fetchPrizes={fetchPrizes}
      />
    </Box>
  );
};

export default Prizes;
