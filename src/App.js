import { Route } from 'react-router-dom';
import Header from './components/header';
import Register from './components/register';

function App() {
	return (
		<div className="App">
			<Header />
			<Route path="/register" component={Register} />
		</div>
	);
}

export default App;
