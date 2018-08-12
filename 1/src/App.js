import React from 'react';
import axios from "axios";


const PersonToTable = ({persons,filter}) => persons.map(person =>{
	if(filter.length===0 
		|| person.name.toLowerCase().startsWith(filter.toLowerCase()))
		return(
			<tr key={person.name}>
			<td>{person.name}</td>
			<td>{person.number}</td>
			</tr>
		)
	})
	
	const AddPersonForm = ({state, addPerson,handleNameInputChange,handleNumberInputChange}) => 
	<form onSubmit={addPerson}>
	<div>
	<h3>Lisää Uusi!</h3>
	nimi: <input value={state.newName} onChange={handleNameInputChange}/>
	</div><div>
	numero: <input value={state.newNumber} onChange={handleNumberInputChange}/>
	</div>
	<div>
	<button type="submit">lisää</button>
	</div>
	</form>
	
	class App extends React.Component {
		constructor(props) {
			super(props)
			console.log("constructor");
			this.state = {
				persons: [],
				newName: '',
				newNumber: '',
				filter: ''
			}
		}

		componentDidMount(){
			axios
			.get("http://localhost:3003/persons")
			.then((response) =>{
				console.log("response");
				this.setState({persons: response.data})
			})
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
					<AddPersonForm state={this.state}
					addPerson={this.addPerson}
					handleNameInputChange={this.handleNameInputChange}
					handleNumberInputChange={this.handleNumberInputChange}/>
					<h2>Numerot</h2>
					<table><tbody>
					<PersonToTable persons={this.state.persons} filter={this.state.filter}/>
					</tbody></table>
					</div>
				)
			}
		}
		
		export default App