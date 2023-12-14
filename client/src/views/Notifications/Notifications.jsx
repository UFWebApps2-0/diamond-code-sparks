import React, { useEffect, useState, useContext } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../../SettingsContext';
import './Notifications.less';

export default function Notifications({ handleLogout }) {
  const options = ['Off', 'Daily', 'Weekly'];
  const columns = ['Course Activities', 'In-App', 'Email'];

  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (event, setting) => {
    const newSettings = {
      ...settings,
      [setting]: event.target.value,
    };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));

    if (setting === 'upcoming' && event.target.value !== 'off') {
      const notifications = [
        'Upcoming assignment: Sun and Ocean Relationship: Activity 1',
        'Upcoming assignment: Sun and Ocean Relationship: Activity 2',
        'Upcoming assignment: Sun and Ocean Relationship: Activity 3',
      ];
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='notifications-container'>
      <NavBar isStudent={true} handleLogout={handleLogout} />
      <div className='header-container'>
        <h1 className='notifications-header'>Notification Settings</h1>
        <button className='button' onClick={handleGoBack}>Go Back</button>
        <div>
          <h2 className='notifications-header'>Settings for</h2>
          <select>
            <option value="activity1">Activity 1</option>
            <option value="activity2">Activity 2</option>
          </select>
        </div>
      </div>
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
            <td className='notifications-table-cell'>Past Due</td>
            <td className='notifications-table-cell-right'>
              <select value={settings.pastDue} onChange={(event) => handleSettingChange(event, 'pastDue')}>
                {options.map(option => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            </td>
            <td className='notifications-table-cell-right'>
              <select value={settings.pastDue}>
                {options.map(option => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className='notifications-table-cell'>Upcoming</td>
            <td className='notifications-table-cell-right'>
              <select value={settings.upcoming} onChange={(event) => handleSettingChange(event, 'upcoming')}>
                {options.map(option => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            </td>
            <td className='notifications-table-cell-right'>
              <select value="off">
                {options.map(option => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}