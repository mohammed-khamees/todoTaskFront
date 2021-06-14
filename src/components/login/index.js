import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from './../../contexts/login';
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
} from 'rsuite';

const { StringType } = Schema.Types;
const model = Schema.Model({
	email: StringType()
		.isEmail('Please enter a valid email address.')
		.isRequired('This field is required.'),
	password: StringType().isRequired('This field is required.'),
});

const Login = () => {
	const loginContext = useContext(LoginContext);
	const history = useHistory();

	const handleClick = () => {
		loginContext.login();
	};

	const redirectToTasks = () => {
		if (loginContext.loggedIn) {
			history.push('/tasks');
		}
	};

	const register = () => {
		history.push('/register');
	};

	return (
		<>
			<Content>
				<FlexboxGrid justify="center" align="middle">
					<FlexboxGrid.Item colspan={8}>
						<Panel
							header={<h3>Login</h3>}
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
									<ControlLabel>E-mail:</ControlLabel>
									<FormControl
										name="email"
										type="email"
										placeholder="email here"
										onChange={(value) => loginContext.setEmail(value)}
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Password:</ControlLabel>
									<FormControl
										name="password"
										type="password"
										placeholder="password here"
										onChange={(value) => loginContext.setPassword(value)}
									/>
								</FormGroup>

								<Button size="lg" appearance="primary" type="submit">
									Login
								</Button>
								<Button appearance="link" onClick={register}>
									create new account?
								</Button>
							</Form>
						</Panel>
					</FlexboxGrid.Item>
				</FlexboxGrid>
				<If condition={loginContext.loggedIn}>
					<Then>{redirectToTasks()}</Then>
				</If>
			</Content>
		</>
	);
};

export default Login;
