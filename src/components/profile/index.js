import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { If, Then, Else } from 'react-if';
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

const Profile = () => {
	const [show, setShow] = useState(true);
	const [user, setUser] = useState(true);

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			const userInfo = jwt.decode(token);
			if (userInfo) {
				setUser(userInfo.user);
			}
		}
	}, []);

	return (
		<>
			<h1>Your Info</h1>
			<p>firstName: {user.firstName}</p>
			<p>lastName: {user.lastName}</p>
			<p>email: {user.email}</p>
			<Content>
				<FlexboxGrid justify="center" align="middle">
					<FlexboxGrid.Item colspan={8}>
						<Panel
							header={<h3>Update Your Info</h3>}
							bordered
							style={{
								backgroundColor: 'rgb(66, 129, 164,0.3)',
								marginTop: '25%',
								fontSize: '1.1em',
								color: 'black',
							}}
						>
							<Form model={model} fluid>
								<FormGroup>
									<ControlLabel>First Name:</ControlLabel>
									<FormControl
										name="firstName"
										type="text"
										placeholder="firstName here"
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Last Name:</ControlLabel>
									<FormControl
										name="lastName"
										type="text"
										placeholder="lastName here"
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>E-mail:</ControlLabel>
									<FormControl
										name="email"
										type="email"
										placeholder="email here"
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Password:</ControlLabel>
									<FormControl
										name="password"
										type="password"
										placeholder="password here"
									/>
								</FormGroup>

								<Button size="lg" appearance="primary" type="submit">
									Update
								</Button>
							</Form>
						</Panel>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Content>
		</>
	);
};

export default Profile;
