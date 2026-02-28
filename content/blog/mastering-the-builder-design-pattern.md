---
title: "Creating Java Objects Like a Pro: Mastering the Builder Design Pattern"
date: "2024-01-14T11:03:54.536Z"
slug: "mastering-the-builder-design-pattern"
tags: ["Java", "design patterns", "System Design"]
coverImage: "/images/blog/mastering-the-builder-design-pattern/cover.png"
---

Hi Everyone, welcome once again to the [Design Pattern series](https://riteshpanigrahi.com/series/system-design), I hope you are finding this helpful. In today's, article we will learn about the Builder Design Pattern, understand why it is required, and implement it in Java.

## What is a Builder Design Pattern?

The Builder Design Pattern is a creational design pattern that helps in creating complex objects in a step-by-step approach. It separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

Let us understand the above explanation by an example:

Suppose, you have a class `Person` and there are multiple attributes like name, age, address, and phone number. Out of these, only the name is mandatory, others are optional attributes.

Suppose, we need to create 3 objects of class `Person`

1. Contains only name
    
2. Contains name and age
    
3. Contains name, age, and phone number
    
4. Contains all attributes
    

```java
public class Person {
    private String name;
    private int age;
    private String address;
    private String phoneNumber;

    // Constructor with only mandatory attributes
    public Person(String name) {
        this.name = name;
    }

    // Constructor with age
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Constructor with age and address
    public Person(String name, int age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    // Constructor with all attributes
    public Person(String name, int age, String address, String phoneNumber) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    // Getters and other methods...
}
```

If we don't use the Builder pattern, we might end up using multiple constructors (constructor overloading) or a large constructor with numerous parameters, which can lead to confusion, errors, and difficulty in managing and maintaining the code.

So, the Builder Pattern is useful when there are many parameters in the object's constructor, and some of them are optional. The pattern makes the code more readable, flexible, and maintainable. With this, we can create multiple representations of a class using the same code.

Here's an example of the Builder pattern in Java:

## Implementation

```java
public class Computer {
    //Required parameters
    private String processor;
    private String ram;

    //Optional parameters
    private String graphicsCard;
    private String ssd;

    private Computer(ComputerBuilder computerBuilder) {
        this.processor = computerBuilder.processor;
        this.ram = computerBuilder.ram;
        this.graphicsCard = computerBuilder.graphicsCard;
        this.ssd = computerBuilder.ssd;
    }

    public void setProcessor(String processor) {
        this.processor = processor;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public void setGraphicsCard(String graphicsCard) {
        this.graphicsCard = graphicsCard;
    }

    public void setSsd(String ssd) {
        this.ssd = ssd;
    }

    @Override
    public String toString() {
        return "Computer{" +
                "processor='" + processor + '\'' +
                ", ram='" + ram + '\'' +
                ", graphicsCard='" + graphicsCard + '\'' +
                ", ssd='" + ssd + '\'' +
                '}';
    }

    public static class ComputerBuilder {
        private String processor;
        private String ram;

        private String graphicsCard;
        private String ssd;

        public ComputerBuilder(String processor, String ram) {
            this.processor = processor;
            this.ram = ram;
        }

        public ComputerBuilder setGraphicsCard(String graphicsCard) {
            this.graphicsCard = graphicsCard;
            return this;
        }

        public ComputerBuilder setSsd(String ssd) {
            this.ssd = ssd;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }

    }
}
```

1. `Computer` **Class:**
    
    * Represents a computer with some required parameters (processor, RAM) and optional parameters (graphicsCard, SSD).
        
    * Contains a private constructor that takes an `ComputerBuilder` as a parameter and initializes the fields using the builder.
        
2. `ComputerBuilder` **Class (Static Inner Class):**
    
    * Serves as the builder class responsible for constructing `Computer` objects.
        
    * Has private fields for the same parameters as the `Computer` class: processor, RAM, graphicsCard, and SSD.
        
    * Has a constructor that takes the **required parameters** (processor, RAM).
        
    * There are setter methods for the optional attributes, that returns the instance of `ComputerBuilder` (we will understand this below)
        
    * Contains a `build` method that creates a new `Computer` object using the provided builder instance.
        
3. Usage
    
    ```java
    public class BuilderDemo {
        public static void main(String[] args) {
            Computer computer1 = new Computer.ComputerBuilder("Intel i7", "16 GB")
                                            .setSsd("256 GB")
                                            .build();
            System.out.println("Computer1 - " + computer1);
    
            Computer computer2 = new Computer.ComputerBuilder("Intel i9", "32 GB")
                    .setSsd("1 TB")
                    .setGraphicsCard("NVIDIA GTX 1660")
                    .build();
            System.out.println("Computer2 - " + computer2);
        }
    }
    ```
    
    If we focus on the creation of `computer1` object, we are passing the mandatory attributes to the constructor of `ComputerBuilder` which are processor and RAM.
    
    ```java
    //This part of the code, returns the ComputerBuilder 
    //and it has values of processor and RAM
    new Computer.ComputerBuilder("Intel i7", "16 GB")
    ```
    
    Now we want to add SSD to the same computer, so we used
    
    ```java
    new Computer.ComputerBuilder("Intel i7", "16 GB")
                 .setSsd("256 GB")
    //Now for the same ComputerBuilder which has the values of processor and RAM
    //we are add the SSD
    public ComputerBuilder setSsd(String ssd) {
                this.ssd = ssd;
                return this;
            }
    //If we see the setter method, this returns the same ComputerBuilder
    //because we can add other attributes to the same builder like we did for SSD
    ```
    
    Now that all the attributes required to build the computer are added in the ComputerBuilder, we will now construct the actual object
    
    ```java
    Computer computer1 = new Computer.ComputerBuilder("Intel i7", "16 GB")
                                            .setSsd("256 GB")
                                            .build();
    //when the build() method of the builder class is called, it internally calls the
    //private constructor of the Computer class, in which we set the attributes of Computer class from the builder class obejct
     private Computer(ComputerBuilder computerBuilder) {
            this.processor = computerBuilder.processor;
            this.ram = computerBuilder.ram;
            this.graphicsCard = computerBuilder.graphicsCard;
            this.ssd = computerBuilder.ssd;
        }
    ```
    
    Similarly, `computer2` object is created which also includes the graphics card
    
4. Output
    
    ```java
    Computer1 - Computer{processor='Intel i7', ram='16 GB', graphicsCard='null', ssd='256 GB'}
    Computer2 - Computer{processor='Intel i9', ram='32 GB', graphicsCard='NVIDIA GTX 1660', ssd='1 TB'}
    ```
    
5. So, By using the Builder pattern, we can create `Computer` objects with different combinations of required and optional parameters without having to create multiple constructors, making the code more readable and maintainable.
    

## Director

The Director concept is an additional component in the Builder pattern, that is responsible for managing the construction process of an object. It is like a manager responsible for creating complex objects step by step.

The Director works with the Builder to construct the object, while the Builder focuses on constructing the parts of the object.

Imagine you have a set of LEGO bricks and you want to build different models using the same bricks. The Builder is like the actual bricks, and the Director is like the person(Civil Engineer) who decides how to create different models using the available bricks.

The Director takes a builder instance, sets the configuration details, and then constructs the object using the builder. This approach allows you to create different representations of an object using the same construction process (eg: gaming computer or business computer)

The Director concept can be useful when you want to encapsulate the process of building an object with different configurations or when you want to reuse the construction process for different representations.

In the context of the `Computer` example, let's create a `ComputerDirector` class that takes a `ComputerBuilder` instance and provides methods to create different types of computers, such as a gaming computer or a business computer. Here's the `ComputerDirector` class:

```java
public class ComputerDirector {
    private Computer.ComputerBuilder computerBuilder;

    public void setComputerBuilder(Computer.ComputerBuilder computerBuilder) {
        this.computerBuilder = computerBuilder;
    }

    public Computer createGamingComputer() {
        return this.computerBuilder
                .setGraphicsCard("Nvidea GTX 8GB")
                .setSsd("1TB Nvme")
                .build();
    }

    public Computer createBusinessComputer() {
        return this.computerBuilder
                .setSsd("256 GB Nvme")
                .build();
    }
}
```

In this example, the `ComputerDirector` class manages the construction of gaming and business computers using a `ComputerBuilder` instance. The director sets the appropriate configurations for each type of computer and then constructs the object using the builder.

```java
public class BuilderDemo {
    public static void main(String[] args) {
        // 1. Creating a director
        ComputerDirector computerDirector = new ComputerDirector();

        // 2. Creating a Gaming Computer
        Computer.ComputerBuilder gamingComputerBuilder = new Computer.ComputerBuilder("Intel i9", "32GB");
        computerDirector.setComputerBuilder(gamingComputerBuilder);
        Computer gamingComputer = computerDirector.createGamingComputer();
        System.out.println("Gaming Computer - " + gamingComputer);

        // 3. Creating a Business Computer
        Computer.ComputerBuilder businessComputerBuilder = new Computer.ComputerBuilder("Intel Xeon", "16GB");
        computerDirector.setComputerBuilder(businessComputerBuilder);
        Computer businessComputer = computerDirector.createBusinessComputer();
        System.out.println("Business Computer - " + businessComputer);
    }
}
```

1. **Creating a Director -** `ComputerDirector`:
    
    * An instance of `ComputerDirector` is created to guide the construction process of different types of computers.
        
2. **Creating Gaming Computer**:
    
    * A `Computer.ComputerBuilder` instance (`gamingComputerBuilder`) is created with mandatory attributes "Intel i9" processor and "32GB" RAM.
        
    * The `computerDirector` is set to use this builder.
        
    * The `createGamingComputer` method of `computerDirector` is called to construct a gaming computer using the provided builder.
        
    * The resulting gaming computer is printed.
        
3. **Creating Business Computer**:
    
    * Another `Computer.ComputerBuilder` instance (`businessComputerBuilder`) is created with "Intel Xeon" processor and "16GB" of RAM.
        
    * The `computerDirector` is set to use this builder.
        
    * The `createBusinessComputer` method of `computerDirector` is called to construct a business computer using the provided builder.
        
    * The resulting business computer is printed.
        
4. Output
    
    ```java
    Gaming Computer - Computer{processor='Intel i9', ram='32GB', graphicsCard='Nvidea GTX 8GB', ssd='1TB Nvme'}
    Business Computer - Computer{processor='Intel Xeon', ram='16GB', graphicsCard='null', ssd='256 GB Nvme'}
    ```
    

## Conclusion

In summary, the Builder design pattern provides an elegant solution to construct complex objects with multiple configuration options. By separating the construction process from the actual representation, it allows for flexibility, readability, and easier maintenance of code.

Feel free to like and share this post if you found it helpful! Any feedbacks? Please mention them in the comments.

Until we meet again, Happy Coding!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/builder)

References

1. [https://refactoring.guru/design-patterns/builder](https://refactoring.guru/design-patterns/builder)