import axios from "axios";

const API = axios.create({
  baseURL: "https://plataformarpgix.herokuapp.com/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signup = (formData) => API.post("/user/signup", formData);
export const signin = (formData) => API.post("/user/signin", formData);

export const createGroup = (newGroup) => API.post("/group/create", newGroup);
export const getGroups = () => API.get(`/group/get`);
export const enterGroup = (code) => API.post(`/group/enter/`, code);
export const getGroup = (id) => API.post(`/group/getgroup/${id}`);
export const deleteGroup = (id) => API.patch(`/group/deletegroup/${id}`);
export const deleteChar = (id, charId) =>
  API.patch(`/group/deletechar/${id}`, charId);
export const banUser = (id, charId) =>
  API.patch(`/group/banuser/${id}`, charId);

export const createChar = (charData, id) =>
  API.post(`/character/create/${id}`, charData);
export const masterEditCharacter = (editData, id) =>
  API.patch(`/character/masterupdate/${id}`, editData);
export const userEditCharacter = (editData) =>
  API.patch("/character/userupdate", editData);
export const createPage = (newPage) =>
  API.patch("/character/createpage", newPage);
export const deletePage = (pageInfo) =>
  API.patch("/character/deletepage", pageInfo);

export const createChapter = (chapterData, id) =>
  API.patch(`/group/createchapter/${id}`, chapterData);
export const deleteChapter = (chapterInfo, id) =>
  API.patch(`/group/deletechapter/${id}`, chapterInfo);
