import React, {useState, useEffect} from 'react';

import _get from 'lodash/get';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const BASE_URL = "https://simple-contact-crud.herokuapp.com/"

const contact = "contact"

export function getContacts () {

  return new Promise((resolve, reject) => {
    try {
      axios.get(BASE_URL + contact)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        }) 
    } catch (err) {
      reject(err)
    }
  })
}

export function getContactDetail(id) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(BASE_URL + contact + `/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        }) 
    } catch (err) {
      reject(err)
    }
  })
}

export function editContact({
  id,
  firstName = "",
  lastName = "",
  age = 0,
  photo = "N/A"
}) {
  const requestBody = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    photo: photo
  }

  return new Promise((resolve, reject) => {
    try {
      axios.put(BASE_URL + contact + `/${id}`, requestBody)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        }) 
    } catch (err) {
      reject(err)
    }
  })
}

export function deleteContact(id) {
  return new Promise((resolve, reject) => {
    try {
      axios.delete(BASE_URL + contact + `/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        }) 
    } catch (err) {
      reject(err)
    }
  })
}

export function addNewContact({
  firstName = "",
  lastName = "",
  age = 0,
  photo = "N/A"
}) {
  const requestBody = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    photo: photo
  }
  return new Promise((resolve, reject) => {
    try {
      axios.post(BASE_URL + contact, requestBody)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        }) 
    } catch (err) {
      reject(err)
    }
  })
}