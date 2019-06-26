import React from "react";

const PruebaParams = (props: any) => {
  if (props.pageContext.id === "Prueba") {
    props.navigate("/level1");
  }
  return <h1>Prueba Params</h1>;
};
export default PruebaParams;
