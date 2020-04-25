import { Item } from "../reducers/dataTypes";
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

export const GetURL = (item: Item): string => {
  switch (item) {
    case "students":
      return studentsURL;
    case "professors":
      return professorURL;
    case "groups":
      return groupURL;
    case "cities":
      return citiesURL;
    default:
      return "";
  }
};

//////////////////////////////////////ROUTES//////////////////////////
export const homeRoute = "/";

export const registerListRoute = "/register";
export const studentListRoute = "/student-list";
export const groupListRoute = "/group-list";

export const insertFormRoute = "/insert";
export const studentFormRoute = "/student-form";
export const groupFormRoute = "/group-form";
