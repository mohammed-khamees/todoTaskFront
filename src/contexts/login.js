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
	const [failed, setFailed] = useState(false);
	const [token, setToken] = useState('');
	const [userInfo, setUserInfo] = useState('');

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
		const user = jwt.decode(token);
		if (user) {
			setToken(token);
			setUserInfo(user);
			setLoggedIn(true);
			setFailed(false);
			sessionStorage.setItem('token', token);
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
			setFailed(true);
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
