import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Task from './../task';
import moment from 'moment';

const API = process.env.REACT_APP_ROOT_API;

const token = sessionStorage.getItem('token');
const parsedToken = jwt.decode(token);

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [filterdTasks, setFilterdTasks] = useState([]);

	// eslint-disable-next-line
	useEffect(async () => {
		const { data } = await axios.get(`${API}/tasks`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		setTasks(
			data.filter((task) => task.user === parsedToken.user._id).reverse(),
		);
	}, []);

	const addNewTask = async (e) => {
		e.preventDefault();

		const newTask = {
			title: e.target.title.value,
			description: e.target.description.value,
			priority: e.target.priority.value,
			time: moment().format('llll'),
			user: e.target.user.value,
		};

		const { data } = await axios.post(`${API}/tasks`, newTask, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		e.target.title.value = '';
		e.target.description.value = '';
		e.target.title.focus();
		setTasks([data, ...tasks]);
	};

	const deleteTask = async (id) => {
		const { data } = await axios.delete(`${API}/tasks/${id}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		setTasks(tasks.filter((task) => task._id !== id));
	};

	const filter = (e) => {
		e.preventDefault();
		const priority = e.target.priority.value;
		const completed = e.target.completed.value;

		if (priority && completed) {
			setFilterdTasks(
				tasks.filter(
					(task) =>
						task.priority === priority &&
						task.isCompleted.toString() === completed,
				),
			);
			e.target.priority.value = '';
			e.target.completed.value = '';
		} else if (priority) {
			setFilterdTasks([...tasks.filter((task) => task.priority === priority)]);
			e.target.priority.value = '';
		} else if (completed) {
			setFilterdTasks([
				...tasks.filter((task) => task.isCompleted.toString() === completed),
			]);
			e.target.completed.value = '';
		} else {
			setFilterdTasks([...tasks]);
		}
	};

	return (
		<>
			<form onSubmit={addNewTask}>
				<input type="text" name="title" />
				<textarea name="description"></textarea>

				<select name="priority" defaultValue="low">
					<option value="low">low</option>
					<option value="medium">medium</option>
					<option value="high">high</option>
				</select>
				<input type="hidden" name="user" defaultValue={parsedToken.user._id} />
				<button>Add</button>
			</form>

			<form onSubmit={filter}>
				<select name="priority">
					<option value="">none</option>
					<option value="low">low</option>
					<option value="medium">medium</option>
					<option value="high">high</option>
				</select>
				<select name="completed">
					<option value="">none</option>
					<option value="true">Completed</option>
					<option value="false">Pending</option>
				</select>
				<button>filter</button>
			</form>
			<button onClick={() => setFilterdTasks([...tasks])}>All Tasks</button>

			{!filterdTasks.length
				? tasks.map((task) => (
						<Task key={task._id} task={task} deleteTask={deleteTask} />
				  ))
				: filterdTasks.map((task) => (
						<Task key={task._id} task={task} deleteTask={deleteTask} />
				  ))}
		</>
	);
};

export default Tasks;
