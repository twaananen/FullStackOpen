import axios from "axios";

const url = "http://localhost:3003/persons"

const getAll = () => {
    return axios
    .get(url)
    .then((response) => response.data)
}

const create = (newPerson) => {
    return axios
    .post(url,newPerson)
    .then((response) => response.data)
}

const update = (id,updatedPerson) => {
    return axios
    .put(`${url}/${id}`,updatedPerson)
    .then((response) => response.data)
}

const remove = (id) => {
    return axios
    .delete(`${url}/${id}`)
    .then()
}

export default {getAll, create, update, remove}