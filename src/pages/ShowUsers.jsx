import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CreateUser } from "./CreateUser";
import { Link } from "react-router-dom";



export const ShowUsers = ({ trigger }) => {

	const [obtainUser, setObtainUser] = useState([])
	const { store, dispatch } = useGlobalReducer()
	const { slug } = store



	async function getUsers() {
		const response = await fetch(`https://playground.4geeks.com/contact/agendas`)
		const data = await response.json()
		console.log(data)
		setObtainUser(data.agendas || [])

	}

	const deleteUser = async (slug) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
				method: "DELETE"
			});

			if (!response.ok) throw new Error("Error al eliminar usuario");

			dispatch({ type: "DELETE_USER" });


			getUsers();
		} catch (error) {
			console.error("Error al eliminar usuario:", error);
		}
	};

	useEffect(() => {
		getUsers();
	}, [trigger]);

	return (
		<div className="row">
				<CreateUser onUserCreated={getUsers} />
			{obtainUser.map((obtainUser, id) => (
				<div className="col-md-4 mb-4" key={id}>
					<div className="card h-100 shadow p-3">
						<h5>
							<Link to={`/contact/agendas/${obtainUser.slug}/contacts`}>
								{obtainUser.slug}
							</Link>
						</h5>
						<button onClick={() => deleteUser(obtainUser.slug)}>borrar</button>
					</div>

				</div>
			))}
		</div>
	);
}
