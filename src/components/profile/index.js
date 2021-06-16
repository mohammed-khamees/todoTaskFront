import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import {
	Form,
	FormGroup,
	Avatar,
	ControlLabel,
	Button,
	Schema,
	FlexboxGrid,
	Panel,
	Input,
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
	const [user, setUser] = useState({});
	const [show, setShow] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			const userInfo = jwt.decode(token);
			if (userInfo) {
				setUser(userInfo.user);
			}
		}
	}, []);

	const handleClick = () => {
		setShow(!show);
	};

	return (
		<FlexboxGrid justify="center" align="middle">
			<FlexboxGrid.Item colspan={6}>
				<Panel
					header={<h3>Your Info</h3>}
					bordered
					style={{ height: '32rem', marginTop: '33.5%', textAlign: 'center' }}
				>
					<Avatar
						style={{
							height: '10rem',
							width: '10rem',
							fontSize: '4rem',
							paddingBottom: '1rem',
							marginBottom: '2rem',
						}}
						circle
					>
						{user.firstName}
					</Avatar>
					<p>firstName: {user.firstName}</p>
					<p>lastName: {user.lastName}</p>
					<p>email: {user.email}</p>
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
						<Form model={model} fluid>
							<FormGroup>
								<ControlLabel>First Name</ControlLabel>
								<Input
									name="firstName"
									type="text"
									placeholder="firstName here"
									defaultValue={user.firstName}
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Last Name</ControlLabel>
								<Input
									name="lastName"
									type="text"
									placeholder="lastName here"
									defaultValue={user.lastName}
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>E-mail:</ControlLabel>
								<Input
									name="email"
									type="email"
									placeholder="email here"
									defaultValue={user.email}
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Password</ControlLabel>
								<Input
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
			)}
		</FlexboxGrid>
	);
};

export default Profile;
