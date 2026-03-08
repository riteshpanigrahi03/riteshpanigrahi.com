---
title: 'Decorating Your Objects: A Guide to the Decorator Design Pattern'
date: '2025-04-20T12:25:34.979Z'
slug: decorator-design-pattern
tags:
  - design patterns
  - System Design
  - Java
coverImage: /images/blog/decorator-design-pattern/cover.png
series: Design Patterns Series
seriesOrder: 9
---

Imagine you're at Subway, ready to order your sandwich. You start with the basic sandwich, choosing your bread and selecting a filling – whether it's a hearty meat option or a delicious veggie alternative.

Suppose you want something extra – some cheese, extra veggies, and sauces.

Adding cheese to your sandwich at Subway is like adding a special touch, making it even more delicious.

In the world of the Decorator Pattern, this act of customization – adding these extra layers of cheese, veggies, and sauces – is what decorators are all about. It's like giving your sandwich a little upgrade, enhancing the flavor, and making it uniquely yours.

## What is a Decorator Pattern?

A decorator pattern is a structural design pattern that allows new behaviors to be added to existing objects by placing these objects inside special wrapper/decorator objects that contain the new behaviors. This is often used to extend the functionalities of classes in a flexible and reusable way.

## Why do we need this?

Whenever we come across a use case to add new functionality to an existing class, the first thing that comes to our mind is Inheritance, correct?

Consider the above Subway example, to add extra cheese to the base sandwich we can create a subclass `BaseSandwich+Cheese` and our task will be done.

Now to add veggies we can create `BaseSandwich+Veggies`

To add veggies and cheese, we can create `BaseSandwich+Veggies+Cheese.`

But is this approach efficient? With every combination, there will be a new class which will lead to a class explosion.

![](/images/blog/decorator-design-pattern/image01.png)

## Solution

The decorator pattern comes into the picture in these cases, where instead of inheritance we will make use of aggregation, and we will understand everything in the below example.

Let's design a coffee ordering system where customers can customize their coffee with various additives. We'll implement the Decorator Design Pattern to handle these customizations.

### Requirements for Coffee Ordering System:

1. 1. **Basic Coffee:**
        
        * The system should allow customers to order a basic coffee.
            
        * The cost of a basic coffee should be set to 10.
            
    2. **Add Milk:**
        
        * Customers should have the option to add extra milk to their coffee.
            
        * The cost of the coffee should increase by 3.5 when adding extra milk.
            
    3. **Add Sugar:**
        
        * Customers should have the option to add extra sugar to their coffee.
            
        * The cost of the coffee should increase by 1.0 when adding extra sugar.
            
    4. **Combining Additives:**
        
        * Customers should be able to combine multiple additives to customize their coffee.
            
        * For example, a customer should be able to order a coffee with both extra milk and extra sugar.
            
    5. **Total Cost Calculation:**
        
        * The system should calculate the total cost of the ordered coffee based on the selected options.
            
        * The total cost should reflect the sum of the costs associated with the chosen additives.
            

### Class Diagram

![](/images/blog/decorator-design-pattern/image02.png)

1. **Coffee:**
    
    * Represents the base component or interface for different types of coffee.
        
    * Defines two methods: `getDescription()` (providing a textual description of the coffee) and `getCost()` (returning the cost of the coffee).
        
2. **BasicCoffee:**
    
    * A concrete class that implements the `Coffee` interface.
        
    * Represents the basic coffee without any additives.
        
    * Provides specific implementations for `getDescription()` and `getCost()`.
        
3. **CoffeeDecorator:**
    
    * An abstract class that also implements the `Coffee` interface.
        
    * Contains a private field, `coffee` representing the wrapped coffee component or the coffee that came for additives.
        
    * Defines methods to get the description and cost, delegating these operations to the wrapped `coffee` component.
        
    * Relationships:
        
        * To add extra features to the coffee, the `CoffeeDecorator` needs to have the coffee instance, so we have a HAS-A relationship(aggregation) with the `Coffee` interface
            
        * Once additives are added, it will still be a Coffee, so IS-A relationship with `Coffee` interface as well.
            
4. **MilkDecorator:**
    
    * A concrete decorator class that extends `CoffeeDecorator`.
        
    * Adds extra functionality to the coffee (in this case, the ability to add milk).
        
    * Overrides the methods to modify the description and cost based on the addition of milk.
        
5. **SugarDecorator:**
    
    * Another concrete decorator class extending `CoffeeDecorator`.
        
    * Adds the functionality to add sugar to the coffee.
        
    * Overrides methods to adjust the description and cost accordingly.
        

### Implementation

**1\. Coffee Interface:**

```java
public interface Coffee {
    String getDescription();
    double getCost();
}
```

**2\. BasicCoffee Class:**

```java
public class BasicCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Basic Coffee";
    }

    @Override
    public double getCost() {
        return 10;
    }
}
```

This is the concrete implementation of the `Coffee` interface, representing a basic coffee. It provides a description ("Basic Coffee") and has a cost of 10.

