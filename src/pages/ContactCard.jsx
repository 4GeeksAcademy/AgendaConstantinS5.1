import { Link } from "react-router-dom";
 

export const ContactCard = ({ contact, onDelete, slug }) => {
   
    

    return (
        <div>
            <h5>{contact.name}</h5>
            <p>{contact.email}</p>
            <small>{contact.address}</small>
            <div>
                <Link to ={`/contact/agendas/${slug}/edit/${contact.id}`}>
                Edit
                </Link>
                <button onClick={()=> onDelete(contact.id)}></button>
                </div>
        </div>

    )
}