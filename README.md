# Mersal Chat App

Mersal Chat App is a React Native-based mobile application that allows users to chat with each other. Users can sign in anonymously, choose a background color for their chat screen, and send images and their current location within the chat. The app uses Firebase for authentication, Firestore for database management, and Firebase Storage for storing images.

## Features

- Anonymous user authentication
- Real-time messaging with Firestore
- Image sharing via camera or photo library
- Location sharing
- Customizable chat background color
- Offline message caching

## Technologies Used

- React Native
- Firebase (Authentication, Firestore, Storage)
- Expo (for development and building)
- React Navigation
- react-native-gifted-chat
- react-native-maps
- AsyncStorage
- @react-native-community/netinfo

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Alqatrony/Mersal-ChatApp.git
   cd Mersal-ChatApp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Create a new project in [Firebase Console](https://console.firebase.google.com/).
   - Add an Android and/or iOS app to the project.
   - Copy the Firebase config from the Firebase Console and replace the `firebaseConfig` object in `App.js`.

4. **Running the app:**

   - For iOS:

     ```bash
     npx expo start --ios
     ```

   - For Android:

     ```bash
     npx expo start --android
     ```

   - Or use:

     ```bash
     npx expo start
     ```

## Firebase Configuration

Replace the Firebase configuration in `App.js` with your own configuration details:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Usage

### Starting the App

- Open the app on your device or emulator.
- Enter your username.
- Choose a background color for your chat screen.
- Press "Start Chatting" to enter the chat room.

### In the Chat Room

- Send text messages.
- Click the "+" button to:
  - Choose an image from your library.
  - Take a photo using the camera.
  - Share your current location.

### Offline Support

- Messages are cached locally and will be available even when offline.
- Once the device is back online, messages will be synchronized with Firestore.

## Project Structure

- `App.js`: Main entry point of the application. Initializes Firebase and sets up navigation.
- `components/Start.js`: Start screen component where users enter their username and choose a background color.
- `components/Chat.js`: Chat screen component where users can send messages, images, and locations.
- `components/CustomActions.js`: Custom component for handling additional actions like picking images or sharing location.

## Troubleshooting

### Error uploading image: [FirebaseError: Firebase Storage: An unknown error occurred, please check the error payload for server response. (storage/unknown)]

- Ensure your Firebase Storage rules are correctly set.
- Check the console for detailed error messages.
- Ensure network permissions are granted.
- Update dependencies to the latest versions.

## Dependencies

- React Native
- Expo
- Firebase
- React Navigation
- React Native Gifted Chat
- React Native Async Storage
- React Native Community Netinfo
- Expo Image Picker
- Expo Location
- React Native Maps
- Expo Media Library

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.