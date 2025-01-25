import React, { useState, useEffect } from 'react';
import '../styles.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [selectedUser, setSelectedUser] = useState(null); // To store the selected user
    const [showModal, setShowModal] = useState(false); // To control modal visibility

    useEffect(() => {
        // Mock data - Replace with an API call
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', goals: [{ title: 'Learn React', deadline: '2025-06-30', status: 'In Progress' }] },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', goals: [{ title: 'Build Portfolio', deadline: '2025-03-15', status: 'Completed' }] },
            { id: 3, name: 'Alice Brown', email: 'alice@example.com', goals: [{ title: 'Complete Project', deadline: '2025-01-30', status: 'In Progress' }] }
        ];
        setUsers(mockUsers);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUser.name && newUser.email) {
            const newUserWithId = { ...newUser, id: users.length + 1, goals: [] };
            setUsers([...users, newUserWithId]);
            setNewUser({ name: '', email: '' }); 
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    
    const totalGoals = users.reduce((total, user) => total + user.goals.length, 0);
    const completedGoals = users.reduce((total, user) => total + user.goals.filter(goal => goal.status === 'Completed').length, 0);
    const completionPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">User Dashboard</h2>

            {/* Summary Section */}
            <div className="summary-section">
                <h3>Total Goals: {totalGoals}</h3>
                <h3>Completed Goals: {completedGoals}</h3>
                <h3>Completion Percentage: {completionPercentage.toFixed(2)}%</h3>
            </div>
            
            {/* Add User Form */}
            <form className="add-user-form" onSubmit={handleAddUser}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="user-input"
                    value={newUser.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="user-input"
                    value={newUser.email}
                    onChange={handleInputChange}
                />
                <button type="submit" className="add-button">Add User</button>
            </form>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name or email"
                className="search-bar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Sort Button */}
            <button className="sort-button" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>

            {/* User Table */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Goals</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user.id} onClick={() => handleUserClick(user)} className="user-row">
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.goals.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal to show user goals */}
            {showModal && selectedUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedUser.name}'s Goals</h2>
                        <button className="close-modal-button" onClick={closeModal}>Close</button>
                        <div className="goal-list">
                            {selectedUser.goals.map((goal, index) => (
                                <div key={index} className="goal-item">
                                    <h3>{goal.title}</h3>
                                    <p>Deadline: {goal.deadline}</p>
                                    <p>Status: {goal.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
