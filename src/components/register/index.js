import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RegisterContext } from './../../contexts/register';
import { If, Then } from 'react-if';
import {
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Button,
	Schema,
	FlexboxGrid,
	Content,
	Panel,
	Notification,
} from 'rsuite';

const { StringType } = Schema.Types;
const model = Schema.Model({
	firstName: StringType().isRequired('This field is required.'),
	lastName: StringType().isRequired('This field is required.'),
	email: StringType()
		.isEmail('Please enter a valid email address.')
		.isRequired('This field is required.'),
	password: StringType().isRequired('This field is required.'),
});

const Register = () => {
	const [success, setSuccess] = useState(false);
	const [failed, setFailed] = useState(false);
	const registerContext = useContext(RegisterContext);
	const history = useHistory();

	const handleClick = async () => {
		try {
			const user = await registerContext.addNewUser();
			if (user) {
				registerContext.setMessage('The user has been created successfully');
				setFailed(false);
				setSuccess(true);
				redirect();
			} else {
				registerContext.setMessage(
					'Error happened while register, please try again',
				);
			}
		} catch (error) {
			setFailed(true);
			setSuccess(false);
		}
	};

	const redirect = () => {
		history.push('/');
	};

	function open(funcName) {
		Notification[funcName]({
			title: funcName,
			description: registerContext.message,
		});
	}

	return (
		<>
			<Content>
				<FlexboxGrid justify="center" align="middle">
					<FlexboxGrid.Item colspan={8}>
						<Panel
							header={<h3>Registration</h3>}
							bordered
							style={{
								backgroundColor: 'rgb(66, 129, 164,0.3)',
								marginTop: '25%',
								fontSize: '1.1em',
								color: 'black',
							}}
						>
							<Form model={model} onSubmit={handleClick} fluid>
								<FormGroup>
									<ControlLabel>First Name:</ControlLabel>
									<FormControl
										name="firstName"
										type="text"
										placeholder="firstName here"
										onChange={(value) => registerContext.setFirstName(value)}
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Last Name:</ControlLabel>
									<FormControl
										name="lastName"
										type="text"
										placeholder="lastName here"
										onChange={(value) => registerContext.setLastName(value)}
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>E-mail:</ControlLabel>
									<FormControl
										name="email"
										type="email"
										placeholder="email here"
										onChange={(value) => registerContext.setEmail(value)}
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Password:</ControlLabel>
									<FormControl
										name="password"
										type="password"
										placeholder="password here"
										onChange={(value) => registerContext.setPassword(value)}
									/>
								</FormGroup>

								<Button size="lg" appearance="primary" type="submit">
									Register
								</Button>
								<Button appearance="link" onClick={redirect}>
									Already have an account?
								</Button>
							</Form>
						</Panel>
					</FlexboxGrid.Item>
				</FlexboxGrid>
				<If condition={failed}>
					<Then>
						{() => {
							open('error');
							setFailed(false);
						}}
					</Then>
				</If>
				<If condition={success}>
					<Then>
						{() => {
							open('success');
							setSuccess(false);
						}}
					</Then>
				</If>
			</Content>
		</>
	);
};

export default Register;
