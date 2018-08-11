import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameInputChange = (event) => {
    this.setState({newName: event.target.value})
  }
  handleNumberInputChange = (event) => {
    this.setState({newNumber: event.target.value})
  }
  handleFilterInputChange = (event) => {
    this.setState({filter: event.target.value})
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const persons = this.state.persons.concat(newPerson)
    //lisäyksen esto eli poisto kopiosta
    this.state.persons.forEach(person => person.name === newPerson.name ?
       persons.pop():0)
    this.setState({
      persons,
      newName: "",
      newNumber:""
    })

  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
        rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterInputChange}/>
        </div>
        <form onSubmit={this.addPerson}>
        <div>
          <h3>Lisää Uusi!</h3>
            nimi: <input value={this.state.newName} onChange={this.handleNameInputChange}/>
          </div><div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberInputChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table><tbody>
        {this.state.persons.map(person =>{
          if(this.state.filter.length==0 || person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
          return(
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        )})}
        </tbody></table>
      </div>
    )
  }
}

export default App