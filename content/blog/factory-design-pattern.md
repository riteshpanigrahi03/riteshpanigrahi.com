---
title: Factory Design Pattern
date: '2024-01-07T10:30:09.337Z'
slug: factory-design-pattern
tags:
  - System Design
  - design patterns
coverImage: /images/blog/factory-design-pattern/cover.png
series: Design Patterns Series
seriesOrder: 2
---

Hi Everyone, in the last article we understood what is [Singleton Design pattern](https://riteshpanigrahi.com/singleton-design-pattern) and the different ways we can implement it in Java, this article is all about the Factory Design pattern.

We will understand what exactly is Factory Pattern, its use, and a couple of ways of implementing it.

## What is Factory Pattern?

A Factory Pattern or Factory Method Pattern says that just **define an interface or abstract class for creating an object but let the subclasses decide which class to instantiate.**

I know most of us cannot understand anything by the above definition, so let's first take an example and then we will come back and break down the definition again.

Suppose there is a client application that will provide us the shape to be drawn and our application will draw that shape.  
Currently, there are only 2 shapes available - Circle and Square.

This can be done by using basic OOP principles.

1. We will create an interface/abstract class Shape
    
2. Create concrete class Circle and Square using the above interface
    
3. Ask the client for the shape to be drawn and return its object.
    

Let us first implement this much and discuss what is the issue with this approach

Shape Interface

```java
public interface Shape {
    void draw();
}
```

Circle Class

```java
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing Circle!");
    }
}
```

Square Class

```java
public class Sqaure implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing Square!");
    }
}
```

Client code without Factory pattern

```java
public class WithoutFactoryClient {
    public static void main(String[] args) {
        String shape;
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the shape to be created:");
        shape = scanner.nextLine();

        if (shape.equalsIgnoreCase("Circle")) {
            new Circle().draw();
        } else if (shape.equalsIgnoreCase("Square")) {
            new Sqaure().draw();
        }

    }
}
```

Here, we take the input from the client and accordingly create the object as per the input.

Problem with this approach - If we add a new shape, we would need to tell the client to update this code by adding an if-else block and create an object using the `new` keyword.

This will be a bad experience for the client, what if we abstract the object creation process from the client code itself? Here, comes the Factory Design Pattern for the rescue

## Simple Factory Pattern

So, now we will need to create a Factory class that will handle object creation for different shapes as per our above example.  
Consider, Factory class as a Chef in a restaurant, where we as Clients ask for any item and trust the chef to make it for us.

[![No alt text provided for this image](https://media.licdn.com/dms/image/D4D12AQHuJZ3g7V6Bsg/article-inline_image-shrink_1500_2232/0/1692170448742?e=1709769600&v=beta&t=SvwC68keXR7HMs9Z3q_ZnC7nFyDCIpxe0OGQ0DRTbC4 align="center")](https://www.tutorialspoint.com/design_pattern/factory_pattern.htm)

`Shape` Factory

```java
public class ShapeFactory {
    public static Shape createShape(String shapeType) {
        if (shapeType.equals("Circle")) {
            return new Circle();
        } else if (shapeType.equals("Square")) {
            return new Sqaure();
        } else {
            throw new IllegalArgumentException("Shape not supported!");
        }
    }
}
```

So, here we shifted the logic of object creation from client code to Factory class. This has a static method `createShape()` that takes `shapeType` as input which is called by the Client code and accordingly creates the object.

`Client` code

```java
public class SimpleFactoryPatternClient {
    public static void main(String[] args) {
        Shape circle = ShapeFactory.createShape("Circle");
        circle.draw();

        Shape square = ShapeFactory.createShape("Square");
        square.draw();
    }
}
```

So in this way, we have abstracted the logic of object creation from the client.

If in the future, we need to add any new shape (say Triangle), we can create a concrete class and update our Factory class for the new shape.

```java
class Triangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Triangle");
    }
}

class ShapeFactory {
    public static Shape createShape(String shapeType) {
        if ("Circle".equalsIgnoreCase(shapeType)) {
            return new Circle();
        } else if ("Square".equalsIgnoreCase(shapeType)) {
            return new Square();
        } else if ("Triangle".equalsIgnoreCase(shapeType)) {
            return new Triangle();
        } else {
            throw new IllegalArgumentException("Invalid shape type");
        }
    }
}
```

This approach is still better where in our initial scenario(without the factory) we were updating client code to add new objects, but this also has some issues.  
We are updating the Factory class every time we add a new object, which violates the Open-Closed principle.

To resolve this, we will understand the second way of implementing the Factory pattern where you will also understand the definition of this pattern which we discussed earlier in this article.

## Factory Method Pattern

In the Simple Factory, the object creation logic is centralized in one class. But the factory method pattern delegates the object creation to the subclasses of the factory.

We will start by creating an interface for `ShapeFactory`

```java
public interface ShapeFactory {
    Shape createShape();
}
```

Create subclasses for the factory, CircleFactory and SquareFactory

```java
public class CircleFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Circle();
    }
}
```

```java
public class SquareFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Sqaure();
    }
}
```

Here, we can see how the object creation logic is delegated to the respective subclasses of ShapeFactory

Now, if we want to add a new shape, for example, a Triangle, you would do the following without updating existing code:

```java
class Triangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing Triangle!");
    }
}

class TriangleFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Triangle();
    }
}
```

Client's code

```java
public class FactoryMethodPatternClient {
    public static void main(String[] args) {
        ShapeFactory circleFactory = new CircleFactory();
        Shape circle = circleFactory.createShape();
        circle.draw();

        ShapeFactory squareFactory = new SquareFactory();
        Shape square = squareFactory.createShape();
        square.draw();
    }
}
```

Breakdown the Definition

Now that we understand the Factory Pattern let's go back to the definition and understand it

A Factory Pattern or Factory Method Pattern says that just **define an interface or abstract class for creating an object but let the subclasses decide which class to instantiate.**

1. just define an interface or abstract class for creating an object - ShapeFactory interface in our case
    
2. let the subclasses decide which class to instantiate - CircleFactory, SquareFactory, etc
    

## Which one to use Simple Factory or Factory Method?

Before concluding on this, let us first summarize the pros and cons for each type

### Pros and Cons of Simple Factory

**Pros:**

* **Simplicity:** The Simple Factory is straightforward to implement.
    
* **Centralized Control:** Creation logic is centralized in one class.
    

**Cons:**

* **Less Extensibility:** Adding a new shape requires modifying the existing factory class, violating the Open-Closed Principle.
    

### Pros and Cons of the Factory Method

**Pros:**

* **Extensibility:** Adding a new shape involves creating a new factory class, adhering to the Open-Closed Principle.
    
* **Separation of Concerns:** Object creation logic is encapsulated in subclasses.
    

**Cons:**

* **Increased Complexity:** The Factory Method introduces more classes, which might be overkill for simple scenarios.
    
* **More Code Overhead:** Creating a new factory class for each shape might be redundant in some cases.
    

The choice between the Simple Factory and Factory Method patterns depends on the project's requirements and complexity.

* **Simple Factory:** Opt for its simplicity in scenarios where the object creation logic is unlikely to change frequently, and extensibility is not a primary concern.
    
* **Factory Method:** Choose the Factory Method when flexibility and extensibility are crucial.
    

## Conclusion

In this article, we explored the Factory Design Pattern using the example of creating shapes. We implemented both the Simple Factory and Factory Method patterns, comparing their pros and cons.

Based on your project's requirements we can use any of the above patterns, both patterns contribute to writing more modular and adaptable code.

If you found this article helpful, do give it a like and share it with your friends.

Any feedback? Please, put them in the comments.

We will meet in the next one for the Abstract factory design pattern.  
Till then, Happy Learning!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/factory)

References:

1. [https://refactoring.guru/design-patterns/factory-method](https://refactoring.guru/design-patterns/factory-method)
    
2. [https://www.javatpoint.com/factory-method-design-pattern](https://www.javatpoint.com/factory-method-design-pattern)
    
3. [https://www.youtube.com/watch?v=tv54FY48Vio](https://www.youtube.com/watch?v=tv54FY48Vio)
    
4. [https://www.youtube.com/watch?v=D5d1f9Lcmv4](https://www.youtube.com/watch?v=D5d1f9Lcmv4)
