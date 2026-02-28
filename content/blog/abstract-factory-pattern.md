---
title: "Abstract Factory Pattern"
date: "2024-01-11T15:14:23.340Z"
slug: "abstract-factory-pattern"
tags: ["System Design", "design patterns"]
coverImage: "/images/blog/abstract-factory-pattern/cover.png"
---

Hi Everyone, in the last two articles we learned about [Singleton](https://riteshpanigrahi.com/singleton-design-pattern) and [Factory](https://riteshpanigrahi.com/factory-design-pattern) Pattern. In this one, we will understand another creational design pattern which is the Abstract Factory Design Pattern.

## What is an Abstract Design Pattern?

The Abstract Factory pattern is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes.

I know the above definition is difficult to understand at first, let's go through the below example and come back on this later

Imagine you run a furniture-making industry. Initially, you only produce Chairs of three different types – a single product (Chair). In such cases, the Factory Design Pattern is handy, especially when you have one product with various variations. (Remember the [previous article](https://riteshpanigrahi.com/factory-design-pattern) where we used the Factory pattern for a single product, Shape, with types like Circle and Square.)

[![](/images/blog/abstract-factory-pattern/image01.png)](https://refactoring.guru/design-patterns/abstract-factory)

Now, let's say your production expands to include Tables and Sofas, introducing more items to your catalog. This is where the Abstract Factory Pattern comes into play; it helps create families of related products (Chair, Table, Sofa).

While you might hear that 'Abstract Factory is a Factory of factories,' don't get confused, it simply means that Abstract Factory provides a way to create sets of related objects without worrying about specific classes.

In the Factory pattern, we used the Factory class to get the object, whereas, in the Abstract Factory pattern, we use the abstract factory class to obtain the correct Factory based on certain conditions. This factory then gives us the specific object we need.

I hope this analogy is clear. If you still have any doubts, they should be cleared once we implement the example below.

## Implementation

Let's design a software application with different themes: Light and Dark. Each theme has its own set of UI elements, specifically buttons and text fields.

Our goal is to create an abstract factory that defines interfaces for creating buttons and text fields. Concrete factories will then implement these interfaces to produce actual UI elements for each theme.

For instance, if you choose the Light theme, the abstract factory will create Light-themed buttons and text fields. If you switch to the Dark theme, the factory will generate Dark-themed UI elements.

1. Create abstract product interfaces for Button and TextField
    
    ```java
    public interface Button {
        void display();
    }
    ```
    
    ```java
    public interface TextField {
        void display();
    }
    ```
    
2. Now we will implement the above interfaces and create concrete classes for Buttons and TextField for each Theme(light and dark)
    
    ```java
    public class DarkButton implements Button {
        @Override
        public void display() {
            System.out.println("Displayed DarkButton!");
        }
    }
    ```
    
    ```java
    public class LightButton implements Button {
        @Override
        public void display() {
            System.out.println("Displayed LightButton!");
        }
    }
    ```
    
    ```java
    public class DarkTextField implements TextField {
        @Override
        public void display() {
            System.out.println("Displayed DarkTextField!");
        }
    }
    ```
    
    ```java
    public class LightTextField implements TextField {
        @Override
        public void display() {
            System.out.println("Displayed LightTextField!");
        }
    }
    ```
    
3. Now our products are ready, let us create an Abstract Factory Class
    
    ```java
    //Abstract Factory
    public abstract class GUIFactory {
        public abstract Button createButton();
        public abstract TextField createTextField();
        public static GUIFactory getFactory(String theme) {
            switch (theme) {
                case "Light":
                    return new LightGUIFactory();
                case "Dark":
                    return new DarkGUIFactory();
                default:
                    break;
            }
            return null;
        }
    }
    ```
    
    We have created an Abstract class - GUIFactory, it has two abstract methods `createButton()` and `createTextField()` . Along with this, we have a getFactory() method, that returns the Concrete Factory class based on the theme.
    
4. Create concrete factory classes
    
    ```java
    public class DarkGUIFactory extends GUIFactory {
        @Override
        public Button createButton() {
            return new DarkButton();
        }
    
        @Override
        public TextField createTextField() {
            return new DarkTextField();
        }
    }
    ```
    
    ```java
    public class LightGUIFactory extends GUIFactory {
        @Override
        public Button createButton() {
            return new LightButton();
        }
    
        @Override
        public TextField createTextField() {
            return new LightTextField();
        }
    }
    ```
    
5. Client code using the Abstract Factory
    
    ```java
    public class AbstractFactoryClient {
        public static void main(String[] args) {
            GUIFactory guiFactory = GUIFactory.getFactory("Dark");
            Button button = guiFactory.createButton();
            TextField textField = guiFactory.createTextField();
            button.display();;
            textField.display();
        }
    }
    ```
    
    ```java
    Displayed DarkButton!
    Displayed DarkTextField!
    ```
    
    If we carefully understand the client code, based on the given theme we are getting the concrete factory object using the `getFactory("Dark")` method.
    
    Nowhere are we using the concrete factory or the concrete product classes, this demonstrates how the Abstract Factory pattern enables the creation of families of related objects based on the chosen theme using the interfaces without specifying their concrete classes.
    

## Structure

![Abstract Factory design pattern](/images/blog/abstract-factory-pattern/image02.png)

## Conclusion

So, in this article, we covered Abstract Design Pattern and their differences between Factory Design Pattern, if this was helpful do give it a like and share it among your friends.

Any feedback? Please mention them in the comments.

Until we meet again, happy learning!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/abstractfactory)

Reference

1. [https://refactoring.guru/design-patterns/abstract-factory](https://refactoring.guru/design-patterns/abstract-factory)