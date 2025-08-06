import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { slug, id } = useParams();
    const isEditing = !!id;

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (isEditing) {
            const existingContact = store.contacts.find(c => c.id === parseInt(id));
            if (existingContact) {
                setContact(existingContact);
            }
        }
    }, [isEditing, id, store.contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                const response = await fetch(
                    `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    }
                );
                const data = await response.json();
                dispatch({ type: "UPDATE_CONTACT", payload: data });
            } else {
                const response = await fetch(
                    `https://playground.4geeks.com/contact/agendas/${slug}/contacts`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    }
                );
                const newContact = await response.json();
                dispatch({ type: "ADD_CONTACT", payload: newContact });
            }
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>{isEditing ? "Edit" : "Add"} Contact</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    />
                </div>
                <button type="submit">{isEditing ? "Update" : "Save"}</button>
                <Link to={`/contact/agendas/${slug}/contacts`}>Cancel</Link>
            </form>
        </div>
    );
};