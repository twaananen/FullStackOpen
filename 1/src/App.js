import React from 'react';
import axios from "axios";


const ShowFilteredCountries = ({countries,filter,setFilter}) => {
	if (countries.length ===0)
	return null
	
	const filteredCountries = countries.filter((country) =>
	filter.length===0 || country.name.toLowerCase().startsWith(filter.toLowerCase()))
	console.log('countries after filter',filteredCountries.length);
	
	if (filteredCountries.length > 10)
	return (
		<div>
		too many matches, specify a longer filter
		</div>
	)
	else if(filteredCountries.length > 1){
		return (
			<div>
			{filteredCountries.map(country => {
				return(<div key={country.numericCode} onClick={setFilter(country.name)}>
					{country.name}
					</div>
				)
			})
		}
		</div>
	)}
	else if(filteredCountries.length === 1){
		return (
			<div>
			<h1>{filteredCountries[0].name}</h1>
			<p>capital: {filteredCountries[0].capital}</p>
			<p>population: {filteredCountries[0].population}</p>
			<img src={filteredCountries[0].flag} alt="flag" height="200" width="300"/>
			</div>
		)
	}
	else
	return (
		<div>
		No countries with this filter
		</div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props)
		console.log("constructor");
		this.state = {
			countries: [],
			filter: ''
		}
	}
	
	componentDidMount(){
		axios
		.get("https://restcountries.eu/rest/v2/all")
		.then((response) =>{
			console.log("response");
			this.setState({countries: response.data})
		})
	}
	handleFilterInputChange = (event) => {
		this.setState({filter: event.target.value})
	}

	setFilter = (newFilter) =>() => this.setState({filter: newFilter})

	render() {
		return (
			<div>
			<h2>Country information</h2>
			<div>
			find countries <input value={this.state.filter} onChange={this.handleFilterInputChange}/>
			</div>
			<ShowFilteredCountries countries={this.state.countries} filter={this.state.filter} setFilter={this.setFilter}/>
			</div>
		)
	}
}

export default App