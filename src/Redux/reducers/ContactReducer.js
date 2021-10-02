import { SAVE_CONTACT } from '../types/ContactTypes';
import { sortBy } from 'lodash';

const CONTACTS_INITIAL_STATE = {
  contacts: []
}

const ContactReducer = (state = CONTACTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_CONTACT:
      // sort the array
      const sortedPayload = sortBy(action.payload, (i) => {return i.firstName})

      return{
        ...state,
        contacts: sortedPayload
      }
  
      default:
        return state;
  }
}

export default ContactReducer;