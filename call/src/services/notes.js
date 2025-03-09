import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

// Obtener todas las personas
const getAll = () => {
  return axios.get(baseUrl).then(response => {
    return response.data.map(person => ({
      ...person,
      id: Number(person.id)  // Convertir ID a número
    }));
  });
};

// Agregar una nueva persona
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

// Eliminar una persona
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};


// Actualizar un contacto existente
const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
    .then(response => response.data);
};

// Exportar las funciones
export default { getAll, create, remove, update };