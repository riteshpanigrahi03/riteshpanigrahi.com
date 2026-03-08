---
title: A Guide to Bridge Design Pattern
date: '2024-02-13T13:29:27.815Z'
slug: bridge-design-pattern
tags:
  - design patterns
  - System Design
  - Java
  - interview
coverImage: /images/blog/bridge-design-pattern/cover.png
series: Design Patterns Series
seriesOrder: 7
---

Hi everyone, in the last article we learned about the [Adapter Design pattern](https://riteshpanigrahi.com/adapter-design-pattern), in this one we will go through another Structural Design Pattern which is the Bridge Pattern.

## What is a Bridge Pattern?

**A bridge Pattern** is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently.

Does the definition Sounds Scary? Let us understand more with an example

Suppose we have a Device Class with a couple of subclasses: TV and DVDPlayer.

![](/images/blog/bridge-design-pattern/image01.png)

Now we want to add a hierarchy to it by introducing remotes: Basic and Advanced remotes. This will lead to the creation of 4 different Classes: `BasicRemoteTv`, `AdvancedRemoteTv`, `BasicRemoteDvd`, and `AdvancedRemoteDvd`.

![](/images/blog/bridge-design-pattern/image02.png)

Adding a new device or remote type, the number of classes will grow exponentially. For example, adding a new device will need to create 2 new subclasses for each remote type and then adding a remote will need 3 more subclasses

This is a classic inheritance issue because we are trying to extend the Device class into 2 independent directions: type of device and remote

## Why should we use Bridge Pattern?

Bridge Pattern solves the problem by switching from inheritance to composition.

With the Bridge Pattern, we create separate hierarchies for devices and remotes. The speciality lies in the `Bridge`—a connector that brings them together. The `Device` class and the `Remote` class become friends, working together through composition rather than a rigid parent-child relationship.

## **How it Works:**

* We start by defining the `Device` interface, which represents the common operations for turning on and off.
    
    ```java
    public interface Device {
        void turnOn();
        void turnOff();
        void setChannel(int channel);
    }
    ```
    
* We implement device classes like `TV` and `DVDPlayer` that implements this interface, each with its unique behaviour.
    
    ```java
    public class TV implements Device {
        @Override
        public void turnOn() {
            System.out.println("TV is ON");
        }
    
        @Override
        public void turnOff() {
            System.out.println("TV is OFF");
        }
    
        @Override
        public void setChannel(int channel) {
            System.out.println("Setting TV channel to " + channel);
        }
    }
    ```
    
    ```java
    public class DVDPlayer implements Device {
        @Override
        public void turnOn() {
            System.out.println("DVD Player is ON");
        }
    
        @Override
        public void turnOff() {
            System.out.println("DVD Player is OFF");
        }
    
        @Override
        public void setChannel(int channel) {
            // DVD player does not have channels
            System.out.println("DVD Player does not have channels");
        }
    
        public void play() {
            System.out.println("DVD Player is playing");
        }
    
        public void pause() {
            System.out.println("DVDPlayer Player is Paused");
        }
    }
    ```
    
* Next, we create the `Remote` class, our abstraction, which contains a reference to a `Device` (the Bridge).
    
    ```java
    public abstract class RemoteControl {
        protected Device device;
    
        protected RemoteControl(Device device) {
            this.device = device;
        }
    
        public abstract void powerOn();
        public abstract void powerOff();
        public abstract void setChannel(int channel);
    }
    ```
    
* We then have concrete implementations of the `Remote` class – `BasicRemote` and `AdvancedRemote`
    
    ```java
    public class BasicRemoteControl extends RemoteControl{
        public BasicRemoteControl(Device device) {
            super(device);
        }
    
        @Override
        public void powerOn() {
            device.turnOn();
        }
    
        @Override
        public void powerOff() {
            device.turnOff();
        }
    
        @Override
        public void setChannel(int channel) {
            device.setChannel(channel);
        }
    }
    ```
    
    ```java
    public class AdvancedRemoteControl extends RemoteControl {
        public AdvancedRemoteControl(Device device) {
            super(device);
        }
    
        @Override
        public void powerOn() {
            device.turnOn();
        }
    
        @Override
        public void powerOff() {
            device.turnOff();
        }
    
        @Override
        public void setChannel(int channel) {
            device.setChannel(channel);
        }
    
        public void play() {
            if (device instanceof DVDPlayer) {
                ((DVDPlayer) device).play();
            } else {
                System.out.println("This functionality is only available for DVDPlayer");
            }
        }
    
        public void pause() {
            if (device instanceof DVDPlayer) {
                ((DVDPlayer) device).pause();
            } else {
                System.out.println("This functionality is only available for DVDPlayer");
            }
        }
    }
    ```
    

Now let us understand

## What is Abstraction and Implementor in the context of Bridge Design Pattern?

1. **Abstraction (**`Remote`**class):**
    
    * The abstraction is the high-level part of the system. It defines the interface that clients interact with. Here, the `Remote` class provides methods like `powerOn()` and `powerOff()`. This class is abstract because it doesn't provide the concrete implementation of these methods. Instead, it delegates the actual work to its bridge, which is the implementor.
        
2. **Implementor (**`Device`**):**
    
    * The implementor is the low-level part of the system. It provides the concrete implementation of the methods declared in the abstraction. In this example, the `Device` interface (or its implementations like `TV` and `DVDPlayer`) defines the actual behavior for turning on and off.
        
3. **Bridge:**
    
    * The `Device` instance held by the `Remote` class acts as the bridge, connecting the high-level abstraction (remote) with its low-level implementation (device).
        
    * This indicates that the `Device` interface or class is responsible for carrying out the actual work defined in the `Remote` class. When a method like `powerOn()` is called on a `Remote` object, it delegates the task to the connected `Device` object, allowing the concrete implementation in `TV` or `DVDPlayer` to execute.
        
    * `Device` is the one doing the real work, and the `Remote` is orchestrating and providing a simplified interface for clients to interact with. The bridge (Device) connects these two parts, allowing them to work together while remaining independent and flexible for future changes.
        
4. ```java
      public class BridgePatternDemo {
          public static void main(String[] args) {
              DVDPlayer dvdPlayer = new DVDPlayer();
              AdvancedRemoteControl advancedRemoteControl = new AdvancedRemoteControl(dvdPlayer);
              advancedRemoteControl.powerOn();
              advancedRemoteControl.play();
              advancedRemoteControl.powerOff();
              
              TV tv = new TV();
              advancedRemoteControl = new AdvancedRemoteControl(tv);
              advancedRemoteControl.powerOn();
              advancedRemoteControl.play();
          }
      }
    ```
    
    * An instance of `DVDPlayer` is created, and an `AdvancedRemoteControl` is instantiated with the DVDPlayer.
        
    * The `powerOn()` method of the `AdvancedRemoteControl` is called, which, in turn, calls the `turnOn()` method of the associated `DVDPlayer`.
        
    * The `play()` method of the `AdvancedRemoteControl` is called, which, in turn, calls the `play()` method of the associated `DVDPlayer`. Note that `play()` is an additional method specific to the `DVDPlayer` class.
        
    * The `powerOff()` method of the `AdvancedRemoteControl` is called, which calls the `turnOff()` method of the associated `DVDPlayer`.
        
    * An instance of `TV` is created, and the `AdvancedRemoteControl` is reused with the TV.
        
    * The `powerOn()` method of the `AdvancedRemoteControl` is called, which calls the `turnOn()` method of the associated `TV`.
        
    * The `play()` method of the `AdvancedRemoteControl` is called, which, in this case, does nothing since the `TV` class doesn't have a `play()` method. The method is called for illustration purposes.
        
    * ```java
            OUTPUT
            DVD Player is ON
            DVD Player is playing
            DVD Player is OFF
            TV is ON
            This functionality is only available for DVDPlayer
        ```
        
    * This code demonstrates the flexibility of the Bridge Pattern. The `AdvancedRemoteControl` class can be associated with different devices (DVDPlayer, TV) without modifying its code, providing a way to control devices independently of their specific implementations.
        
    

If you find this helpful, do give it a like and share it with your peers.

Till then, happy coding!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/bridge)
