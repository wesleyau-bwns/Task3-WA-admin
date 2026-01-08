import protectedApi from "../protectedApi";

export const getUsers = (params) => {
  return protectedApi.get("/api/users", { params });
};

export const getUser = (id) => {
  return protectedApi.get(`/api/users/${id}`);
};

export const createUser = (data) => {
  return protectedApi.post("/api/user/register", data);
};

export const updateUser = (id, data) => {
  return protectedApi.put(`/api/users/${id}`, data);
};

export const deleteUser = (id) => {
  return protectedApi.delete(`/api/users/${id}`);
};
