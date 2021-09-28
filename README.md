# Coffee Shop Application

## Introduction

This was an app developed as part of my BSc Computer Science degree, in my final year module: "Mobile Applications Development".
The aim was to connect with a provided backend & produce an app where users could find and review coffee shops. The user can do the following:
- Sign up and login to their account
- View information about coffee shops
- Add shops to their favourites
- Write reviews for a coffee shop, including a photo if they wish

Things I learned through building this project:
- General UI / UX as I had to consider how well the app responded to different usecases e.g. errors from the backend
- Building a React Native app from scratch, using functional components & hooks (my course taught React Native using class based components, however I already knew functional, so it made sense to me to use this instead)

**Note:** Since finishing university, I cannot access the server used to build the app so can't get any screenshots to show! If you'd like to see a video demo of the product, please let me know. Otherwise, the code is available to browse on its own.

## Setup

This project uses **Yarn**

### Commands to start:

Each command below should be executed in two separate terminals. The first command will get the Metro Bundler running, whilst the second command will run the Android emulator.

```
yarn start

yarn android
```

If for some reason the above commands fail, try the following:

```
npx react-native start

npx react-native run-android
```
