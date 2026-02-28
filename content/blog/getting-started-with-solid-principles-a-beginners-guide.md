---
title: "Getting Started with SOLID Principles: A Beginner's Guide"
date: "2023-07-30T14:38:57.207Z"
slug: "getting-started-with-solid-principles-a-beginners-guide"
tags: ["design principles", "SOLID principles", "Java"]
coverImage: "/images/blog/getting-started-with-solid-principles-a-beginners-guide/cover.png"
---

## What is SOLID principle all about?

SOLID is an acronym that stands for a set of five fundamental design principles in object-oriented programming that can improve the quality of your code.

**S** - Single Responsibility Principle (SRP)

**O** - Open/Closed Principle (OCP)

**L** - Liskov Substitution Principle (LSP)

**I** - Interface Segregation Principle (ISP)

**D** - Dependency Inversion Principle (DIP)

They have been time-tested and widely adopted by experienced developers to create scalable and flexible systems.

In this beginner-friendly guide, we will go through each SOLID principle using simple explanations and practical examples, helping you to write cleaner, more maintainable software.

## 1\. Single Responsibility Principle(SRP)

SRP states that a class should have only one reason to change, meaning it should have only one responsibility or job.

Let's consider an e-commerce application where users can browse products, add items to the cart, and place orders. Following SRP, we should have separate classes for each of these responsibilities: a `ProductCatalog` class for browsing products, a `ShoppingCart` class for managing cart operations, and an `OrderProcessor` class for handling order placement. This way, if there are changes in the cart logic, it won't affect the product browsing or order processing code.

Let's understand the SRP with code examples both with and without adhering to this principle:

### Without SRP:

```java
class Order {
    private String orderId;
    private String customerName;
    private List<Item> items;

    // Methods for managing order data (e.g., getOrderId, getCustomerName, addItem, removeItem, etc.)

    public void printOrderInvoice() {
        // Code to generate and print the invoice for the order
    }

    public void sendOrderConfirmationEmail() {
        // Code to send an email to the customer confirming the order
    }
}

class Item {
    private String itemId;
    private String itemName;
    private double price;

    // Methods for managing item data (e.g., getItemId, getItemName, getPrice, etc.)
}
```

In the above non-SRP-compliant example, the `Order` class has multiple responsibilities: managing order data, printing order invoices, and sending order confirmation emails.

This violates the SRP as the class should ideally have only one reason to change, but here, changes in the order invoice printing logic or email sending logic will require modifications to the `Order` class.

### With SRP:

```java
class Order {
    private String orderId;
    private String customerName;
    private List<Item> items;

    // Methods for managing order data (e.g., getOrderId, getCustomerName, addItem, removeItem, etc.)
}

class InvoicePrinter {
    public void printOrderInvoice(Order order) {
        // Code to print the invoice for the order
    }
}

class EmailSender {
    public void sendOrderConfirmationEmail(String recipient, String orderId) {
        // Code to send an email to the customer confirming the order
    }
}

class Item {
    private String itemId;
    private String itemName;
    private double price;

    // Methods for managing item data (e.g., getItemId, getItemName, getPrice, etc.)
}
```

In this SRP-compliant example, we have extracted the responsibilities of printing order invoices and sending order confirmation emails into separate classes: `InvoicePrinter` and `EmailSender`, respectively.

The `Order` class now focuses solely on managing order data, adhering to the Single Responsibility Principle. Changes to invoice printing or email-sending logic will not affect the `Order` class, which helps better maintainability and code organisation.

## 2\. Open/Closed Principle (OCP)

OCP suggests that classes should be open for extension but closed for modification, allowing new features to be added without altering the existing code.

Let's say we have a tax calculator class (`TaxCalculator`) that calculates taxes for different states in India.

Instead of modifying the existing class every time there's a new tax calculation logic for a different state, we can create new classes for specific states, like `MaharashtraTaxCalculator` or `DelhiTaxCalculator`, which extends the base `TaxCalculator` class.

This way, the original `TaxCalculator` remains unchanged, and new tax calculation logic can be added for specific states.

Let's illustrate the Open/Closed Principle with code examples both with and without adhering to this principle:

### Without OCP:

Suppose we have a simple class `Calculator` that performs basic arithmetic operations such as addition and subtraction:

```java
class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }
}
```

Now, imagine that we need to extend the `Calculator` class to support multiplication and division operations. Without adhering to the OCP, we would directly modify the existing `Calculator` class:

```java
class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }

    public int divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return a / b;
    }
}
```

In this non-OCP example, we modified the `Calculator` class by adding the `multiply()` and `divide()` methods.

While this approach may seem simple, it violates the OCP because we have directly modified the existing class.

As a result, any changes or additions to the calculator's functionality would require modifications to the `Calculator` class, which can be a risk for introducing bugs.

### With OCP:

To adhere to the Open/Closed Principle, we would create an abstract `Operation` class or interface that defines the contract for arithmetic operations:

```java
interface Operation {
    int calculate(int a, int b);
}
```

Next, we create concrete classes for each arithmetic operation, implementing the `Operation` interface:

