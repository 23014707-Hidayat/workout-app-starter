import { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  
  // Fetch workouts from the backend
  const fetchWorkouts = async () => {
    const token = localStorage.getItem('token'); // Retrieve JWT from localStorage

    if (!token) {
      console.log('User not authenticated');
      return;
    }

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Include token in the Authorization header
      },
    });

    const data = await response.json();
    setWorkouts(data); // Set fetched workouts in state
  };

  // Add a new workout
  const addWorkout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ name: newWorkout }),
    });

    if (response.ok) {
      setNewWorkout(''); // Clear input field
      fetchWorkouts(); // Refresh workouts list
    }
  };

  // Delete a workout
  const deleteWorkout = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      },
    });

    if (response.ok) {
      fetchWorkouts(); // Refresh workouts list
    }
  };

  useEffect(() => {
    fetchWorkouts(); // Fetch workouts when component mounts
  }, []);

  return (
    <div>
      <h1>Your Workouts</h1>

      {/* Add new workout */}
      <input
        type="text"
        value={newWorkout}
        onChange={(e) => setNewWorkout(e.target.value)}
        placeholder="New workout"
      />
      <button onClick={addWorkout}>Add Workout</button>

      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.name} 
            <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
