---
title: "Adapter Pattern Explained: Building Bridges in Your Codebase"
date: "2024-02-04T11:49:45.805Z"
slug: "adapter-design-pattern"
tags: ["Java", "System Design", "design patterns", "adapter design pattern"]
coverImage: "/images/blog/adapter-design-pattern/cover.png"
---

Hi Everyone, so far in the design pattern learning journey we have covered all the [5 Creational Design pattern](https://riteshpanigrahi.com/series/system-design), that helped us understand process of object creation under different situations. From this blog onwards, we will start learning all the Structural Design Patterns, kicking off with the Adapter Pattern.

## What are Structural Patterns?

Structural design patterns are like templates that help you organize and connect different parts of a software system, making it easier to build and maintain. They guide how classes or objects fit together, creating a more flexible and efficient structure.

Sounds Scary?

Imagine you're building a library with various types of books (objects/classes) and shelves (structures). Now, you want to organize it efficiently. Structural design patterns are like reusable plans or templates for arranging your library.

An analogy for a specific structural design pattern, let's say the Adapter Pattern, could be a universal bookshelf adapter. Imagine you have different types of bookshelves, but some books don't fit properly on certain shelves. The adapter pattern is like a tool that lets you adjust the shelves so that all your books can neatly fit, regardless of their original size or shape.

In essence, structural design patterns help you create a well-organized and adaptable library (software system) by providing proven ways to arrange and connect your books (objects/classes) and shelves (structures).

I hope this gave you a high-level overview of Structural Design Patterns, if its still confusing do not worry, once we start exploring different patterns it will become clearer, and you'll gain confidence.

## What is Adapter Design Pattern?

**Example 1**

Imagine you have a collection of vintage audio devices with different types of audio output ports—some with RCA connectors, some with 3.5mm jacks, and others with XLR connections. Now, you've got a modern sound system that only accepts devices with USB audio outputs.

In this scenario:

1. **Existing Audio Devices (Adaptee):** Your vintage audio devices with diverse output ports represent the existing system, each designed to work with a specific type of audio connection.
    
2. **New Sound System (Target Interface):** The modern sound system symbolizes the new environment or system that expects a USB audio connection for compatibility.
    
3. **Adapter:** The adapter in this case is like a multi-purpose audio adapter. It acts as an intermediary between your vintage audio devices and the modern sound system. The adapter has a USB connector on one end (compatible with the new system) and various input ports (RCA, 3.5mm, XLR) on the other end to accommodate the different types of audio outputs from your vintage devices.
    

In this analogy:

* **Existing Audio Devices (Adaptee):** Vintage audio devices with diverse output ports.
    
* **New Sound System (Target Interface):** Modern sound system with a USB audio input.
    
* **Adapter:** Multi-purpose audio adapter that bridges the gap between the vintage audio devices and the modern sound system, allowing them to work seamlessly together.
    

Just as the audio adapter enables your vintage devices to connect to the modern sound system without modifying the devices, the Adapter Design Pattern helps in collaboration between classes or systems with different interfaces without directly changing their code.

**Example 2**

Adapter Design Pattern is like a translator between two friends who speak different languages. Suppose you have Friend A, who only understands English, and Friend B, who speaks only French. Now, you want them to communicate.

The Adapter in this scenario is like a person who understands both languages. This person listens to what Friend A says, translates it into French for Friend B, and vice versa. So, even though Friend A and Friend B have different ways of communicating, they can interact smoothly through the help of the Adapter.

In programming, the Adapter Design Pattern works similarly. It helps two different systems or classes work together even if their interfaces (the way they talk to each other) are not initially compatible. The Adapter acts as a bridge, making sure that one system can understand and use the interface of another system without directly changing their code.

So, to sum it up, *the adapter pattern convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn’t otherwise because of incompatible interfaces.*

## Implementation

Imagine you're working on a project where you have an existing system that provides employee information in a specific format. However, the project requirements have changed, and now we need to interact with a new system that expects employee information in a different format. The challenge is that we can't modify the existing system directly, but we still need to make it compatible with the new requirements.

In our scenario:

![](/images/blog/adapter-design-pattern/image01.png)

1. **Old System/Adaptee (**`EmployeeOld`**):** Represents the existing system that provides employee information as a single string, for example, "John Doe - Developer."
    
    ```java
    public class EmployeeOld {
        public String getEmployeeInfo() {
            return "John Doe - Developer";
        }
    }
    ```
    
2. **New System/Target Interface (**`EmployeeNew`**Interface):** Represents the updated requirements, where the new system expects separate methods for getting the employee's name and designation.
    
    ```java
    public interface EmployeeNew {
        String getEmployeeName();
        String getEmployeeDesignation();
    }
    ```
    
3. **Adapter (**`EmployeeAdapter`**):** This class is the adapter that bridges the gap between the old and new employee representations. It implements the `EmployeeNew` interface and has a reference to an instance of `EmployeeOld`. The constructor takes an `EmployeeOld` object, and the `getEmployeeName()` and `getEmployeeDesignation()` methods extract the name and designation by splitting the information obtained from `EmployeeOld`.
    
    ```java
    public class EmployeeAdapter implements EmployeeNew {
        private EmployeeOld employeeOld;
    
        public EmployeeAdapter(EmployeeOld employeeOld) {
            this.employeeOld = employeeOld;
        }
    
        @Override
        public String getEmployeeName() {
            return employeeOld.getEmployeeInfo().split(" - ")[0];
        }
    
        @Override
        public String getEmployeeDesignation() {
            return employeeOld.getEmployeeInfo().split(" - ")[1];
        }
    }
    ```
    
4. **AdapterDemo Class (Client):**
    
    ```java
    public class AdapterDemo {
        public static void main(String[] args) {
            EmployeeOld employeeOld = new EmployeeOld();
            EmployeeNew employeeNew = new EmployeeAdapter(employeeOld);
            System.out.println(employeeNew.getEmployeeName());
            System.out.println(employeeNew.getEmployeeDesignation());
        }
    }
    ```
    
    In the `main` method, an instance of `EmployeeOld` is created. Then, an `EmployeeAdapter` is created by passing the `EmployeeOld` object to its constructor. Finally, the `getEmployeeName()` and `getEmployeeDesignation()` methods of the `EmployeeNew` interface are called on the `EmployeeAdapter` object to display the employee's name and designation separately.
    
    ```java
    John Doe
    Developer
    ```
    

## Conclusion

In this blog, we started our journey of understanding Structural Design Patterns, starting with a foundational pattern—the Adapter Design Pattern. We learned that structural patterns are like templates guiding the organization and connection of different parts of a software system.

The Adapter Design Pattern, is like a language translator between friends who speak different languages, acts as a bridge between two systems or classes with incompatible interfaces. It enables them to work together seamlessly without directly altering their code.

If you found this one helpful, do give it a like and share among others.

In the next one, we will understand the next Structural Design Pattern which is Bridge Design Pattern.

Till then, Happy Coding!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/adapter)