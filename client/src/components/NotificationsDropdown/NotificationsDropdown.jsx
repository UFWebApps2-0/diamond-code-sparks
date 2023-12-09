import React, { useState } from 'react';
import { Menu, Dropdown, Button, Badge, Empty } from 'antd';
import { BellOutlined } from '@ant-design/icons';

export default function NotificationDropdown() {
    const [notifications, setNotifications] = useState([
        'Notification 1',
        'Notification 2',
        'Notification 3',
        // Add more notifications here
    ]);

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
        <Dropdown overlay={notifications.length > 0 ? notificationMenu : emptyMenu} trigger={['click']} visible={dropdownVisible} onVisibleChange={handleVisibleChange} style={{ marginLeft: '20px' }}>
            <Badge count={notifications.length}>
                <span className="bell-icon">
                    <BellOutlined />
                </span>
            </Badge>
        </Dropdown>
    );
}