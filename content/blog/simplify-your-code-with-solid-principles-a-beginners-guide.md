---
title: "Simplify Your Code with SOLID Principles: A Beginner's Guide"
date: "2023-08-16T17:50:47.374Z"
slug: "simplify-your-code-with-solid-principles-a-beginners-guide"
tags: ["SOLID principles", "design principles", "Java", "#codingprinciples"]
coverImage: "/images/blog/simplify-your-code-with-solid-principles-a-beginners-guide/cover.png"
---

In the [last article](https://riteshpanigrahi.hashnode.dev/getting-started-with-solid-principles-a-beginners-guide), we learned all about SOLID principles in detail. Now, in this one, we'll put those principles into practice by using some examples and fixing bad code.

By applying SOLID principles, we'll understand how to make messy code, easier to understand and maintain by applying SOLID principles.

Initially, we will address code scenarios where only one principle is violated.Then in subsequent examples, we will tackle a code snippet where multiple principles have been compromised.

Before jumping into this, I would request you to go through the understanding of SOLID principles which we have covered in the [last article](https://riteshpanigrahi.hashnode.dev/getting-started-with-solid-principles-a-beginners-guide), if not already done.

### Example 1 - Violation of the Single Responsibility Principle

**Bad Code (Violating SRP):**

```java
class ReportGenerator {
    public void generateReport(String data) {
        // Code to generate report
    }

    public void saveReportToFile(String report) {
        // Code to save report to a file
    }

    public void sendReportByEmail(String report, String recipient) {
        // Code to send report by email
    }
}
```

In the above example, the `ReportGenerator` class violates SRP as it handles multiple responsibilities: generating a report, saving the report to a file, and sending the report by email.

**Refactored Code (Following SRP):**

```java
class ReportGenerator {
    public void generateReport(String data) {
        // Code to generate report
    }
}

class ReportSaver {
    public void saveReportToFile(String report) {
        // Code to save report to a file
    }
}

class ReportSender {
    public void sendReportByEmail(String report, String recipient) {
        // Code to send report by email
    }
}
```

In the refactored code, we have separated the responsibilities of generating a report, saving the report to a file, and sending the report by email into separate classes, adhering to the SRP.

### Example 2 - Violation of the Open/Closed Principle (OCP)

**Bad Code (Violating OCP):**

```java
class Shape {
    private String type;

    public Shape(String type) {
        this.type = type;
    }

    public void draw() {
        if (type.equals("circle")) {
            // Code to draw a circle
        } else if (type.equals("rectangle")) {
            // Code to draw a rectangle
        }
    }
}
```

In this above code snippet, the `Shape` class violates OCP as it is not closed for modification. Adding a new shape type would require modifying the existing class, violating the OCP.

**Refactored Code (Following OCP):**

```java
interface Shape {
    void draw();
}

class Circle implements Shape {
    @Override
    public void draw() {
        // Code to draw a circle
    }
}

class Rectangle implements Shape {
    @Override
    public void draw() {
        // Code to draw a rectangle
    }
}
```

In the refactored code, we created an interface `Shape`, and created separate classes for each shape (circle and rectangle), allowing the code to be open for extension to support new shapes without modifying existing code.

### Example 3 - Violation of the Liskov Substitution Principle (LSP)

**Bad Code (Violating LSP):**

In this example, we have a base class `Employee` with two derived classes `FullTimeEmployee` and `Contractor`.

```java
class Employee {
    protected String name;
    protected double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public void paySalary() {
        // Code to pay the salary
    }
}

class FullTimeEmployee extends Employee {
    private double bonus;

    public FullTimeEmployee(String name, double salary, double bonus) {
        super(name, salary);
        this.bonus = bonus;
    }

    @Override
    public void paySalary() {
        double totalSalary = salary + bonus;
        // Code to pay the salary along with bonus
    }
}

class Contractor extends Employee {
    private int hoursWorked;

    public Contractor(String name, double salary, int hoursWorked) {
        super(name, salary);
        this.hoursWorked = hoursWorked;
    }

    @Override
    public void paySalary() {
        double totalSalary = salary * hoursWorked;
        // Code to pay the salary based on hours worked
    }
}
```

The violation occurs because `Contractor` does not have the same behavior as the base class `Employee`. The `paySalary()` method in `Contractor` is calculated differently from `FullTimeEmployee`.

This could lead to incorrect results if `Contractor` objects are used in places where the base class `Employee` is expected.

**Refactored Code (Following LSP):**

To correct this, we should ensure that the child classes adhere to the same contract as the base/parent class, meaning that their behavior should not contradict the behavior defined in the base/parent class.

We can refactor the design to use composition and interfaces instead.

```java
interface Payable {
    double calculateSalary();
}

class Employee implements Payable {
    protected String name;
    protected double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    @Override
    public double calculateSalary() {
        return salary;
    }
}

class FullTimeEmployee extends Employee {
    private double bonus;

    public FullTimeEmployee(String name, double salary, double bonus) {
        super(name, salary);
        this.bonus = bonus;
    }

    @Override
    public double calculateSalary() {
        return super.calculateSalary() + bonus;
    }
}

class Contractor implements Payable {
    private double hourlyRate;
    private int hoursWorked;

    public Contractor(double hourlyRate, int hoursWorked) {
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double calculateSalary() {
        return hourlyRate * hoursWorked;
    }
}
```

In the refactored code, we extracted the common behavior of calculating the salary into an interface `Payable`, which is implemented by both `Employee` and `Contractor`. Now both classes adhere to the same contract and can be used interchangeably without violating LSP.

### Example 4 - Violation of the Interface Segregation Principle (ISP)

**Bad Code (Violating ISP):**

```java
interface Worker {
    void work();
    void eat();
}

class Human implements Worker {
    @Override
    public void work() {
        // Code for human work
    }

    @Override
    public void eat() {
        // Code for human eating
    }
}

class Robot implements Worker {
    @Override
    public void work() {
        // Code for robot work
    }

    @Override
    public void eat() {
        // Robot cannot eat, but forced to implement this method
    }
}
```

In this code example, the `Worker` interface violates ISP as it has two methods `work()` and `eat()`, but the `Robot` class does not need the `eat()` method.

**Refactored Code (Following ISP):**

```java
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class Human implements Workable, Eatable {
    @Override
    public void work() {
        // Code for human work
    }

    @Override
    public void eat() {
        // Code for human eating
    }
}

class Robot implements Workable {
    @Override
    public void work() {
        // Code for robot work
    }
}
```

In the refactored code, we separated the `Worker` interface into `Workable` and `Eatable` interfaces, allow each class to implement only the relevant methods, adhering to the ISP.

### Example 5 - Violation of the Dependency Inversion Principle (DIP)

**Bad Code (Violating DIP):**

```java
class DataAccess {
    public void saveData(String data) {
        // Code to save data to a database
    }
}

class BusinessLogic {
    private DataAccess dataAccess;

    public BusinessLogic() {
        this.dataAccess = new DataAccess();
    }

    public void processData(String data) {
        // Business logic processing
        dataAccess.saveData(data);
    }
}
```

In this code example, we have a high-level module `BusinessLogic` that directly depends on a low-level module `DataAccess`, violating DIP.

The `BusinessLogic` is tightly coupled to the concrete implementation of `DataAccess`, making it challenging to replace or extend the data access layer in the future.

**Refactored Code (Following DIP):**

To correct this, we should invert the dependency so that `BusinessLogic` relies on an abstraction (interface) for `DataAccess`, rather than directly depending on the concrete class.

```java
interface DataAccess {
    void saveData(String data);
}

class DatabaseAccess implements DataAccess {
    public void saveData(String data) {
        // Code to save data to a database
    }
}

class BusinessLogic {
    private DataAccess dataAccess;

    public BusinessLogic(DataAccess dataAccess) {
        this.dataAccess = dataAccess;
    }

    public void processData(String data) {
        // Business logic processing
        dataAccess.saveData(data);
    }
}
```

In the refactored code, we define an interface `DataAccess`, which is implemented by `DatabaseAccess`.

Now, `BusinessLogic` depends on the abstraction `DataAccess`, rather than the concrete implementation. By doing so, we have adhered to the Dependency Inversion Principle, and `BusinessLogic` is decoupled from specific data access details.

This allows us to easily replace `DatabaseAccess` with another implementation of `DataAccess`, such as a file-based data access, without modifying `BusinessLogic`.

### Example 6 - Violation of multiple principles

### **Example 6.1**

**Bad Code (Violating OCP & DIP):**

Suppose we have an application that manages different types of notifications (email, SMS, and push notifications) for users:

```java
class User {
    String username;
    User(String username) {
        this.username = username;
    }
}

class EmailNotification {
    void sendEmail(User user, String message) {
        // Send email logic
    }
}

class SMSNotification {
    void sendSMS(User user, String message) {
        // Send SMS logic
    }
}

class PushNotification {
    void sendPush(User user, String message) {
        // Send push notification logic
    }
}

class NotificationService {
    EmailNotification emailNotifier = new EmailNotification();
    SMSNotification smsNotifier = new SMSNotification();
    PushNotification pushNotifier = new PushNotification();

    void sendNotification(User user, String message, String notificationType) {
        if (notificationType.equals("email")) {
            emailNotifier.sendEmail(user, message);
        } else if (notificationType.equals("sms")) {
            smsNotifier.sendSMS(user, message);
        } else if (notificationType.equals("push")) {
            pushNotifier.sendPush(user, message);
        }
    }
}
```

In the above example, below principles are violated

1. **Open/Closed Principle (OCP) Violation**: Adding new notification types would require modifying the `NotificationService` class.
    
2. **Dependency Inversion Principle (DIP) Violation**: The `NotificationService` class directly creates instances of concrete notification classes, violating DIP.
    

**Refactored Code (Following OCP & DIP):**

```java
interface Notification {
    void send(User user, String message);
}

class EmailNotification implements Notification {
    public void send(User user, String message) {
        // Send email logic
    }
}

class SMSNotification implements Notification {
    public void send(User user, String message) {
        // Send SMS logic
    }
}

class PushNotification implements Notification {
    public void send(User user, String message) {
        // Send push notification logic
    }
}

class NotificationService {
    List<Notification> notifiers = new ArrayList<>();

    void addNotifier(Notification notifier) {
        notifiers.add(notifier);
    }

    void sendNotification(User user, String message) {
        for (Notification notifier : notifiers) {
            notifier.send(user, message);
        }
    }
}
```

In this refactored code:

1. OCP: New notification types can be added without altering the `NotificationService` class.
    
2. DIP: The `NotificationService` class depends on abstractions (`Notification` interface), adhering to DIP.
    

### Example 6.2

**Bad Code (Violating SRP, OCP & ISP):**

Imagine a simple application for a media player that plays audio and video files.

```java
interface MediaPlayer {
    void playAudio(String audioType, String filename);
    void playVideo(String videoType, String filename);
}

class AudioPlayer implements MediaPlayer {
    public void playAudio(String audioType, String filename) {
        if (audioType.equals("mp3")) {
            System.out.println("Playing MP3 file: " + filename);
        }
    }

    public void playVideo(String videoType, String filename) {
        // Unsupported operation for AudioPlayer
    }
}

class VideoPlayer implements MediaPlayer {
    public void playAudio(String audioType, String filename) {
        // Unsupported operation for VideoPlayer
    }

    public void playVideo(String videoType, String filename) {
        if (videoType.equals("mp4")) {
            System.out.println("Playing MP4 video: " + filename);
        }
    }
}
```

In this example, we're violating following SOLID principles

1. **Single Responsibility Principle (SRP) Violation**: Both `AudioPlayer` and `VideoPlayer` classes handle both audio and video playing.
    
2. **Open/Closed Principle (OCP) Violation**: Adding new audio or video formats requires modifying existing classes.
    
3. **Interface Segregation Principle (ISP) Violation**: The `MediaPlayer` interface forces classes to implement methods for both audio and video, causing ISP violation.
    

**Refactored Code (Following SRP, OCP & ISP):**

```java
interface AudioPlayer {
    void playAudio(String audioType, String filename);
}

interface VideoPlayer {
    void playVideo(String videoType, String filename);
}

class MP3AudioPlayer implements AudioPlayer {
    public void playAudio(String audioType, String filename) {
        if (audioType.equals("mp3")) {
            System.out.println("Playing MP3 file: " + filename);
        }
    }
}

class MP4VideoPlayer implements VideoPlayer {
    public void playVideo(String videoType, String filename) {
        if (videoType.equals("mp4")) {
            System.out.println("Playing MP4 video: " + filename);
        }
    }
}
```

In this refactored code:

1. SRP: The `MP3AudioPlayer` and `MP4VideoPlayer` classes handle only their respective media types.
    
2. OCP: New audio or video formats can be supported by adding new classes without modifying existing code.
    
3. ISP: The `AudioPlayer` and `VideoPlayer` interfaces provide methods for their specific media types, addressing ISP violation.
    

### **Example 6.3**

**Bad Code (Violating SRP, OCP & DIP):**

Suppose we have an application that manages shapes, calculates their areas, and displays them. Here's the initial code:

```java
class Rectangle {
    double width;
    double height;
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
}

class Circle {
    double radius;
    Circle(double radius) {
        this.radius = radius;
    }
}

class AreaCalculator {
    double calculateRectangleArea(Rectangle rectangle) {
        return rectangle.width * rectangle.height;
    }

    double calculateCircleArea(Circle circle) {
        return Math.PI * circle.radius * circle.radius;
    }
}

class DisplayManager {
    void displayRectangle(Rectangle rectangle) {
        double area = new AreaCalculator().calculateRectangleArea(rectangle);
        System.out.println("Rectangle Area: " + area);
    }

    void displayCircle(Circle circle) {
        double area = new AreaCalculator().calculateCircleArea(circle);
        System.out.println("Circle Area: " + area);
    }
}
```

In this example, the following SOLID principles are violated:

1. **Single Responsibility Principle (SRP) Violation**: The `AreaCalculator` class handles area calculation for both rectangles and circles.
    
2. **Open/Closed Principle (OCP) Violation**: Adding new shapes would require modifying the `AreaCalculator` and `DisplayManager` classes.
    
3. **Dependency Inversion Principle (DIP) Violation**: The `DisplayManager` class directly creates instances of `AreaCalculator`, violating DIP.
    

**Refactored Code (Following SRP, OCP & DIP):**

```java
interface Shape {
    double calculateArea();
}

class Rectangle implements Shape {
    double width;
    double height;
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double calculateArea() {
        return width * height;
    }
}

class Circle implements Shape {
    double radius;
    Circle(double radius) {
        this.radius = radius;
    }

    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class DisplayManager {
    void displayShape(Shape shape) {
        double area = shape.calculateArea();
        System.out.println("Shape Area: " + area);
    }
}
```

In this refactored code:

1. SRP: Each shape class (`Rectangle` and `Circle`) handles its own area calculation.
    
2. OCP: New shapes can be added by creating classes that implement the `Shape` interface without altering existing code.
    
3. DIP: The `DisplayManager` class now depends on abstractions (`Shape` interface), not concrete implementations.
    

### Conclusion

So, in this article we tried to strengthen our knowledge on SOLID principles by fixing code snippets which were not following SOLID principles.

Hope you liked this one👍

In the future articles, we will try to understand each of the important Design Patterns which every software developer should know, in a simple and practical way.

Do mention in comments, if you have any doubts/suggestions.

Thanks for reading!

Happy Coding!