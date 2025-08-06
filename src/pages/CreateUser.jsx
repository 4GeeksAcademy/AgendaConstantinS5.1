import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"




export const CreateUser = ({ onUserCreated }) => {
    const [user, setUser] = useState({ slug: "" });
    const { dispatch } = useGlobalReducer();

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`https://playground.4geeks.com/contact/agendas/${user.slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug: user.slug })
            });

            dispatch({ type: "SET_USER", payload: user.slug });

            if (onUserCreated) onUserCreated();
            setUser({ slug: "" });
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

    return (
        <div>
            <div className="">
                <form className="" onSubmit={handleSubmit}>
                    <input
                    style={{height:"30px", alignContent:"start"}}
                        type="text"
                        name="slug"
                        value={user.slug}
                        onChange={handleInput}
                        placeholder="User name"
                    />
                    <button type="submit">Create User</button>
                </form>
            </div>

        </div>

    );
};
