# 💌 Streak Reminder Push Notification System

Welcome! This document will guide you through our **Streak Reminder Push Notification System**. The goal of this system is to keep users engaged by alerting them when they are at risk of losing their activity streak (think of it as a gentle nudge to stay active, especially if they haven't engaged in the last 24 hours). We're using **Google Cloud Platform (GCP)** and **Firebase** to create a reliable and scalable solution.

## 1. How It Works

### Overview
Our system is designed to send push notifications based on how users are doing with their activity streaks. If someone is at risk of losing their streak, they’ll receive a friendly reminder. ⏰

### Streak Status Logic
Here’s how we determine the status of a user’s streak:
- **Activity Tracking:** We keep an eye on user activities stored in our database, noting the time of each activity. 📅
- **Streak Calculation:** We calculate the current streak length based on user activity:
  - **COMPLETED:** The user has completed at least one activity for the day. ✅
  - **AT_RISK:** If the last activity was more than 24 hours ago but less than 48 hours ago, they’re at risk. ⚠️
  - **INCOMPLETE:** If no activities are recorded for the current day, it’s considered incomplete. ❌
- **Notification Trigger:** 
  - We schedule a push notification to be sent 24 hours after the last recorded activity if the user is at risk of losing their streak. 📲

## 2. Tech Stack We’re Using

- **Frontend:**
  - **React:** This is what we use to build the user interface where users can see their streak status. 🎨
  - **Firebase Cloud Messaging (FCM):** This handles the push notifications right in the web app. 📬

- **Backend:**
  - **NestJS:** This is the framework we use to create the RESTful API that manages user activities and streak calculations. 🛠️
  - **Firebase Firestore:** We use this to store user activity data and track streak information. 📊
  - **Google Cloud Functions:** These help us run scheduled tasks for sending out notifications. ☁️

- **Deployment:**
  - **Google Cloud Platform (GCP):** This is where we host our backend services and manage cloud functions. 🌐

## 3. Key Considerations for Implementation

### Architecture Decisions
- **Firestore for Data Storage:** We chose Firestore for its real-time data synchronization and easy querying of user activities. 🔄
- **Cloud Functions for Scheduling:** Google Cloud Functions are perfect for running scheduled tasks that check user activity and send notifications. ⏱️
- **FCM for Notifications:** Firebase Cloud Messaging allows us to send push notifications efficiently. 🚀

### Edge Cases to Keep in Mind
- **User Inactivity:** We need to handle situations where users might not have any recorded activity for a while. ⏳
- **Multiple Devices:** Notifications should reach all devices linked to a user’s account. 📱💻
- **User Preferences:** It’s important to give users the option to opt-in or out of notifications. ⚙️
- **Network Issues:** We’ll implement retry logic to ensure notifications go through, even if there are temporary network hiccups. 🌩️

### Testing and Monitoring
- **Unit Tests:** We’ll write unit tests for the backend logic to ensure everything works as expected when calculating streaks and sending notifications. 🧪
- **Monitoring:** Using GCP monitoring tools, we’ll keep track of how well our cloud functions are performing and how successful our notifications are. 📈

By following this guide, we aim to create a robust streak reminder push notification system that not only enhances user engagement but also helps users maintain their activity streaks effectively. 🎉
