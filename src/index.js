import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

//providers
import RegisterProvider from './contexts/register';

ReactDOM.render(
	<Router>
		<RegisterProvider>
			<App />
		</RegisterProvider>
	</Router>,
	document.getElementById('root'),
);
