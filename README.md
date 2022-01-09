To build a chat app for mobile devices using React Native. The app willprovide users with a chat interface and options to share images and their location.

To test and use the app, follow the steps below. 

** Install Prerequisites **

Expo npm install expo-cli --global
ImagePicker expo install expo-image-picker
Location expo install expo-location
Native Maps expo install react-native-maps

** Install Dependencies **
Navigate to root folder of project in terminal
Run npm install

** Run app ** 
While on the root folder
Open the terminal and run npm start

Key Features
- A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline.


Technical Requirements
- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.