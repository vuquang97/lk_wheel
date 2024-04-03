import axios from "axios";

export const apiGetAccounts = () => {
  return axios.get("https://660d77176ddfa2943b347d0f.mockapi.io/accounts");
};

export const apiCreateAccount = (body) => {
  return axios.post(
    "https://660d77176ddfa2943b347d0f.mockapi.io/accounts",
    body
  );
};

export const apiUpdateAccount = (id, body) => {
  return axios.put(
    `https://660d77176ddfa2943b347d0f.mockapi.io/accounts/${id}`,
    body
  );
};

export const apiGetPrizes = () => {
  return axios.get("https://660d77176ddfa2943b347d0f.mockapi.io/prizes");
};

export const apiCreatePrizes = (body) => {
  return axios.post("https://660d77176ddfa2943b347d0f.mockapi.io/prizes", body);
};

export const apiUpdatePrizes = (id, body) => {
  return axios.put(
    `https://660d77176ddfa2943b347d0f.mockapi.io/prizes/${id}`,
    body
  );
};

export const apiDeletePrizes = (id) => {
  return axios.delete(
    `https://660d77176ddfa2943b347d0f.mockapi.io/prizes/${id}`
  );
};
