import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { LoginContext } from '../context/login';
import { If, Then, Else } from 'react-if';
import { Navbar, Nav, Dropdown, Icon } from 'rsuite';

const Navigation = () => {
	// const loginContext = useContext(LoginContext);
	const history = useHistory();

	// const handleClick = () => {
	// 	history.push('/');
	// 	loginContext.logout();
	// };

	return (
		<Navbar appearance="inverse">
			<Navbar.Header style={{ padding: '4px 30px', fontSize: '2rem' }}>
				ToDo
			</Navbar.Header>
			<Navbar.Body style={{ float: 'right', paddingRight: '2rem' }}>
				<Nav activeKey={null}>
					<If condition={true}>
						<Then>
							<Link to="/register" style={{ color: 'white' }}>
								<Nav.Item eventKey="1" icon={<Icon icon="user-plus" />}>
									Register
								</Nav.Item>
							</Link>
							<Link to="/login" style={{ color: 'white' }}>
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
								<Link to="/login" style={{ color: 'white' }}>
									<Dropdown.Item eventKey="5" icon={<Icon icon="sign-out" />}>
										Logout
									</Dropdown.Item>
								</Link>
							</Dropdown>
						</Else>
					</If>
				</Nav>
			</Navbar.Body>
		</Navbar>
	);
};

export default Navigation;
