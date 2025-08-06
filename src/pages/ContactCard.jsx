import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const ContactCard = ({ contact, onDelete, slug }) => {
  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <div className="d-flex justify-content-between">
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{contact.email}</li>
        <li className="list-group-item">{contact.phone}</li>
        <li className="list-group-item">{contact.address}</li>
          <Link to={`/contact/agendas/${slug}/edit/${contact.id}`} className="btn btn-primary btn-sm">
            Edit
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(contact.id)}>
            Delete
          </button>
      </ul>
    </div>
  );
}