---
title: "Complete Guide to Java enum"
date: "2022-02-12T11:22:34.226Z"
slug: "complete-guide-to-java-enum"
tags: ["Java"]
coverImage: "/images/blog/complete-guide-to-java-enum/cover.png"
---

## What is enum?
When we want a group of named constants then we should go for enum. 

Common examples include directions (values of NORTH, SOUTH, EAST, and WEST) and the days of the week.

```
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY; 
}
``` 
In the above example, we have created an enum DAY, all the days of the week are mentioned and in the end, we have added a semicolon(;). 

**Note**- As we have only named constant inside the enum, semicolon(;) is optional in this case. 
But it's compulsory when we have other members in the enum( we will understand this in detail)

## When should we use an enum?
When we know all possible constants at compile-time, then we should go for enums.

When we want to define our own datatype, for example in the above code, DAY is our own datatype. This is also called enumerated data type.

Enum concept in Java came in the 1.5 version, it is different from the old languages enum which is used to named constant only. 

In Java along with named contents, we can have variables and methods as well. We will understand everything in detail in this article.

## Internal Implementation of an enum
1. Every enum is internally implemented using the class concept.
2. Every enum constant is public static final.
3. Every enum constant is an object of type enum(Animal)


![image.png](/images/blog/complete-guide-to-java-enum/image01.png)

## Enum Declaration and Usage

```
enum Animal{
    DOG, CAT;
}

class Test {
    public static void main(String[] args) {
        Animal d = Animal.DOG;
        System.out.println(d); //DOG
    }
}
```
We have used our **Animal **enum.

There is a **Test **class in which we access enum constant.

As discussed above,
1. enum Animal will internally be converted to class Animal
2. each enum constant is an object of type enum and it is **public static final** and we can access static members by class name.

So we can access DOG by Animal.DOG and we have stored it in the Animal type variable.

We then print 'd'.

As we know, when we print an object, its **toString()** method is called. In enum, the **toString()** method is implemented to print the name of the constant.

### Where we can declare enums?
In the above example, we have declared enum outside the class. 

But if we want to create a named constant for a specific class then we can declare enums inside the class as well and this concept is called Inner Class.

We cannot declare enums inside methods.

![image.png](/images/blog/complete-guide-to-java-enum/image02.png)


## enum and Inheritance
Every class in java is a child class of Object either directly or indirectly, but enums are a direct child class of *java.lang.Enum* class.

So this means every enum is always extending *java.lang.Enum* ( though we don't mention explicitly compiler does that) and we already know that java **does not support multiple inheritance**, therefore enums cannot extend any other enum.

Every enum is final implicitly so cannot create a child enum/class as well.

Due to these reasons inheritance concept is not applicable for enums.


![image.png](/images/blog/complete-guide-to-java-enum/image03.png)

enums can implement any number of interfaces.

## Important enum methods.

**values()** - to list out all values present in the enum. When we know the enum name but to get all the constants which are present then we can use this method.
As it returns a group of values, its **return type will be an array**.

![carbon (48).png](/images/blog/complete-guide-to-java-enum/image04.png)

**ordinal()** - to find the order/position of the named constant. 
enum constants also start with 0 as in arrays.


![carbon (49).png](/images/blog/complete-guide-to-java-enum/image05.png)

## Java enum specialty

In old languages, enum was used just for named constant but in Java enum is more than that apart from creating constants we can create variables, methods and constructors as well.


### enum and Methods
#### main() method in enum
We can even declare the main() method inside enum and can run enum from Command Prompt.


![carbon (52).png](/images/blog/complete-guide-to-java-enum/image06.png)

In the above discussion, we discussed that semicolon(;) after the constants are optional, but here if we remove the (;) after constant CAT, we will get a compile-time error.

![carbon (51).png](/images/blog/complete-guide-to-java-enum/image07.png)

**Why this is so? **

In addition to constants, if we are adding any other members in the enum, compulsorily the first line will be a list of constants and should end with a semicolon(;)

If we want an enum with no constants and just methods then the compiler will throw an error because **if we just want methods then why use enums we can go with classes**. <br/>      
Still, if we want to create an enum with no constant, in the first line we need to add a semicolon(;)


![carbon (53).png](/images/blog/complete-guide-to-java-enum/image08.png)

#### abstract methods in enum
When we create an abstract method in the enum, it must be overridden in all the enum constant bodies.

![carbon (57).png](/images/blog/complete-guide-to-java-enum/image09.png)

### enum and Constructors
As we know till now, every enum constant is an object of type enum.

So whenever an object concept comes, a constructor has to be present.

Let's understand this with an example.

![carbon (54).png](/images/blog/complete-guide-to-java-enum/image10.png)

Here, we have an enum Animal, which contains 2 constants DOG, CAT, and a constructor.

As there are 2 constants, there will be 2 objects, right?

So, the constructor should be called twice.

In the Test class, we have the main() method which has just one print statement.
Let's see the output
> 
main() method from Test class

**Why the objects are not created?**

Every enum object is a public static final.
static variables will be created at the time of class loading.

If we see the main() method, nowhere we have used Animal enum/class, so that is not loaded yet.

Let me use Animal enum in the main() method.


![carbon (55).png](/images/blog/complete-guide-to-java-enum/image11.png)

> 
Enum Constructor<br/>
Enum Constructor<br/>
main() method from Test class<br/>

All the objects are created once the class is loaded.

I hope up to this it is clear.

Now since there is a constructor, can we instantiate the Animal object using the 'new' keyword?


```
Animal COW = new Animal();
``` 
> 
Error - java: enum types may not be instantiated

**Why this error?**

If we have created an enum it can directly create objects of the named constant, then why create it explicitly. 
Therefore, we can't invoke enum constructor explicitly.

Now let us understand more using a complete enum example

![carbon (56).png](/images/blog/complete-guide-to-java-enum/image12.png)

In the above example, we have
1. instance variable price
2. instance method getPrice()
3. Default constructor where we initialize price to 100
4. Parameterized constructor where we initialize price according to the argument.

Now there might be a question,** if we cannot invoke constructor explicitly then how can we use the Parameterized constructor?**

If you remember the above examples,
DOG -->  public static final Animal DOG = new Animal()

If we want to use the parameterized constructor, we need something like this
**public static final Animal DOG = new Animal(100)**, this can be achieved by **DOG(100)**.

Similarly in this example,
For APPLE(150) and MANGO(200) parametrized constructor will be called.
 
For ORANGE, the default constructor will be called.

In the Test class, using the values() method we are printing the name and its price.
> 
APPLE -> 150<br/>
MANGO -> 200<br/>
ORANGE -> 100<br/>

## enum vs Enum vs Enumeration
enum - enum is a **keyword **used to create a group of named constants.

Enum - Enum is a **class **in java.lang package. It is a base class for all the enums.

Enumeration - It is an** interface** in java.util package. An object that implements the Enumeration interface generates a series of elements, one at a time.

## Conclusion
This is it for this article. Hope you liked it.👍

Thanks for reading..!!

Happy Learning.

Do mention in comments, if you have any doubts/suggestions.