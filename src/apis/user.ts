import axios from "axios";

const BE_URL = "http://localhost:8080";

export const getUser = async (page?: number, limit?: number) => {
  try {
    const results = await axios.get(
      `${BE_URL}/users?_page=${page}&_per_page=${limit}`
    );
    return {
      data: results.data,
      total: Number(results.data.length),
    };
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (params: any) => {
  try {
    const results = await axios.post(`${BE_URL}/users`, params);
    console.log(results);

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id: string | number, params: any) => {
  try {
    const results = await axios.put(`${BE_URL}/users/${id}`, params);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: string | number) => {
  try {
    const results = await axios.delete(`${BE_URL}/users/${id}`);
    return results;
  } catch (error) {
    console.error(error);
  }
};
