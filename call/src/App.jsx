import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import axios from 'axios'
import notes from './services/notes';


const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [aproveMessage, setAproveMessage] = useState("");
  



  useEffect(() => {
    notes.getAll().then(initialPersons => {
      
      setPersons(initialPersons);
    });
  }, []);


 
  



  const updateContact = (id, updatedPerson) => {
    notes.update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => 
          person.id !== id ? person : returnedPerson
        ));
        setAproveMessage("Updated")
      })
      .catch(error => {
        console.error("Couldn't update", error);
        
      });
  };




  const handleDelete = (id, name) => {
    if (window.confirm(`¿You sure want to delete ${name}?`)) {
      notes.remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setAproveMessage("Deleted")
        })
        .catch((error) => {
          console.error("Couldn't Delete", error);
          setErrorMessage("Couldn't Delete contact");
        });
    }
  };


  
 

  return (
    <div>
      <h2 >Phonebook</h2>
      {aproveMessage && <div className="aprove">{aproveMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter newSearch={newSearch} persons={persons} setNewSearch={setNewSearch} setPersons={setPersons} handleDelete={handleDelete} />
      <PersonForm newName={newName} setNewName={setNewName} 
      setNewNumber={setNewNumber} newNumber={newNumber} 
      persons={persons} setPersons={setPersons} updateContact={updateContact}/>
      
    </div>
  );
};

export default App;
