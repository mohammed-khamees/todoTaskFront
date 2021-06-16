import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import {
	Form,
	FormGroup,
	ControlLabel,
	Input,
	Button,
	Modal,
	RadioGroup,
	Radio,
	Panel,
	TagGroup,
	Tag,
	IconStack,
	Icon,
} from 'rsuite';

const API = process.env.REACT_APP_ROOT_API;

const token = sessionStorage.getItem('token');
const parsedToken = jwt.decode(token);

const Task = ({ task, deleteTask }) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [priority, setPriority] = useState(task.priority);
	const [completed, setCompleted] = useState(task.isCompleted);
	const [show, setShow] = useState(false);
	const [tagBg, setTagBg] = useState('green');

	useEffect(() => {
		if (priority === 'high') setTagBg('red');
		if (priority === 'medium') setTagBg('orange');
		// eslint-disable-next-line
	}, [tagBg]);

	const handleClick = () => {
		setShow(!show);
	};

	const updateTask = async (id) => {
		const newData = {
			title,
			description,
			priority,
			completed,
			time: moment().format('llll'),
			user: parsedToken.user._id,
		};

		await axios.put(`${API}/tasks/${id}`, newData, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	};

	return (
		<>
			<Panel
				shaded
				bordered
				bodyFill
				style={{
					width: 400,
					padding: '1rem 0.7rem 0.5rem ',
					position: 'relative',
					marginBottom: '2rem',
				}}
			>
				<TagGroup style={{ marginLeft: '0.5rem' }}>
					<Tag color={tagBg}>{priority}</Tag>
					<Tag
						style={{ cursor: 'pointer' }}
						color={task.isCompleted ? 'green' : 'red'}
						onClick={() => {
							setCompleted(!completed);
							updateTask(task._id);
						}}
					>
						{task.isCompleted ? 'Completed' : 'Pending...'}
					</Tag>
				</TagGroup>
				<IconStack
					size="lg"
					style={{
						position: 'absolute',
						top: '10px',
						right: '0',
						width: '6rem',
					}}
				>
					<Icon
						icon="edit"
						style={{
							marginRight: '1rem',
							fontSize: '1.2rem',
							cursor: 'pointer',
							color: 'gray',
						}}
						onClick={handleClick}
					/>
					<Icon
						icon="trash"
						style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'red' }}
						onClick={(e) => {
							e.preventDefault();
							deleteTask(task._id);
						}}
					/>
				</IconStack>
				<Panel header={`${title}  ${task.time}`}>
					<p>{description}</p>
				</Panel>
			</Panel>

			<Modal
				show={show}
				onHide={handleClick}
				size="xs"
				style={{ marginTop: '3%' }}
			>
				<Modal.Header>
					<Modal.Title>Edit The Task Info</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form fluid>
						<FormGroup controlId="radioList">
							<RadioGroup
								name="radioList"
								onChange={(value) => setPriority(value)}
								defaultValue={task.priority}
								inline
							>
								<p>Priority</p>
								<Radio value="low">Low</Radio>
								<Radio value="medium">Medium</Radio>
								<Radio value="high">High</Radio>
							</RadioGroup>
						</FormGroup>
						<FormGroup controlId="radioList">
							<RadioGroup
								name="radioList"
								onChange={(value) => setCompleted(value)}
								defaultValue={task.isCompleted}
								inline
							>
								<p>isCompleted</p>
								<Radio value={false}>Pending</Radio>
								<Radio value={true}>Completed</Radio>
							</RadioGroup>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Title</ControlLabel>
							<Input
								name="name"
								defaultValue={task.title}
								onChange={(value) => setTitle(value)}
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Description</ControlLabel>
							<Input
								rows={5}
								name="textarea"
								componentClass="textarea"
								defaultValue={task.description}
								onChange={(value) => setDescription(value)}
							/>
						</FormGroup>
						<FormGroup></FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={(e) => {
							e.preventDefault();
							setShow(!show);
							updateTask(task._id);
						}}
						appearance="primary"
					>
						Edit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Task;
