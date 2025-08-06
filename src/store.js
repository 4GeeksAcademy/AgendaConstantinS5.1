import { useEffect } from "react";

export const initialStore=()=>{
  return{
    contacts: [],
    slug:"123123123123"
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      case "SET_CONTACT":
        return {
          ...store,
          contacts: action.payload
        }
        case "DELETE_CONTACT":
        return {
          ...store,
          contacts: store.contacts.filter (contact =>contact.id !=action.payload)
        }
        case "ADD_CONTACT":
        return {
          ...store,
          contacts: [...store.contacts, action.payload]
        }
          case "UPDATE_CONTACT":
        return {
          ...store,
          contacts: store.contacts.map(contact=> contact.id === action.payload.id ? action.payload : contact)
        }
           case "SET_USER":
        return {
          ...store,
          slug: action.payload
        }
        case "DELETE_USER":
        return {
          ...store,
          slug: ""
        }
    default:
      throw Error('Unknown action.');
  }    
}

