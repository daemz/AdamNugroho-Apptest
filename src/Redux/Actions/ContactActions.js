import {
  SAVE_CONTACT
} from '../types/ContactTypes';

export const saveContact = (contacts) => {
  return {
    type: SAVE_CONTACT,
    payload: contacts
  }
}