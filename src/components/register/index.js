import React, { useContext } from 'react';
import { RegisterContext } from './../../contexts/register';
import { If, Then, Else } from 'react-if';
import {
	Notification,
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Button,
	Schema,
} from 'rsuite';

const Register = () => {
	const registerContext = useContext(RegisterContext);

	const handleClick = () => {
		registerContext.addNewUser();
	};

	return (
		<>
			<Form>
				<FormGroup>
					<ControlLabel>First Name:</ControlLabel>
					<FormControl
						type="text"
						placeholder="firstName here"
						onChange={(value) => registerContext.setFirstName(value)}
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Last Name:</ControlLabel>
					<FormControl
						type="text"
						placeholder="lastName here"
						onChange={(value) => registerContext.setLastName(value)}
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>E-mail:</ControlLabel>
					<FormControl
						placeholder="email here"
						onChange={(value) => registerContext.setEmail(value)}
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Password:</ControlLabel>
					<FormControl
						type="password"
						placeholder="password here"
						onChange={(value) => registerContext.setPassword(value)}
					/>
				</FormGroup>

				<Button appearance="primary" onClick={handleClick}>
					Register
				</Button>
			</Form>
		</>
	);
};

export default Register;
