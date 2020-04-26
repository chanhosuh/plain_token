import React from "react";
import "./Section.sass";

const Section = (props) => {
  let className = "section ";
  className += props.className;
  return <div className={className}>{props.children}</div>;
};

export default Section;
