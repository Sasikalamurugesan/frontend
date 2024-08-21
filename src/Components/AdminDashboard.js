

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import '../Styles/AdminDashboard.css'; // Import the CSS for styling

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
//     const [totalClicks, setTotalClicks] = useState(0);
//     const [view, setView] = useState('details'); // State to toggle between 'details' and 'graph'
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         // Fetch user details
//         axios.get('http://localhost:5000/api/users')
//             .then(response => {
//                 setUsers(response.data);
//                 setFilteredUsers(response.data); // Initialize filtered users
//             })
//             .catch(error => {
//                 console.error('Error fetching users:', error);
//             });

//         // Fetch dashboard stats
//         axios.get('http://localhost:5000/api/dashboard-stats')
//             .then(response => {
//                 const { monthlyData, totalClicks } = response.data;
//                 const labels = monthlyData.map(data => `Month ${data._id}`);
//                 const data = monthlyData.map(data => data.count);

//                 setGraphData({
//                     labels,
//                     datasets: [
//                         {
//                             label: 'User Count per Month',
//                             data,
//                             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                             borderColor: 'rgba(75, 192, 192, 1)',
//                             borderWidth: 1
//                         }
//                     ]
//                 });
//                 setTotalClicks(totalClicks);
//             })
//             .catch(error => {
//                 console.error('Error fetching dashboard stats:', error);
//             });
//     }, []);

//     const handleNavClick = (view) => {
//         setView(view);
//     };

//     const handleSearchChange = (e) => {
//         const term = e.target.value.toLowerCase();
//         setSearchTerm(term);

//         if (term) {
//             setFilteredUsers(users.filter(user => 
//                 user.name.toLowerCase().includes(term) ||
//                 user.email.toLowerCase().includes(term)
//             ));
//         } else {
//             setFilteredUsers(users);
//         }
//     };

//     return (
//         <div>
//             <nav className="admin-nav">
               
//                 <ul>
//                     <li onClick={() => handleNavClick('details')} className={view === 'details' ? 'active' : ''}>Home</li>
//                     <li onClick={() => handleNavClick('graph')} className={view === 'graph' ? 'active' : ''}>Graph</li>
//                 </ul>
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         placeholder="Search ..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//             </nav>
//             <div className="admin-content">
//                 {view === 'details' && (
//                     <div>
//                         <h2>User Details</h2>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Gender</th>
//                                     <th>Last Login Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredUsers.map((user, index) => (
//                                     <tr key={user._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.gender}</td>
//                                         <td>{new Date(user.lastLoginDate).toLocaleDateString()}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <p>Total User Count: {totalClicks}</p>
//                     </div>
//                 )}
//                 {view === 'graph' && (
                    
//                     <div>
//                         <h2>User Count per Month</h2>
//                         <Bar data={graphData} />
//                     </div>
                    
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Styles/AdminDashboard.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
    const [totalClicks, setTotalClicks] = useState(0);
    const [view, setView] = useState('details'); // State to toggle between 'details' and 'graph'
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        // Fetch user details
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data); // Initialize filtered users
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

        // Fetch dashboard stats
        axios.get('http://localhost:5000/api/dashboard-stats')
            .then(response => {
                const { monthlyData, totalClicks } = response.data;
                const labels = monthlyData.map(data => `Month ${data._id}`);
                const data = monthlyData.map(data => data.count);

                setGraphData({
                    labels,
                    datasets: [
                        {
                            label: 'User Count per Month',
                            data,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                });
                setTotalClicks(totalClicks);
            })
            .catch(error => {
                console.error('Error fetching dashboard stats:', error);
            });
    }, []);

    const handleNavClick = (view) => {
        setView(view);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term) {
            setFilteredUsers(users.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
            ));
        } else {
            setFilteredUsers(users);
        }
    };

    const handleLogout = () => {
        // Perform any necessary logout operations here
        // For example, clear localStorage or session data

        // Navigate to the signup page
        navigate('/signup');
    };

    return (
        <div>
            <nav className="admin-nav">
                <ul>
                    <li onClick={() => handleNavClick('details')} className={view === 'details' ? 'active' : ''}>Home</li>
                    <li onClick={() => handleNavClick('graph')} className={view === 'graph' ? 'active' : ''}>Graph</li>
                </ul>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search ..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="logout-container">
                    <FontAwesomeIcon 
                        icon={faSignOutAlt} 
                        className="logout-icon"
                        onClick={handleLogout}
                    />
                </div>
            </nav>
            <div className="admin-content">
                {view === 'details' && (
                    <div>
                        <h2>User Details</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Last Login Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{new Date(user.lastLoginDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>Total User Count: {totalClicks}</p>
                    </div>
                )}
                {view === 'graph' && (
                    <div>
                        <h2>User Count per Month</h2>
                        <Bar data={graphData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
