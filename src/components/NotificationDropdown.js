import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import api from "../api/axios";
import styles from "../styles/NotificationsDropdown.module.css";

// Create functions to manage notifications
function NotificationsDropdown() {
  // Stores fetched notifications
  const [notifications, setNotifications] = useState([]);
  // Used for navigation on interaction
  const history = useHistory();
  // Current logged-in user context
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Checks if a user is authenticated
    if (!currentUser) return;

    // Fetch all users unread notifications and list them
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
  }, [currentUser]);

  // When user clicks on notification it directs them to the associated post/profile and removes from unread list
  const handleNotificationClick = async (notification, redirectUrl) => {
    try {
      await api.put(`/notifications/${notification.id}/mark-read/`);
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      history.push(redirectUrl);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };
  
  // Handle Mark all notifications as read function
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
      {/* Dropdown toggle */}
      <Dropdown.Toggle
        className={styles.NotificationToggle}
        id="notification-dropdown"
        aria-label="Open notifications dropdown"
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

      {/* Dropdown menu */}
      <Dropdown.Menu className={styles.Menu}>
        {/* If user has no notifications */}
        {notifications.length === 0 ? (
          <Dropdown.Item disabled>No Notifications</Dropdown.Item>
        ) : (
          <>
            {notifications.map((notification) => {
              //Display for different notification types
              const config = {
                // Like
                like: {
                  icon: <i className="fa-solid fa-heart fa-fw" />,
                  getUrl: (n) => `/posts/${n.post}`,
                },
                // Comment
                comment: {
                  icon: <i className="fa-solid fa-comment fa-fw" />,
                  getUrl: (n) => `/posts/${n.post}`,
                },
                // Follow
                follow: {
                  icon: <i className="fa-solid fa-user fa-fw" />,
                  getUrl: (n) => `/profiles/${n.from_user_profile_id}`,
                },
              };

              // Gets notification type or handles unexpected default types
              const type = notification.notification_type;
              const { icon, getUrl } = config[type] || {
                icon: <i className="fa-solid fa-bell" />,
                getUrl: () => "/",
              };

              // Get destination URL for notification
              const redirectUrl = getUrl(notification);

              return (
                // Displays notification item
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
            {/* Mark all as read */}
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