```java
class Addition implements Operation {
    @Override
    public int calculate(int a, int b) {
        return a + b;
    }
}

class Subtraction implements Operation {
    @Override
    public int calculate(int a, int b) {
        return a - b;
    }
}

class Multiplication implements Operation {
    @Override
    public int calculate(int a, int b) {
        return a * b;
    }
}

class Division implements Operation {
    @Override
    public int calculate(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return a / b;
    }
}
```

Finally, we modify the `Calculator` class to accept any arithmetic operation through the `Operation` interface, without modifying the `Calculator` class itself:

```java
class Calculator {
    public int calculate(Operation operation, int a, int b) {
        return operation.calculate(a, b);
    }
}
```

With OCP, the `Calculator` class is open for extension because we can add new arithmetic operations (e.g., exponentiation, square root) by creating new classes that implement the `Operation` interface, without modifying the existing `Calculator` class.

By following the Open/Closed Principle, we create more flexible and extensible code, reducing the risk of introducing bugs and promoting better software design practices.

## 3\. Liskov Substitution Principle (LSP)

LSP states that objects of a superclass should be replaceable with objects of its subclasses without breaking the system.

In other words, a subclass should behave in such a way that it can be used as a substitute for its superclass without causing any unexpected behaviours or breaking the program's functionality.

Imagine an application that handles different types of bank accounts. We have a base class called `BankAccount`, and two subclasses, `SavingsAccount` and `CurrentAccount`. According to LSP, any code that works with a `BankAccount` should work seamlessly with its subclasses. For instance, if there's a method that calculates interest for a `BankAccount`, it should work equally well with `SavingsAccount` and `CurrentAccount`.

```java
class Vehicle {
    public void start() {
        System.out.println("Vehicle is starting...");
    }
}

class Car extends Vehicle {
    @Override
    public void start() {
        System.out.println("Car is starting...");
    }
}

class Bicycle extends Vehicle {
    @Override
    public void start() {
        System.out.println("Bicycle is starting...");
    }
}
```

In this example, we have a class `Vehicle` that serves as the superclass, and `Car` and `Bicycle` are subclasses inheriting from it. Each subclass provides its implementation of the `start()` method.

Now, let's examine how the Liskov Substitution Principle applies:

### Without LSP:

```java
class Garage {
    public void startVehicle(Vehicle vehicle) {
        vehicle.start();
    }
}
```

In this non-LSP-compliant example, we have a `Garage` class that attempts to start a vehicle by calling the `start()` method. Initially, everything seems to work fine, as we can start both `Car` and `Bicycle` objects using the `startVehicle()` method:

```java
Garage garage = new Garage();
garage.startVehicle(new Car());       // Output: Car is starting...
garage.startVehicle(new Bicycle());   // Output: Bicycle is starting...
```

However, let's say we introduce a new subclass `Motorcycle`:

```java
class Motorcycle extends Vehicle {
    @Override
    public void start() {
        System.out.println("Motorcycle is starting...");
    }
}
```

Now, if we pass a `Motorcycle` object to the `startVehicle()` method, it still works correctly:

```java
garage.startVehicle(new Motorcycle()); // Output: Motorcycle is starting...
```

But what if we mistakenly override the `start()` method for `Motorcycle` incorrectly:

```java
class Motorcycle extends Vehicle {
    //...

    @Override
    public void start() {
        super.start(); // Incorrect implementation, calling the superclass method
        System.out.println("Motorcycle engine is starting...");
    }
}
```

In this case, the `Motorcycle` class violates the Liskov Substitution Principle because it alters the behaviour of the `start()` method from the superclass `Vehicle`. Now, when we pass a `Motorcycle` object to the `startVehicle()` method, it will print both the superclass message ("*Vehicle is starting...*") and the subclass message ("*Motorcycle engine is starting...*"), breaking the expected behaviour.

### With LSP:

To adhere to the LSP, we must ensure that any subclass can be safely used in place of its superclass without altering the program's correctness.

```java
class Vehicle {
    public void start() {
        System.out.println("Vehicle is starting...");
    }
}

class Car extends Vehicle {
    //...

    @Override
    public void start() {
        System.out.println("Car is starting...");
    }
}

class Bicycle extends Vehicle {
    //...

    @Override
    public void start() {
        System.out.println("Bicycle is starting...");
    }
}

class Motorcycle extends Vehicle {
    //...

    @Override
    public void start() {
        System.out.println("Motorcycle is starting...");
    }
}
```

In this LSP-compliant example, each subclass (`Car`, `Bicycle`, and `Motorcycle`) correctly implements its version of the `start()` method without altering the behaviour defined in the superclass `Vehicle`. Now, when we pass any object of these subclasses to the `startVehicle()` method, will start the vehicle appropriately without any unexpected results.

By adhering to the Liskov Substitution Principle, we ensure that our code is more flexible, reliable, and maintainable, as each subclass can be used interchangeably with its superclass, promoting better object-oriented design.

## 4\. Interface Segregation Principle (ISP)

The Interface Segregation Principle (ISP) states that a class should not be forced to implement interfaces it does not use.

In other words, a class should have separate and specific interfaces based on its needs, rather than having a single large interface that contains methods irrelevant to the class.

