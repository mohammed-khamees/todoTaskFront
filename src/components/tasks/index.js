import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Task from './../task';
import moment from 'moment';
import {
	Form,
	FormGroup,
	ControlLabel,
	HelpBlock,
	RadioGroup,
	Radio,
	Button,
	FormControl,
	Modal,
} from 'rsuite';

const API = process.env.REACT_APP_ROOT_API;

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [completed, setCompleted] = useState(false);
	const [show, setShow] = useState(false);
	const [userId, setUserId] = useState('');

	// eslint-disable-next-line
	useEffect(async () => {
		const token = sessionStorage.getItem('token');
		const parsedToken = jwt.decode(token);

		setUserId(parsedToken.user._id);

		const { data } = await axios.get(`${API}/tasks`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		setTasks(
			data
				.filter((task) => {
					return task.user === parsedToken.user._id;
				})
				.reverse(),
		);
	}, []);

	const addNewTask = async () => {
		const newTask = {
			title,
			description,
			priority,
			completed,
			time: moment().format('llll'),
			user: userId,
		};

		const { data } = await axios.post(`${API}/tasks`, newTask, {
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});

		setTasks([data, ...tasks]);
		setShow(!show);
	};

	const deleteTask = async (id) => {
		await axios.delete(`${API}/tasks/${id}`, {
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});

		setTasks(tasks.filter((task) => task._id !== id));
	};

	const handleClick = () => {
		setShow(!show);
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClick}
				size="xs"
				style={{ marginTop: '3%' }}
			>
				<Modal.Header>
					<Modal.Title>Add The New Task Info</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={addNewTask} fluid>
						<FormGroup>
							<ControlLabel>Title</ControlLabel>
							<FormControl name="title" onChange={(value) => setTitle(value)} />
							<HelpBlock tooltip>Required</HelpBlock>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Description</ControlLabel>
							<FormControl
								rows={5}
								name="textarea"
								componentClass="textarea"
								onChange={(value) => setDescription(value)}
							/>
							<HelpBlock tooltip>Required</HelpBlock>
						</FormGroup>
						<FormGroup controlId="radioList">
							<RadioGroup
								name="radioList"
								onChange={(value) => setPriority(value)}
								inline
							>
								<p>Priority</p>
								<Radio value="low">Low</Radio>
								<Radio value="medium">Medium</Radio>
								<Radio value="high">High</Radio>
							</RadioGroup>
							<HelpBlock tooltip>Required</HelpBlock>
						</FormGroup>
						<FormGroup controlId="radioList">
							<RadioGroup
								name="radioList"
								onChange={(value) => setCompleted(value)}
								inline
							>
								<p>isCompleted</p>
								<Radio value={false}>Pending</Radio>
								<Radio value={true}>Completed</Radio>
							</RadioGroup>
						</FormGroup>
						<Button size="lg" appearance="primary" type="submit">
							Add
						</Button>
					</Form>
				</Modal.Body>
			</Modal>

			<Button
				style={{ width: '10rem', margin: '2rem auto' }}
				appearance="primary"
				onClick={handleClick}
			>
				Add New Task
			</Button>

			{tasks.length && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						flexWrap: 'wrap',
						marginTop: '3rem',
					}}
				>
					{tasks.map((task) => (
						<Task task={task} key={task._id} deleteTask={deleteTask} />
					))}
				</div>
			)}
		</>
	);
};

export default Tasks;
