import { Route } from 'react-router-dom';
import Header from './components/header';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import Tasks from './components/tasks';

import { Container } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

function App() {
	return (
		<Container>
			<Header />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/EditProfile" component={Profile} />
			<Route path="/tasks" component={Tasks} />
		</Container>
	);
}

export default App;
