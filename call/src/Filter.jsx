import React from 'react'
import axios from 'axios'
import notes from './services/notes';
import { useState, useEffect } from 'react';


const Filter = ({newSearch , persons, setNewSearch,setPersons,handleDelete}) =>{

    
const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );


  useEffect(() => {
    notes.getAll().then((initialContacts) => setPersons(initialContacts));
  }, []);



    return(<>
    

        filter shown with <input value={newSearch} onChange={(e) => setNewSearch(e.target.value)}/>


     <h2>Numbers</h2>
        
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button></li>
          
        ))}
      </ul>
    </>

      
    )

}






export default Filter;