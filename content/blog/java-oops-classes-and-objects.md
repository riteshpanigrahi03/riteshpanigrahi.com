---
title: "Java OOPS - Introduction & Classes and Objects"
date: "2022-01-01T03:09:08.756Z"
slug: "java-oops-classes-and-objects"
tags: ["Java", "OOPS", "Object Oriented Programming"]
coverImage: "/images/blog/java-oops-classes-and-objects/cover.png"
---

Hi all, Welcome to the Object Oriented Programming(OOPs) series in Java.<br/>
In this series, we will cover all the concepts in OOPS.
The order in which we will cover topics will be:-<br/>
1. Classes and Objects (covered in this article)
2.  [Data Hiding and Abstraction](https://riteshpanigrahi.hashnode.dev/java-oops-data-hiding-and-abstraction) 
3.  [Encapsulation](https://riteshpanigrahi.hashnode.dev/java-oops-encapsulation) 
4.  [Inheritance](https://riteshpanigrahi.hashnode.dev/java-oops-inheritance) 
5. Polymorphism<br/>
    a.  [Method Signature](https://riteshpanigrahi.hashnode.dev/java-oops-polymorphism-part-1) <br/>
    b.  [Method Overloading](https://riteshpanigrahi.hashnode.dev/java-oops-polymorphism-method-overloading)  ( Compile-time polymorphism)<br/>
    c. Method Overriding ( Runtime polymorphism)<br/>

## Java Classes and Objects<br/>
As we know Java is an OOP language, everything in java is associated with classes and objects.<br/>
Most of you might already be aware of what classes and objects are in Java. So without getting deep into it let us get a quick overview of each. <br/>
### Objects in Java<br/>
If we look around us we can find many objects like cars, dogs, etc.<br/>
If we see a dog, it has attributes like color, breed, name, and behaviors like- barking, running, etc.<br/>
Similarly, software objects have attributes and behaviors. Software Object attributes are stored in variables and behaviors in methods.<br/>
We will see how to create objects in java after looking into classes<br/>

### Classes in Java
Class is a blueprint or prototype of a real-world object.<br/> Using classes we can create objects. It represents the set of properties or methods that are common to all objects of one type.<br/>

```
class Dog{
    //attributes -> variables
    String breed;
    String name;
    String color;

    public Dog(String breed, String name, String color) {
        this.breed = breed;
        this.name = name;
        this.color = color;
    }
    //behaviors -> methods
    void barking() {
    }
    void running() {
    }
}
``` 
We have created a Dog class it has different attributes(variables) breed, color, name, and behaviors(method) barking and running.<br/>

Once we create a class that is not enough because the class is just a blueprint, we need to create an object of the class to actually use it.<br/>

To create an object we need to use the *'new*' keyword.<br/>

```
Dog d = new Dog("Bulldog","Mike","Brown");
``` 

This is it for this short article.<br/>
In the next one, we will start with Data hiding and Abstraction.<br/>
Thanks for Reading.<br/>
If any suggestions comment below.<br/>
 