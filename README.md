# SignalR-ReactNativeClient
An example project incorporating Microsoft's SignalR Javascript client framework 


[<img src="https://github.com/jonathanzufi/SignalR-ReactNativeClient/blob/master/assets/ios_preview.png">]

## Setup
Before attempting to run this demo please make sure that you have taken care of the following dependencies

Ensure that you have [node](https://nodejs.org/en/download/) installed and then use npm to install react native as described below

### Installing node
The simplest way to get started is to install [homebrew](https://brew.sh) on your system.
You can then install node and watchman with the following commands
```
brew install node
brew install watchman
```

### Installing React-Native Command Line Interface
You may install react-native with the following npm command
```
npm install -g react-native-cli
```
once this is complete, navigate to this projects folder and type 
```
npm install
``` 
to install all dependencies listed in the project's package.json file

### Configuring the environments for iOS and Android

__iOS (XCode)__

Navigate to project ios subfolder and run
```
pod install
```
to install the latest iOS MotionDNA SDK

__Android (Android Studio)__

Open the Android project folder in Android Studio
Aside from instant run, install any recommended dependencies and build tools that are suggested


## Running the demos
The hello world project is designed to work with both ios and android systems. It will run on the simulator or the actual device.

You can start streaming the app to your device with the following commands

__For iOS__

```
react-native run-ios
```
For iOS you will probably want to have the simulator open already as XCode 9 does not start the simulator automatically with this command

__For Android__

```
react-native run-android
```
Be sure you have the android platform-tools in your PATH environment variable so that react can access tools like adb to run your app. You may need to setup a virtual device first if you wish to use the simulator.

You may also run either app by using the standard build and run tools in each platforms respective IDE


## Common issues
The following are commonly found issues and what can be done to fix them

__For iOS__

# Double Conversion
This is a common issue seen when building the ios app in xcode and the following commands fix it.
Starting from the base react-native app folder
```
cd node_modules/react-native/third-party/glog-0.3.x/
./configure
make
make install
```
clean and rebuild the project

# No member named '__rip'
This usually follows the double conversion error and can be solved with the following commands.
Starting from the base react-native app folder
```
cd node_modules/react-native/third-party/glog-0.3.x/src/
```
Now using your code editor of choice open the 'config.h' file.
Replace the line ```#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip``` near line number 156 with
```
#undef HAVE_UCONTEXT_H
#undef PC_FROM_UCONTEXT
#if defined(__x86_64__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
#elif defined(__i386__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__eip
#endif
```
clean and rebuild the project

if you have any questions please feel free to reach out to jonathanzufi@gmail.com
