import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "./ContactCard";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const { slug } = useParams();

   const loadContacts = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`); 
            if (response.status === 404) {
                await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                    method: "POST",
                });
            } else if (response.ok) {
                const data = await response.json();
                dispatch({ type: "SET_CONTACT", payload: data.contacts || [] });
            }
        } catch (error) {
            console.error("Error loading contacts:", error);
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, { 
                method: "DELETE"
            });
            if (response.ok) {
                dispatch({ type: "DELETE_CONTACT", payload: id }); 
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

   useEffect(() => {
        loadContacts();
    }, [slug]);

    return (
        <div>
            <h1>Contact</h1>
            <Link to={`/contact/agendas/${slug}/add`}>ADD CONTACT</Link> 
            {store.contacts.map((contact) => (
                <ContactCard
                    key={contact.id}
                    contact={contact}
                    onDelete={deleteContact}
                    slug={slug}
                />
            ))}
        </div>
    );
};