import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API;

export const fetchUser = async (token: string) => {
  console.log({token});
  try {
    const response = await axios.get(`${API_BASE}/api/fetch-user-data`, {
      headers : {
        Authorization : `Bearer ${token}` 
      }
    });
    return response.data
  } catch (error) {
    console.log({error});
  }
};
