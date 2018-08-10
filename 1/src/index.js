import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) =>(
    <button onClick={handleClick}>
    {text}
    </button>
)

const Statistics = ({state}) => {

  const average = (state) => {
    return ((state.hyvä-state.huono)/(state.hyvä+state.huono+state.neutraali)).toFixed(2)
  }

  const percentageOfPositive = (state) => {
    return ((state.hyvä*100)/(state.hyvä+state.huono+state.neutraali)).toFixed(1) + "%"
  }

  return(
    <div>
      <p><strong>statistiikka</strong></p>
      hyvä {state.hyvä}<br></br>
      neutraali {state.neutraali}<br></br>
      huono {state.huono}<br></br>
      <Statistic value={average(state)} text="keskiarvo ">keskiarvo</Statistic>
      <Statistic value={percentageOfPositive(state)} text="positiivisia ">positiivisia</Statistic>
    </div>
  )
}

const Statistic = ({value,text}) => (
  <div>
    {text}{value}
  </div>
)

class App extends React.Component{
  constructor (props) {
    super(props)
    this.state ={
      hyvä: 0,
      neutraali: 0,
      huono: 0
    }
  }

  hyväClick = () => {
    this.setState({hyvä: this.state.hyvä+1})
  }

  huonoClick = () => {
    this.setState({huono: this.state.huono+1})
  }

  neutraaliClick = () => {
    this.setState({neutraali: this.state.neutraali+1})
  }

  render(){
    return <div>
      <p><strong>anna palautetta</strong></p>
      <Button handleClick={this.hyväClick} text='hyvä'>hyvä</Button>
      <Button handleClick={this.neutraaliClick} text='neutraali'>neutraali</Button>
      <Button handleClick={this.huonoClick} text='huono'>huono</Button>
      <Statistics state={this.state}></Statistics>
      </div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)