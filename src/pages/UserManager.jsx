import { useState } from "react";
import { CreateUser } from "./CreateUser";
import { ShowUsers } from "./ShowUsers";


export const UserManager = () => {
    const [trigger, setTrigger] = useState(0); 

    const handleUserCreated = () => {
        setTrigger(prev => prev + 1); 
    };

    return (
        <div>
            <CreateUser onUserCreated={handleUserCreated} /> 
            <hr />
            <ShowUsers trigger={trigger} /> 
        </div>
    );
};