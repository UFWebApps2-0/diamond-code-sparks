import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export default function Notifications({ handleLogout }) {
  const options = ['Off', 'On'];
  const columns = ['Course Activities', 'Email', 'Push Notifications'];

  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='container flex flex-row nav-padding'>
      <NavBar isStudent={true} handleLogout={handleLogout} />
      <div>
        <h1>Notification Settings</h1>
        <button onClick={handleGoBack}>Go Back</button>
        <div>
          <h2 style={{ fontWeight: 'bold' }}>Settings for</h2>
          <select>
            <option value="activity1">Activity 1</option>
            <option value="activity2">Activity 2</option>
          </select>
          <table style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} style={{ fontWeight: 'bold', textAlign: index > 0 ? 'right' : 'left' }}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Due Date</td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Course Content</td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Grading</td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Past Due</td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Upcoming</td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}