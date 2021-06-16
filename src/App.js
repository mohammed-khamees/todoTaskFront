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
			<Route exact path="/register" component={Register} />
			<Route exact path="/" component={Login} />
			<Route exact path="/EditProfile" component={Profile} />
			<Route exact path="/tasks" component={Tasks} />
		</Container>
	);
}

export default App;
