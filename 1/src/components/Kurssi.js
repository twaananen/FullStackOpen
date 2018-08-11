import React from "react";


const Otsikko = ({nimi}) => {
    return (
      <div>
        <h1>{nimi} </h1>
      </div>
    )
  }

  const Sisalto = ({osat}) => {
    return (
      <div>
          {osat.map(osa => <Osa nimi={osa.nimi} tehtavia={osa.tehtavia} /> )}
      </div>
    )
  }

  const Yhteensa = ({osat}) => {
    return (
      <div>
        <p>yhteensä {osat.reduce((summa,osa) =>  summa+osa.tehtavia,0)} tehtävää </p>
      </div>
    )
  }

  const Osa = ({nimi,tehtavia}) => {
    return (
      <div>
        <p>{nimi} {tehtavia}</p>
      </div>
    )
  }

const Kurssi = ({kurssi}) => {
    return(
        <div>
        <Otsikko nimi={kurssi.nimi} />
        <Sisalto osat ={kurssi.osat} />
        <Yhteensa osat ={kurssi.osat}/>
        </div>
    )
}

export default Kurssi