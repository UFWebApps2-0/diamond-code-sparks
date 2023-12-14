import React, { useState, useEffect, useContext } from 'react';
import { Menu, Dropdown, Button, Badge, Empty } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { SettingsContext } from '../../SettingsContext';

export default function NotificationDropdown() {
    const { settings } = useContext(SettingsContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Load notifications from localStorage when component mounts
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
        }
    }, []);
    useEffect(() => {
        // Save notifications to localStorage whenever they change
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const clearNotification = (index) => {
        setNotifications(notifications.filter((_, i) => i !== index));
    };

    const handleVisibleChange = (flag) => {
        setDropdownVisible(flag);
    };

    const notificationMenu = (
        <Menu>
            {notifications.map((note, index) => (
                <Menu.Item key={index}>
                    {note}
                    <Button type="primary" onClick={(e) => { e.preventDefault(); clearNotification(index); }}>
                        Clear
                    </Button>
                </Menu.Item>
            ))}
        </Menu>
    );
    const emptyMenu = (
        <Menu>
            <Menu.Item>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You're all caught up!" />
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={settings.upcoming !== 'off' && notifications.length > 0 ? notificationMenu : emptyMenu} trigger={['click']} visible={dropdownVisible} onVisibleChange={handleVisibleChange} style={{ marginLeft: '20px' }}>
            <Badge count={settings.upcoming !== 'off' ? notifications.length : 0}>
                <span className="bell-icon">
                    <BellOutlined />
                </span>
            </Badge>
        </Dropdown>
    );
}