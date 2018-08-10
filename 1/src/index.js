import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({value,text}) => <div>{text}{value}</div>

const Statistics = ({state}) => {

    const average = () => {
        return ((state.hyvä-state.huono)/(state.hyvä+state.huono+state.neutraali)).toFixed(2)
    }

    const percentageOfPositive = () => {
        return ((state.hyvä*100)/(state.hyvä+state.huono+state.neutraali)).toFixed(1) + "%"
    }

    if (state.hyvä+state.huono+state.neutraali != 0){
        return(
            <div>
            <p><strong>statistiikka</strong></p>
            hyvä {state.hyvä}<br></br>
            neutraali {state.neutraali}<br></br>
            huono {state.huono}<br></br>
            <Statistic value={average()} text="keskiarvo ">keskiarvo</Statistic>
            <Statistic value={percentageOfPositive()} text="positiivisia ">positiivisia</Statistic>
            </div>
        )}
    else{
        return(
            <div>
            <p><strong>statistiikka</strong></p>
            ei yhtään palautetta annettu
            </div>
        )}
}


class App extends React.Component{
    constructor (props) {
        super(props)
        this.state ={
            hyvä: 0,
            neutraali: 0,
            huono: 0
        }
    }

    click = (params) => {
        return () => {
            const newState = this.state
            newState[params] = this.state[params]+1
            this.setState({newState})}
    }

    render(){
        return (
            <div>
            <p><strong>anna palautetta</strong></p>
            <Button handleClick={this.click("hyvä")} text='hyvä'>hyvä</Button>
            <Button handleClick={this.click("neutraali")} text='neutraali'>neutraali</Button>
            <Button handleClick={this.click("huono")} text='huono'>huono</Button>
            <Statistics state={this.state}></Statistics>
            </div>
        )}
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)