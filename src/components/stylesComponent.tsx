/////////////////////////////NavBar////////////////////////////////////
import CSS from "csstype";

const desactiveColor: string = "rgb(116, 128, 175)";
const activeColor: string = "rgb(91, 187, 130)";
///////////////////////////////////////////NAVBAR////////////////////////
const navBarLinkStyle: CSS.Properties = {
  padding: ".5rem 1rem",
  fontSize: "1.2rem",
  display: "block",
  color: "white",
  borderRadius: "10px"
};

export const navBarLinkDesactiveStyle: CSS.Properties = {
  ...navBarLinkStyle,
  backgroundColor: desactiveColor
};

export const navBarLinkActiveStyle: CSS.Properties = {
  ...navBarLinkStyle,
  backgroundColor: activeColor
};
export const navBarLinkItemStyle: CSS.Properties = {
  padding: ".5rem 1rem"
};

export const navBarBodyStyle: CSS.Properties = {
  borderColor: "gray",
  padding: "0.5rem"
};

////////////////////////////////////////////////////////
const navBar2LinkStyle: CSS.Properties = {
  padding: ".5rem 1rem",
  fontSize: "1.5rem",
  display: "block"
};

export const navBar2LinkDesactiveStyle: CSS.Properties = {
  ...navBar2LinkStyle,
  color: desactiveColor
};

export const navBar2LinkActiveStyle: CSS.Properties = {
  ...navBar2LinkStyle,
  color: activeColor
};

export const navBar2BodyStyle: CSS.Properties = {
  borderColor: "gray",
  padding: "0.5rem"
};
////////////////////////////FORM////////////////////////
export const formSubmitButtonStyle: CSS.Properties = {
  backgroundColor: desactiveColor,
  borderColor: desactiveColor
};

export const formBodyStyle: CSS.Properties = {
  border: "solid 0.01rem",
  padding: "1rem",
  width: "50%",
  borderColor: "gray"
};
export const formStudentBodyStyle: CSS.Properties = {
  ...formBodyStyle
};
export const formGroupBodyStyle: CSS.Properties = {
  ...formBodyStyle
};

////////////////////////////Filter////////////////////////
export const filterBodyStyle: CSS.Properties = {
  padding: "1rem"
};

export const filterButtonStyle: CSS.Properties = {
  backgroundColor: desactiveColor,
  borderColor: desactiveColor
};

export const applyFilterButtonContainerStyle: CSS.Properties = {
  textAlign: "left"
};
export const resetFilterButtonContainerStyle: CSS.Properties = {
  textAlign: "right"
};
/////////////////////////////LIST///////////////////////

export const listTableBodyStyle: CSS.Properties = {
  border: "solid 0.12rem gray"
};

export const listDeleteButtonStyle: CSS.Properties = {
  backgroundColor: desactiveColor,
  borderColor: desactiveColor
};
////////////////////////////Home////////////////////////

export const homeCardBodyStyle: CSS.Properties = {
  margin: "1.5rem 0",
  border: "solid 0.05rem gray"
};
