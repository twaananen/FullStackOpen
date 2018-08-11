import React from "react";
import Osa from "./Osa";

const Sisalto = ({osat}) => {
    return (
      <div>
          {osat.map(osa => <Osa nimi={osa.nimi} tehtavia={osa.tehtavia} /> )}
      </div>
    )
  }

  export default Sisalto