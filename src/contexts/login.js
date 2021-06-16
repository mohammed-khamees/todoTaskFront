import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const LoginContext = React.createContext();

const API = process.env.REACT_APP_ROOT_API;

const LoginProvider = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [token, setToken] = useState('');
	const [userInfo, setUserInfo] = useState({});

	const state = {
		email,
		setEmail,
		password,
		setPassword,
		login,
		message,
		loggedIn,
		token,
		userInfo,
		logout,
		saveToken,
	};

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			saveToken(token);
		}
	}, []);

	function saveToken(token) {
		const { user } = jwt.decode(token);
		if (user) {
			sessionStorage.setItem('token', token);
			setToken(token);
			setUserInfo(user);
			setLoggedIn(true);
		}
	}

	async function login() {
		try {
			const { data } = await axios.post(`${API}/login`, {
				email,
				password,
			});

			setToken(data);
			saveToken(data);
		} catch (error) {
			setLoggedIn(false);
			setMessage(error);
		}
	}

	function logout() {
		setLoggedIn(false);
		sessionStorage.removeItem('token');
	}

	return (
		<LoginContext.Provider value={state}>
			{props.children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;
