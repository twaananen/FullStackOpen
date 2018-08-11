import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";

const kurssi = {
  nimi: 'Half Stack -sovelluskehitys',
  osat: [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    },
    {
      nimi: 'Redux',
      tehtavia: 7
    }
  ]
}

ReactDOM.render(
  <App kurssi = {kurssi}/>,
  document.getElementById('root')
)