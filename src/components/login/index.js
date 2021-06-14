import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from './../../contexts/login';
import { If, Then } from 'react-if';

const Login = () => {
	const loginContext = useContext(LoginContext);
	const history = useHistory();

	const handleClick = async (e) => {
		e.preventDefault();
		loginContext.login();
		if (loginContext.loggedIn) {
			history.push('/tasks');
		}
	};

	const redirect = () => {
		if (loginContext.loggedIn) {
			history.push('/tasks');
		}
	};

	return (
		<>
			<form>
				<input
					type="email"
					placeholder="email here"
					onChange={(e) => loginContext.setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password here"
					onChange={(e) => loginContext.setPassword(e.target.value)}
				/>
				<button onClick={handleClick}>Login</button>
			</form>
			<If condition={loginContext.loggedIn}>
				<Then>{redirect()}</Then>
			</If>
			<If condition={loginContext.failed}>
				<Then>
					<div>{loginContext.message}</div>
				</Then>
			</If>
		</>
	);
};

export default Login;
