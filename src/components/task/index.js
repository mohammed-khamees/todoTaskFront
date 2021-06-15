import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const API = process.env.REACT_APP_ROOT_API;

const token = sessionStorage.getItem('token');
const parsedToken = jwt.decode(token);

const Task = ({ task, deleteTask }) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [priority, setPriority] = useState(task.priority);
	const [show, setShow] = useState(false);

	const handleClick = () => {
		setShow(!show);
	};

	const updateTask = async (id) => {
		const newData = {
			title,
			description,
			priority,
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
			{!show ? (
				<div style={{ border: '1px solid black', margin: '1rem auto' }}>
					<p>time: {task.time}</p>
					<p>title: {title}</p>
					<p>description: {description}</p>
					<p>priority: {priority}</p>
					<p>{task.isCompleted ? 'Completed' : 'Pending'} </p>
					<button onClick={handleClick} style={{ width: '2rem' }}>
						edit
					</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							deleteTask(task._id);
						}}
						style={{ width: '5rem' }}
					>
						delete
					</button>
				</div>
			) : (
				<form>
					<input
						type="text"
						name="title"
						defaultValue={task.title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						name="description"
						onChange={(e) => setDescription(e.target.value)}
					>
						{task.description}
					</textarea>
					<select
						name="priority"
						defaultValue={task.priority}
						onChange={(e) => setPriority(e.target.value)}
					>
						<option value="low">low</option>
						<option value="medium">medium</option>
						<option value="high">high</option>
					</select>
					<button
						onClick={(e) => {
							e.preventDefault();
							setShow(!show);
							updateTask(task._id);
						}}
						style={{ width: '2rem' }}
					>
						edit
					</button>
				</form>
			)}
		</>
	);
};

export default Task;
