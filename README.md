# SignalR-ReactNativeClient
An simple chat client using Microsoft's SignalR Javascript client framework.

<img src="https://github.com/jonathanzufi/SignalR-ReactNativeClient/blob/master/assets/ios_preview.png">

This is a simple SignalR chat client designed to work with a SignalR hub hosted on the open web. It uses Microsoft's `@microsoft\signalr` library to communicate to a live SignalR hub.

This work was inspired by the sample server app provided by Microsoft's example chat client at https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-3.1&tabs=visual-studio 

For background, please see https://medium.com/<url>  
  
  ## Stack used

* macOS Cataline 10.15.15
* React Native CLI 4.10.0
* Microsoft SignalR JS library 3.1.5
* Visual Studio Code
* ESLint
* 40 open tabs at Stack Overflow
  
## Setup
This setup assumes you have the React Native CLI installed. 

After pulling down the repo, run `yarn install` to pull down all dependencies listed in the package.json file including Microsoft's SignalR library:
```
yarn install
```

Once this is complete, navigate to the \ios folder to install Cocoapods dependencies:
```
cd ios
pod install
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

