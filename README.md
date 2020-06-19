# SignalR-ReactNativeClient
A simple chat client using Microsoft's SignalR Javascript client framework, designed to work with a SignalR hub hosted on the open web. It uses Microsoft's `@microsoft\signalr` package to communicate to a live SignalR hub currently hosted at https://signalrdemo.com

<p align="center">
  <img width="300" height="559" src="https://github.com/jonathanzufi/SignalR-ReactNativeClient/blob/master/assets/ios_preview.png">
</p>

This work was inspired by Microsoft's example chat client at https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-3.1&tabs=visual-studio 
  
  
  ## Stack used

* macOS Cataline 10.15.15
* React Native CLI 4.10.0
* Microsoft SignalR JS library 3.1.5
* Visual Studio Code
* ESLint
* 40 open tabs at Stack Overflow
  
## Setup
This setup assumes you have the React Native CLI installed. If you prefer Expo, use `expo init` with the Expo CLI to make a new project, and then copy over all the JavaScript source code from this project, and then `yarn install` the dependencies.

After pulling down the repo, run `yarn install` to pull down all dependencies listed in the package.json file including Microsoft's SignalR library:
```
yarn install
```

Once this is complete, navigate to the \ios folder to install Cocoapods dependencies:
```
cd ios && pod install
``` 

## Running the demo

The project is designed to work with both iOS and Android systems but I've only tested it on iOS. It should run on the simulator or the actual device.


__iOS__

```
react-native run-ios
```


__Android__

```
react-native run-android
```
Be sure you have the android platform-tools in your PATH environment variable so that react can access tools like adb to run your app. You may need to setup a virtual device first if you wish to use the simulator.

You may also run either app by using the standard build and run tools in each platforms respective IDE.

## Overview

The app is pretty simple - it uses a `useEffect` React hook to initialize a SignalR connection object and then creates and tries to start a connection to our SignalR hub. It also sets up some event handlers to handle disconnects, reconnects and how to handle any incoming messages. I use a state object called `messageLog` to house all incoming messages and a FlatList to render them. The **HubConnectionBuilder** object is initialized with a logging level of `LogLevel.Debug` which is really helpful in terms of understanding what SignalR is going in the background. 

The app also tries to gracefully server side disconnects - you can see below when I stop the ASP.NET service that the app reflects a disconnected state and allows manual reconnection. My code is primitive - see [here](https://medium.com/r/?url=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Faspnet%2Fsignalr%2Foverview%2Fguide-to-the-api%2Fhandling-connection-lifetime-events) for a deep dive discussion about connection events and how SignalR works under the covers when a connection is interrupted or broken. An exercise for the reader would be to support automatic reconnects.


<p align="center">
  <img width="1153" src="https://github.com/jonathanzufi/SignalR-ReactNativeClient/blob/master/assets/disconnect.gif"> 
</p>