This principle encourages the creation of fine-grained interfaces tailored to the requirements of individual classes.

To illustrate the ISP, let's consider a scenario related to a food delivery application that caters to different types of restaurants.

### Without ISP:

Suppose we have an interface called `Restaurant` that represents the functionalities a restaurant can have:

```java
interface Restaurant {
    void acceptOnlineOrder();
    void takeTelephoneOrder();
    void payOnline();
    void walkInCustomerOrder();
    void serveFood();
}

class IndianRestaurant implements Restaurant {
    //... (implementation for all methods)
}

class ItalianRestaurant implements Restaurant {
    //... (implementation for all methods)
}
```

In this non-ISP-compliant example, the `Restaurant` interface includes methods for both online orders and walk-in orders.

However, not all restaurants support online orders, and not all restaurants support walk-in orders.

For instance, an Indian restaurant may not accept online orders, and an Italian restaurant may not have a walk-in customer facility.

### With ISP:

To adhere to the Interface Segregation Principle, we should segregate the `Restaurant` interface into more specific interfaces, based on functionalities that are relevant to different types of restaurants:

```java
interface OnlineOrderRestaurant {
    void acceptOnlineOrder();
    void payOnline();
}

interface WalkInOrderRestaurant {
    void walkInCustomerOrder();
    void serveFood();
}

class IndianRestaurant implements WalkInOrderRestaurant {
    //... (implementation for all relevant methods)
}

class ItalianRestaurant implements OnlineOrderRestaurant, WalkInOrderRestaurant {
    //... (implementation for all relevant methods)
}
```

In this ISP-compliant example, we have segregated the `Restaurant` interface into two smaller interfaces: `OnlineOrderRestaurant` and `WalkInOrderRestaurant`. Now, each class implements only the interfaces that are relevant to its functionalities.

The `IndianRestaurant` class implements `WalkInOrderRestaurant`, as it supports walk-in customer orders and serves food in the restaurant.

On the other hand, the `ItalianRestaurant` class implements both `OnlineOrderRestaurant` and `WalkInOrderRestaurant`, as it supports both online orders and walk-in customer orders.

By adhering to the Interface Segregation Principle, we create more specialized interfaces that cater to the needs of individual classes.

This approach leads to better code organization, reduces dependencies, and improves the flexibility of the system, making it easier to extend and maintain as new types of restaurants or functionalities are added to the food delivery application.

## 5.Dependency Inversion Principle (DIP)

The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules. Instead, both should depend on abstractions.

In simpler words, DIP suggests that when designing software, the relationships between different components should be based on abstract interfaces or classes, rather than concrete implementations.

Let's understand the Dependency Inversion Principle (DIP) both with and without code examples.

### Without DIP:

Suppose we have a simple logging system that writes log messages to a file. The main class directly depends on the low-level file handling class, which creates a tight coupling between them.

```java
class FileLogger {
    public void logMessage(String message) {
        // Code to write log message to a file
    }
}

class MainClass {
    private FileLogger fileLogger = new FileLogger();

    public void doSomething() {
        // Some business logic here...
        fileLogger.logMessage("Doing something...");
    }
}
```

In this non-DIP-compliant example, `MainClass` depends directly on `FileLogger`, which represents a low-level file handling class. Any change in the file handling mechanism or a decision to use a different logging method will require modifications in the `MainClass`. This tightly couples the high-level class with low-level details, making the code less flexible and harder to maintain.

### With DIP:

Now, let's refactor the code to adhere to the Dependency Inversion Principle by introducing an abstract interface to represent the logger.

```java
interface Logger {
    void logMessage(String message);
}

class FileLogger implements Logger {
    @Override
    public void logMessage(String message) {
        // Code to write log message to a file
    }
}

class MainClass {
    private Logger logger;

    public MainClass(Logger logger) {
        this.logger = logger;
    }

    public void doSomething() {
        // Some business logic here...
        logger.logMessage("Doing something...");
    }
}
```

In this DIP-compliant example, we have introduced the `Logger` interface, which abstracts the logging behaviour. The `MainClass` no longer depends directly on the `FileLogger` class but instead depends on the abstract `Logger` interface.

By adhering to DIP, the high-level `MainClass` is now decoupled from the low-level `FileLogger` class. This allows us to use different implementations of the `Logger` interface without modifying `MainClass`. For example, we can create a `ConsoleLogger` or a `DatabaseLogger` that also implements the `Logger` interface, and pass it to `MainClass` without changing its code. This flexibility and decoupling promote better code organization and maintainability.

In summary, the Dependency Inversion Principle suggests using abstract interfaces to decouple high-level components from low-level details, resulting in more flexible, modular, and maintainable code.

## Conclusion

So, throughout this article, we've explored each principle, breaking down complex concepts into easy-to-understand explanations with practical examples.

In the next blog, we'll learn how to use SOLID principles to improve an existing codebase that doesn't follow these principles. We'll explore practical techniques to make the code easier to maintain and understand.

If you have any queries/feedback/suggestions, do comment below.

Till then, If you've found this guide helpful, please consider liking and sharing it with your colleagues.

Happy Coding!