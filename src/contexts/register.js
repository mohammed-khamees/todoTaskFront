import React, { useState } from 'react';
import axios from 'axios';

export const RegisterContext = React.createContext();

const API = process.env.REACT_APP_ROOT_API;

const RegisterProvider = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const state = {
		setFirstName,
		setLastName,
		setEmail,
		setPassword,
		addNewUser,
		setMessage,
		message,
	};

	async function addNewUser() {
		try {
			const { data } = await axios.post(`${API}/register`, {
				firstName,
				lastName,
				email,
				password,
			});

			return data;
		} catch (error) {
			setMessage(error.response.data);
		}
	}

	return (
		<RegisterContext.Provider value={state}>
			{props.children}
		</RegisterContext.Provider>
	);
};

export default RegisterProvider;
