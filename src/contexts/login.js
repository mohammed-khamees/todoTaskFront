import axios from 'axios';
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

export const LoginContext = React.createContext();

const API = process.env.REACT_APP_ROOT_API;

const LoginProvider = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [failed, setFailed] = useState(false);
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');

	const state = {
		email,
		setEmail,
		password,
		setPassword,
		login,
		message,
		loggedIn,
		failed,
		token,
		userId,
		logout,
	};

	function saveToken(token) {
		const user = jwt.decode(token);
		if (user) {
			setUserId(user.userId);
			localStorage.setItem('token', token);
		}
	}

	async function login() {
		try {
			const response = await axios.post(`${API}/login`, {
				email,
				password,
			});

			setToken(response.data.token);
			saveToken(response.data.token);
			setLoggedIn(true);
			setFailed(false);
		} catch (error) {
			setFailed(true);
			setLoggedIn(false);
			setMessage(error.response.data);
		}
	}

	function logout() {
		setLoggedIn(false);
		localStorage.clear();
	}

	return (
		<LoginContext.Provider value={state}>
			{props.children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;
