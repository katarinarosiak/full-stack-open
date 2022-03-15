
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Number = ({ person }) => {
	return (
		<li>
			<p>{person.name} {person.number}</p>
		</li>
	)
}

const PersonForm = ({ props }) => {
	const { addPerson, newName, addNewPerson, newNumber, addNewNumber } = props;
	
	console.log({ addPerson, newName, addNewPerson, newNumber, addNewNumber }); 
	return (
		<form onSubmit={addPerson}>
		<div>
			name: <input 
			value={newName}
			onChange={addNewPerson}/>
		</div>
		<div>
			phone number: <input 
				value={newNumber}
				onChange={addNewNumber}
			/>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
	)
}

const Filter = ({ searchPerson }) => {
	return (
		<div>
			filter shown with <input 
			// value={pattern} //???
			onChange={searchPerson}
		/>
		</div>
	)
}

const Persons = ({ searchedPeople }) => {
	return (
		<ul>
		{searchedPeople.map(person => {
			return <Number key={person.id} person = {person}/>
		})}
		</ul>
	)
}



const App = () => {
	const [ persons, setPersons ] = useState([
		{name: 'Arto Hellas',
		 id: 1,
		 number: '12321'	
	},
	{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
	{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
	{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])

	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber ] = useState('');
	const [ searchedPeople, setSearchedPeople ] = useState([])

	axios	
		.get('http://localhost:3001/persons')
		.then(response => {
			const persons = response.data;
			console.log(persons);
		})

	const hook = () => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data);
			})
	}

	useEffect(hook, []);

	
	const addNewPerson = (event) => {
		setNewName(event.target.value)
	}

	const addNewNumber = (event) => {

		setNewNumber(event.target.value);
	}

	const nameExist = (name) => {
		return persons.find(person => person.name === name)
	}

	const addPerson = (event) => {
		event.preventDefault();

		if (nameExist(newName))  {
			alert(`You have already added: ${newName}`)
		}	else {
			const personObject = {
				name: newName,
				id: persons.length +1,
				number: newNumber,
			}
	
			
			setPersons(persons.concat(personObject));
			setNewName("")
		}
	}

	const escapeRegex = (string) => {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	const suitsPattern = (name, pattern) => {
		pattern = escapeRegex(pattern);
		let RE = new RegExp(pattern, 'gi'); 
		return RE.test(name);  
	}

	const searchPerson = (event) => {
		let pattern = event.target.value; 
		let personArr = persons.filter(obj => {
			return suitsPattern(obj.name, pattern); 
		})

		setSearchedPeople(personArr)
	}
	


	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchPerson = {searchPerson}/>
			<h2>Add New Contact:</h2>
			<PersonForm props = {{addPerson, newName, addNewPerson, newNumber, addNewNumber}}/>
			<h2>Numbers</h2>
			<Persons searchedPeople = {searchedPeople}/>
		</div>
  );
}

export default App;
