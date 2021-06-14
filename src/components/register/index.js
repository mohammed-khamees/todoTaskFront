import React, { useContext } from 'react';
import { RegisterContext } from './../../contexts/register';
import { If, Then } from 'react-if';

const Register = () => {
	const registerContext = useContext(RegisterContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		registerContext.addNewUser();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="firstName here"
					onChange={(e) => registerContext.setFirstName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="lastName here"
					onChange={(e) => registerContext.setLastName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="email here"
					onChange={(e) => registerContext.setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password here"
					onChange={(e) => registerContext.setPassword(e.target.value)}
				/>
				<button>Register</button>
			</form>
			<If condition={registerContext.message}>
				<Then>
					<div>{registerContext.message}</div>
				</Then>
			</If>
		</>
	);
};

export default Register;
