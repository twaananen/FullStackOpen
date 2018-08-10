import React from 'react'
import ReactDOM from 'react-dom'



class App extends React.Component{
  constructor (props) {
    super(props)
    this.state ={
      hyvä: 0,
      neutraali: 0,
      huono: 0
    }
  }
  
  render(){
    return <div>
      <p><strong>anna palautetta</strong></p>
      <button onClick={() => {this.setState({hyvä: this.state.hyvä+1})}}>hyvä</button>
      <button onClick={() => {this.setState({neutraali: this.state.neutraali+1})}}>neutraali</button>
      <button onClick={() => {this.setState({huono: this.state.huono+1})}}>huono</button>
      <p><strong>statistiikka</strong></p>
      hyvä {this.state.hyvä}<br></br>
      neutraali {this.state.neutraali}<br></br>
      huono {this.state.huono}<br></br>
      keskiarvo {((this.state.hyvä- this.state.huono)/(this.state.hyvä+this.state.huono+this.state.neutraali)).toPrecision(2)}<br></br>
      positiivisia {(this.state.hyvä/(this.state.hyvä+this.state.huono+this.state.neutraali)*100).toPrecision(3)}%<br></br>
      </div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)