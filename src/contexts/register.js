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
		message,
	};

	async function addNewUser() {
		try {
			await axios.post(`${API}/register`, {
				firstName,
				lastName,
				email,
				password,
			});

			setMessage('The user has been created successfully');
		} catch (error) {
			setMessage('Error happened while register, please try again');
		}
	}

	return (
		<RegisterContext.Provider value={state}>
			{props.children}
		</RegisterContext.Provider>
	);
};

export default RegisterProvider;
