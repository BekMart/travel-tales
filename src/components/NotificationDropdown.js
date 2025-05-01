import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../api/axios";
import styles from "../styles/NotificationsDropdown.module.css";

function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAllNotifications = async () => {
      let allNotifications = [];
      let nextUrl = "/notifications/unread/";

      try {
        while (nextUrl) {
          const { data } = await api.get(nextUrl);
          allNotifications = [...allNotifications, ...data.results];
          nextUrl = data.next?.replace(
            "https://travel-api-ca880bcd8809.herokuapp.com",
            ""
          );
        }
        setNotifications(allNotifications);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };
    fetchAllNotifications();
  }, []);

  const handleNotificationClick = async (notification, redirectUrl) => {
    try {
      await api.put(`/notifications/${notification.id}/mark-read/`);
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      history.push(redirectUrl);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put("/notifications/mark-all-read/");
      setNotifications([]);
    } catch (err) {
      console.error("Error marking all as read", err);
    }
  };

  return (
    <Dropdown align="center">
      <Dropdown.Toggle
        className={styles.NotificationToggle}
        id="notification-dropdown"
      >
        <div className={styles.IconWrapper}>
          <i className="fa fa-bell" />
          {notifications.length > 0 && (
            <span className={styles.NotificationCount}>
              {notifications.length}
            </span>
          )}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.Menu}>
        {notifications.length === 0 ? (
          <Dropdown.Item disabled>No Notifications</Dropdown.Item>
        ) : (
          <>
            {notifications.map((notification) => {
              const config = {
                like: {
                  icon: <i className="fa-solid fa-heart fa-fw" />,
                  getUrl: (n) => `/posts/${n.post}`,
                },
                comment: {
                  icon: <i className="fa-solid fa-comment fa-fw" />,
                  getUrl: (n) => `/posts/${n.post}`,
                },
                follow: {
                  icon: <i className="fa-solid fa-user fa-fw" />,
                  getUrl: (n) => `/profiles/${n.from_user_profile_id}`,
                },
              };

              const type = notification.notification_type;
              const { icon, getUrl } = config[type] || {
                icon: <i className="fa-solid fa-bell" />,
                getUrl: () => "/",
              };

              const redirectUrl = getUrl(notification);

              return (
                <Dropdown.Item
                  className={styles.NotificationItem}
                  key={notification.id}
                  onClick={() =>
                    handleNotificationClick(notification, redirectUrl)
                  }
                >
                  <span className={styles.NotificationIcon}>{icon}</span>
                  <strong>{notification.from_user}</strong>
                </Dropdown.Item>
              );
            })}
            <hr className="my-1" />
            <Dropdown.Item
              className={`${styles.NotificationItem} fw-bold text-center`}
              onClick={handleMarkAllRead}
            >
              <strong>Mark all read</strong>
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NotificationsDropdown;
