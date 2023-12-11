import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import './Notifications.less';

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
    <div className='notifications-container'>
      <NavBar isStudent={true} handleLogout={handleLogout} />
      <div>
        <h1 className='notifications-header'>Notification Settings</h1>
        <button className='button' onClick={handleGoBack}>Go Back</button>
        <div>
          <h2 className='notifications-header'>Settings for</h2>
          <select>
            <option value="activity1">Activity 1</option>
            <option value="activity2">Activity 2</option>
          </select>
          <table className='notifications-table'>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className={`notifications-table-header ${index > 0 ? 'notifications-table-cell' : ''}`}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='notifications-table-cell'>Due Date</td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='notifications-table-cell'>Course Content</td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='notifications-table-cell'>Grading</td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='notifications-table-cell'>Past Due</td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='notifications-table-cell'>Upcoming</td>
                <td className='notifications-table-cell-right'>
                  <select defaultValue="off">
                    {options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </td>
                <td className='notifications-table-cell-right'>
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