import { SAVE_CONTACT } from '../types/ContactTypes';

const CONTACTS_INITIAL_STATE = {
  contacts: []
}

const ContactReducer = (state = CONTACTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_CONTACT:
      return{
        ...state,
        contacts: action.payload
      }
  
      default:
        return state;
  }
}

export default ContactReducer;