**3\. CoffeeDecorator Abstract Class:**

```java
abstract class CoffeeDecorator implements Coffee {
    private Coffee coffee;

    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    @Override
    public String getDescription() {
        return coffee.getDescription();
    }

    @Override
    public double getCost() {
        return coffee.getCost();
    }
}
```

This is an abstract class that implements the `Coffee` interface. It contains an instance variable `coffee` of type `Coffee`. It serves as the base class for all decorators.

**4\. MilkDecorator Class:**

```java
public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    public String getDescription() {
        return super.getDescription() + " with extra Milk";
    }

    public double getCost() {
        return super.getCost() + 3.5;
    }
}
```

This is a concrete decorator that extends `CoffeeDecorator`. It adds functionality to the coffee, in this case, extra milk. It overrides `getDescription()` to append " with extra Milk" and `getCost()` to add the cost of extra milk.

**5\. SugarDecorator Class:**

```java
public class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    public String getDescription() {
        return super.getDescription() + " with extra Sugar";
    }

    public double getCost() {
        return super.getCost() + 1.0;
    }
}
```

Similar to `MilkDecorator`, this is another concrete decorator that adds functionality for extra sugar.

**6\. DecoratorExample Class:**

```java
javaCopy codepublic class DecoratorExample {
    public static void main(String[] args) {
        Coffee basicCoffee = new BasicCoffee();
        printInvoice(basicCoffee);

        Coffee basicCoffeeWithExtraMilk = new MilkDecorator(basicCoffee);
        printInvoice(basicCoffeeWithExtraMilk);

        Coffee basicCoffeeWithExtraMilkAndSugar = new SugarDecorator(new MilkDecorator(basicCoffee));
        printInvoice(basicCoffeeWithExtraMilkAndSugar);
    }

    private static void printInvoice(Coffee coffee) {
        System.out.println("Order: " + coffee.getDescription());
        System.out.println("Cost: " + coffee.getCost());
        System.out.println("--------");
    }
}
```

This is the main class demonstrating the usage of the Decorator Pattern. It creates instances `Coffee` with various decorators and prints their descriptions and costs.

### **Execution**

Let's break down the execution flow of the line:

```java
Coffee basicCoffeeWithExtraMilkAndSugar = new SugarDecorator(new MilkDecorator(basicCoffee));
```

1. `basicCoffee` **Creation:**
    
    * `basicCoffee` is an instance of the `BasicCoffee` class, representing a basic coffee without any additives.
        
2. `MilkDecorator` **Wrapping:**
    
    * `new MilkDecorator(basicCoffee)` creates a new instance of `MilkDecorator` and wraps it around the existing `basicCoffee`.
        
    * Now, `basicCoffee` is enclosed within the `MilkDecorator`, allowing the addition of milk functionalities.
        
3. `SugarDecorator` **Wrapping:**
    
    * `new SugarDecorator(new MilkDecorator(basicCoffee))` further wraps the result from the previous step (`MilkDecorator`) with a `SugarDecorator`.
        
    * This nesting allows for multiple decorators to be stacked, each extending the functionalities of the previous one.
        
4. `basicCoffeeWithExtraMilkAndSugar`**:**
    
    * The final result is assigned to the variable `basicCoffeeWithExtraMilkAndSugar`.
        
    * This variable represents a complex composition of decorators around the original `basicCoffee` instance.
        
5. **Execution Flow for getCost:**
    
    * Let's break down the `getCost()` flow step by step for the `basicCoffeeWithExtraMilkAndSugar`:
        
        1. `SugarDecorator.getCost()`**:**
            
            * The `getCost()` method of `SugarDecorator` is called.
                
            * It calls `getCost()` on the wrapped decorator (`MilkDecorator`), adding its cost to the total.
                
        2. `MilkDecorator.getCost()`**:**
            
            * The `getCost()` method of `MilkDecorator` is called.
                
            * It calls `getCost()` on the wrapped coffee (`basicCoffee`), adding its cost to the total.
                
        3. `BasicCoffee.getCost()`**:**
            
            * The `getCost()` method `BasicCoffee` is called.
                
            * It returns the base cost of `10`.
                
        4. **Adding Costs:**
            
            * The cost of `BasicCoffee` is `10`.
                
            * The cost of `MilkDecorator` is `3.5`.
                
            * The cost of `SugarDecorator` is `1.0`.
                
            * The final total cost is the sum of these: `10 + 3.5 + 1.0 = 14.5`.
                
        
        So, the `getCost()` flow is: `SugarDecorator -> MilkDecorator -> BasicCoffee`, and the final cost is `14.5`.
        
    
    ![](/images/blog/decorator-design-pattern/image03.png)
    
      
    

This is all about decorator design pattern, I hope you find this useful.

Do give it a like and share it among your friends, if you will this was helpful.

Till then, Happy Coding!

Complete implementations can be found on [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/decorator)

##
