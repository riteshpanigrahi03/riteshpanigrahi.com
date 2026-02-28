---
title: "Simplify Object Creation with Prototype Pattern"
date: "2024-01-21T14:26:49.465Z"
slug: "simplify-object-creation-with-prototype-pattern"
tags: ["System Design", "design patterns", "Java"]
coverImage: "/images/blog/simplify-object-creation-with-prototype-pattern/cover.png"
---

Hi everyone, so far we have seen 4 different Creational design patterns, in today's article we will understand the last Creational design pattern which is the Prototype Design Pattern.

## What is Prototype Design Pattern?

Prototype design pattern is a creational design pattern that involves creating new objects by copying an existing object, known as prototype. It defines an interface for cloning objects and allows subclasses to alter the cloning behavior. The main idea is to avoid the cost of creating objects from scratch by duplicating existing instances.

## Challenges of not using Prototype Design Pattern

Suppose, we have an Employee class with attributes like name, age, address, and designation. We have an `employee`object which is created using the parameterized constructor.

```java
public class Employee {
    private String name;
    private Integer age;
    private String address;
    private String designation;

    public Employee() {
    }

    public Employee(String name, Integer age, String address, String designation) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.designation = designation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", designation='" + designation + '\'' +
                '}';
    }
}
```

```java
public class PrototypeDemo {
    public static void main(String[] args) {
        Employee employee = new Employee("Rahul", 30, "Mumbai", "Software Engineer2");
        System.out.println(employee);
    }
}
//Employee{name='Rahul', age=30, address='Mumbai', designation='Software Engineer2'}
```

Suppose we want to create another employee object with just name and age in it. In this case, we would need to create another constructor with only name and age

```java
public Employee(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

Employee employee1 = new Employee("Rahul", 30);
System.out.println(employee1);
```

We might think there is nothing wrong with this, but if there is a requirement to create multiple objects with different requirements, multiple constructors will be created, leading to below problems:

1. **Constructor Explosion:**
    
    * Multiple constructors are required to handle various combinations of optional attributes, leading to constructor overloading.
        
2. **Code Duplication:**
    
    * The logic for constructing employees with varying attributes is duplicated across multiple constructors, making the code less maintainable.
        
3. **Limited Flexibility:**
    
    * Adding or modifying attributes requires changes in multiple constructors, making the code less adaptable to changes.
        

## Implementation of Prototype Design Pattern

With a prototype design pattern, we can create an object by cloning the existing instance. This is especially valuable when the cost of creating an object from scratch is high.

**How can we achieve this?**  
In Java, we have a Marker Interface `Cloneable` , its primary purpose is to indicate that the objects of the implementing class can be safely cloned using the `clone()` method.

We will need to implement, `Cloneable` interface in the `Employee` class and override the `clone()` method.

```java
public class Employee implements Cloneable {
    private String name;
    private Integer age;
    private String address;
    private String designation;

    public Employee() {
    }

    public Employee(String name, Integer age, String address, String designation) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.designation = designation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", designation='" + designation + '\'' +
                '}';
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return new Employee(this.name, this.age, this.address, this.designation);
    }
}
```

In the context of the Prototype design pattern, extending the `Cloneable` interface is necessary for a few reasons:

1. **Indicating Clonability:**
    
    * By implementing `Cloneable`, a class indicates to the Java runtime environment that instances of this class can be cloned using the `clone()` method.
        
2. **Avoiding** `CloneNotSupportedException`**:**
    
    * Without implementing `Cloneable`, calling `clone()` on an object may result in a `CloneNotSupportedException`. Implementing `Cloneable` provides a marker that allows the `clone()` method to be called without encountering this exception.
        
3. **Conforming to the Cloning Contract:**
    
    * Implementing `Cloneable` is a way for a class to express that it supports cloning. It's part of adhering to the cloning contract in Java, which involves declaring the `clone()` method.
        

Usage

```java
public class PrototypeDemo {
    public static void main(String[] args) throws CloneNotSupportedException {
        Employee employee = new Employee("Rahul", 30, "Mumbai", "Software Engineer2");
        System.out.println(employee);
        Employee employeeClone = (Employee) employee.clone();
        employeeClone.setAge(25);
        employeeClone.setDesignation("Junior Software Engineer");
        System.out.println(employeeClone);
    }
}
```

In the above code, we used the Prototype design pattern by creating a clone of an original `Employee` object.

The original and cloned instances share the same initial attributes, but the cloned instances can be modified independently like we modified the `designation` of the cloned object.

This showcases the flexibility and efficiency provided by the Prototype pattern for object creation and manipulation.

## Conclusion

The prototype design pattern helps us to create objects from the existing one(the prototype). By using the Prototype pattern, developers can avoid the challenges faced by constructor overloading, default value redundancy, code duplication, and limited configurability.

If you found this one helpful, do give it a like and share among others.

In the next one, we will start with first Structural Design Pattern which is Adapter Design Pattern.

Till then, Happy Coding!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/prototype)