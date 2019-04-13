import axios from "axios";

export const HTTP: any = axios.create({
  baseURL: `http://localhost:1234/`
});
