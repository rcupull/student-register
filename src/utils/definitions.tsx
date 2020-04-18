import { AxiosRequestConfig } from "axios";

////////////////////////////////API/////////////////////////////
const hostName = "http://localhost";
const port = ":3001";
const pathStudents = "/students";
const pathProfessors = "/professors";
const pathGroups = "/groups";
const pathCities = "/cities";

export const studentsURL = hostName + port + pathStudents;
export const groupURL = hostName + port + pathGroups;
export const professorURL = hostName + port + pathProfessors;
export const citiesURL = hostName + port + pathCities;

export const getStudentsRequestConfig: AxiosRequestConfig = {
  method: "GET",
  url: studentsURL
};
export const getGroupRequestConfig: AxiosRequestConfig = {
  method: "GET",
  url: groupURL
};
export const getCitiesRequestConfig: AxiosRequestConfig = {
  method: "GET",
  url: citiesURL
};
export const getProfessorsRequestConfig: AxiosRequestConfig = {
  method: "GET",
  url: professorURL
};

export const postStudentRequestConfig: AxiosRequestConfig = {
  method: "POST",
  url: studentsURL
};

export const deleteStudentRequestConfig: AxiosRequestConfig = {
  method: "DELETE",
  url: studentsURL
};

export const deleteGroupRequestConfig: AxiosRequestConfig = {
  method: "DELETE",
  url: groupURL
};

export const postGroupRequestConfig: AxiosRequestConfig = {
  method: "POST",
  url: groupURL
};

//////////////////////////////////////ROUTES//////////////////////////
export const homeRoute = "/";

export const registerListRoute = "/register";
export const studentListRoute = "/student-list";
export const groupListRoute = "/group-list";

export const insertFormRoute = "/insert";
export const studentFormRoute = "/student-form";
export const groupFormRoute = "/group-form";
