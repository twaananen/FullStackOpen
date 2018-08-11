import React from "react";

const Yhteensa = ({osat}) => {
    return (
      <div>
        <p>yhteensä {osat.reduce((summa,osa) =>  summa+osa.tehtavia,0)} tehtävää </p>
      </div>
    )
  }

  export default Yhteensa