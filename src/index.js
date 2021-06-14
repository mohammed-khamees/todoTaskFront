import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

//providers
import RegisterProvider from './contexts/register';
import LoginProvider from './contexts/login';

ReactDOM.render(
	<Router>
		<RegisterProvider>
			<LoginProvider>
				<App />
			</LoginProvider>
		</RegisterProvider>
	</Router>,
	document.getElementById('root'),
);
