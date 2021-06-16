import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoginContext } from './../../contexts/login';
import { If, Then, Else } from 'react-if';
import { Navbar, Nav, Dropdown, Icon } from 'rsuite';

const Navigation = () => {
	const loginContext = useContext(LoginContext);
	const history = useHistory();

	const handleClick = () => {
		history.push('/');
		loginContext.logout();
	};

	return (
		<Navbar appearance="inverse" style={{ padding: '0.5rem 0' }}>
			<Navbar.Header style={{ padding: '6px 30px', fontSize: '1.8rem' }}>
				ToDo
			</Navbar.Header>
			<Navbar.Body style={{ float: 'right', paddingRight: '2rem' }}>
				<Nav activeKey={null}>
					<If condition={!loginContext.loggedIn}>
						<Then>
							<Link to="/register" style={{ color: 'white', fontSize: '2rem' }}>
								<Nav.Item eventKey="1" icon={<Icon icon="user-plus" />}>
									Register
								</Nav.Item>
							</Link>
							<Link to="/" style={{ color: 'white' }}>
								<Nav.Item eventKey="2" icon={<Icon icon="sign-in" />}>
									Login
								</Nav.Item>
							</Link>
						</Then>
						<Else>
							<Link to="/tasks" style={{ color: 'white' }}>
								<Nav.Item eventKey="3" icon={<Icon icon="task" />}>
									Your Tasks
								</Nav.Item>
							</Link>
							<Dropdown title="Profile" icon={<Icon icon="user" />}>
								<Link to="/EditProfile" style={{ color: 'white' }}>
									<Dropdown.Item eventKey="4" icon={<Icon icon="cog" />}>
										Settings
									</Dropdown.Item>
								</Link>

								<Dropdown.Item
									eventKey="5"
									icon={<Icon icon="sign-out" />}
									onClick={handleClick}
								>
									Logout
								</Dropdown.Item>
							</Dropdown>
						</Else>
					</If>
				</Nav>
			</Navbar.Body>
		</Navbar>
	);
};

export default Navigation;
