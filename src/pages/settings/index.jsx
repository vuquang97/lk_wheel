import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Accounts from "./accounts";
import Prizes from "./prizes";
import { useNavigate } from "react-router-dom";

const TYPE = {
  ACCOUNT: 0,
  PRIZE: 1,
};

const Settings = () => {
  const [type, setType] = useState(TYPE.ACCOUNT);
  const navigate = useNavigate();

  const handleChangeType = (type) => {
    setType(type);
  };

  useEffect(() => {
    const acc = JSON.parse(localStorage.getItem("_account"));
    if (
      !acc ||
      !["quang.vuduy", "yen.lehai1", "hoa.thieuthikhanh1"].includes(
        acc?.account
      )
    ) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: "20px",
      }}
    >
      <Box>
        {type === TYPE.PRIZE ? (
          <Button variant="contained" onClick={() => handleChangeType(0)}>
            account
          </Button>
        ) : (
          <Button variant="contained" onClick={() => handleChangeType(1)}>
            prize
          </Button>
        )}
      </Box>
      <Box>{type === TYPE.ACCOUNT ? <Accounts /> : <Prizes />}</Box>
    </Box>
  );
};

export default Settings;
