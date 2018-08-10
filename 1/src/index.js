import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({value,text}) => <tr><td>{text}</td><td>{value}</td></tr>

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
            <table>
            <tr><td>hyvä</td> <td>{state.hyvä}</td></tr>
            <tr><td>neutraali</td> <td>{state.neutraali}</td></tr>
            <tr><td>huono</td> <td>{state.huono}</td></tr>
            <Statistic value={average()} text="keskiarvo">keskiarvo</Statistic>
            <Statistic value={percentageOfPositive()} text="positiivisia">positiivisia</Statistic>
            </table>
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