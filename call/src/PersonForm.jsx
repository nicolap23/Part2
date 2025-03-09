import React from 'react'
import axios from 'axios'








export default function PersonForm({setNewName,setNewNumber,newNumber,newName, persons, setPersons, updateContact}) {


  const checkName = (event) => {
    event.preventDefault();
    
    // Verificar si el nombre ya está en la lista
    const existingPerson = persons.find(person => person.name === newName);
    
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} Already in contacts do you want to update`
      );
      
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        
        
        updateContact(existingPerson.id, updatedPerson);
      }
      return; 
    }
    
    
    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    
    // Enviar el nuevo contacto al servidor
    axios.post('http://localhost:3001/persons', newContact)
      .then(response => {
        setPersons([...persons, response.data]);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error("Couldn't save", error);
        alert("Couldn't add contact");
      });
  };
    


  return (
    <div>
        <form onSubmit={checkName}>
        <div>
          
          <h2>Add a new</h2>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      
    </div>
  )
}
