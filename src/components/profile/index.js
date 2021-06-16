import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import {
	Form,
	FormGroup,
	Avatar,
	ControlLabel,
	FormControl,
	Button,
	Schema,
	FlexboxGrid,
	Panel,
	Input,
	Icon,
	HelpBlock,
} from 'rsuite';

const { StringType } = Schema.Types;
const model = Schema.Model({
	email: StringType().isEmail('Please enter a valid email address.'),
	password: StringType().isRequired('This field is required.'),
});

const API = process.env.REACT_APP_ROOT_API;

const Profile = () => {
	const [user, setUser] = useState({});
	const [show, setShow] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const token = sessionStorage.getItem('token');

	useEffect(() => {
		if (token) {
			const userInfo = jwt.decode(token);
			if (userInfo) {
				setUser(userInfo.user);
				setFirstName(userInfo.user.firstName);
				setLastName(userInfo.user.lastName);
				setEmail(userInfo.user.email);
				setPassword(userInfo.user.password);
			}
		}
	}, []);

	const handleClick = () => {
		setShow(!show);
	};

	const handelSubmit = async () => {
		const newData = {
			firstName,
			lastName,
			email,
			password,
		};

		const { data } = await axios.put(`${API}/updateInfo/${user._id}`, newData, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		setUser(data);
		setShow(!show);
	};

	return (
		<FlexboxGrid justify="center" align="middle">
			<FlexboxGrid.Item colspan={6}>
				<Panel
					header={<h3>Your Info</h3>}
					bordered
					style={{ height: '32rem', marginTop: '33%', textAlign: 'center' }}
				>
					<Avatar
						style={{
							height: '10rem',
							width: '10rem',
							marginBottom: '2rem',
						}}
						circle
					>
						<Icon
							icon="user"
							style={{
								fontSize: '6rem',
							}}
						/>
					</Avatar>
					<div
						style={{
							fontSize: '1.2rem',
							marginBottom: '2rem',
						}}
					>
						<p>First Name: {firstName}</p>
						<p>Last Name: {lastName}</p>
						<p>Email: {email}</p>
					</div>
					<Button
						size="lg"
						appearance="primary"
						type="link"
						onClick={handleClick}
					>
						Update Your Info
					</Button>
				</Panel>
			</FlexboxGrid.Item>
			{show && (
				<FlexboxGrid.Item colspan={8}>
					<Panel
						header={<h3>Update Your Info</h3>}
						bordered
						style={{
							backgroundColor: 'rgb(66, 129, 164,0.3)',
							marginTop: '25%',
							fontSize: '1.1em',
							color: 'black',
							height: '32rem',
						}}
					>
						<Form model={model} fluid onSubmit={handelSubmit}>
							<FormGroup>
								<ControlLabel>First Name</ControlLabel>
								<FormControl
									name="firstName"
									type="text"
									placeholder="firstName here"
									onChange={(value) => setFirstName(value)}
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Last Name</ControlLabel>
								<FormControl
									name="lastName"
									type="text"
									placeholder="lastName here"
									onChange={(value) => setLastName(value)}
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>E-mail:</ControlLabel>
								<FormControl
									name="email"
									type="email"
									placeholder="email here"
									onChange={(value) => setEmail(value)}
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Password</ControlLabel>
								<FormControl
									name="password"
									type="password"
									placeholder="password here"
									onChange={(value) => setPassword(value)}
								/>
								<HelpBlock>Required</HelpBlock>
							</FormGroup>

							<Button size="lg" appearance="primary" type="submit">
								Update
							</Button>
						</Form>
					</Panel>
				</FlexboxGrid.Item>
			)}
		</FlexboxGrid>
	);
};

export default Profile;
