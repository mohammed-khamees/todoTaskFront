import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { LoginContext } from './../../contexts/login';

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
	const [show, setShow] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginContext = useContext(LoginContext);

	const history = useHistory();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (!token) history.push('/');

		if (loginContext.token) {
			const userInfo = jwt.decode(loginContext.token);
			if (userInfo) {
				loginContext.setUserInfo(userInfo.user);
				setFirstName(userInfo.user.firstName);
				setLastName(userInfo.user.lastName);
				setEmail(userInfo.user.email);
				setPassword(userInfo.user.password);
			}
		}
		// eslint-disable-next-line
	}, [loginContext.token]);

	const handleClick = () => {
		setShow(!show);
	};

	const handelSubmit = async () => {
		try {
			const newData = {
				firstName,
				lastName,
				email,
				password,
			};

			const { data } = await axios.put(
				`${API}/updateInfo/${loginContext.userInfo._id}`,
				newData,
				{
					headers: {
						authorization: `Bearer ${loginContext.token}`,
					},
				},
			);

			loginContext.setUserInfo(data);
			setShow(!show);
			loginContext.setMessage('');
		} catch (error) {
			loginContext.setMessage(error.response.data);
		}
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
						<p>First Name: {loginContext.userInfo.firstName}</p>
						<p>Last Name: {loginContext.userInfo.lastName}</p>
						<p>Email: {loginContext.userInfo.email}</p>
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
							<span style={{ marginLeft: '1rem' }}>{loginContext.message}</span>
						</Form>
					</Panel>
				</FlexboxGrid.Item>
			)}
		</FlexboxGrid>
	);
};

export default Profile;
