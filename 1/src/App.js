import React from 'react';
import phonebook from './services/phonebook';


const PersonToTable = ({persons,filter,removePerson}) => persons.map(person =>{
	if(filter.length===0 
		|| person.name.toLowerCase().startsWith(filter.toLowerCase()))
		return(
			<tr key={person.id}>
			<td>{person.name}</td>
			<td>{person.number}</td>
			<td><button onClick={removePerson(person.id)}>poista</button></td>
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
			this.state = {
				persons: [],
				newName: '',
				newNumber: '',
				filter: ''
			}
		}
		
		componentDidMount(){
			phonebook.getAll()
			.then((persons) =>{
				this.setState({persons})
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
			if(this.state.persons.find(person => person.name === newPerson.name)){
				if(!window.confirm(`${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`))
				return
				const id =this.state.persons.find(person => person.name === newPerson.name).id
				phonebook
				.update(id,newPerson)
				.then(updatedPerson => {
					this.setState({
						persons: this.state.persons.map(person => person.id === id ? updatedPerson : person),
						newName: "",
						newNumber:""
					})
				})
			}
			else {
				phonebook
				.create(newPerson)
				.then((addedPerson) => {
					this.setState({
						persons: this.state.persons.concat(addedPerson),
						newName: "",
						newNumber:""
					})
				})
			}
		}

		removePerson = (id) => (event) => {
			if(!window.confirm(`Poistetaanko ${this.state.persons.find(person => person.id === id).name} ?`))
			return
			phonebook
			.remove(id)
			.then(() => {
				this.setState({
					persons: this.state.persons.filter(person => person.id !== id)
				})
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
				<PersonToTable persons={this.state.persons} filter={this.state.filter} removePerson={this.removePerson}/>
				</tbody></table>
				</div>
			)
		}
	}
	
	export default App