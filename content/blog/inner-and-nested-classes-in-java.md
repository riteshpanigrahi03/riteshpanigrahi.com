---
title: "Deep Dive into Inner and Nested Classes in Java"
date: "2022-02-05T15:19:28.837Z"
slug: "inner-and-nested-classes-in-java"
tags: ["Java"]
coverImage: "/images/blog/inner-and-nested-classes-in-java/cover.png"
---

Inner class is one of the topics in Java that I used to find difficult, so I thought to go deep into its concepts and share this with you guys.<br/>
You may feel this article longer but it will be worth a read.<br/>
So let's start...<br/>

## What is Inner Class?
When a class is declared inside another class or interface, it is called an inner or nested class. <br/>

## Why inner classes?
Suppose there is a case, without existing an object of one type, there is no chance of existing another type object, then we can go for inner classes.<br/>

Eg1:- Suppose we have a Car object and as we know there are many components in a Car and one of its important parts is Engine, also without having a Car object there is no sense of having an Engine object.<br/>
Here, we can declare an Engine class inside Car

```
class Car{
    class Engine{
        
    }
}
``` 

Eg2:- Similarly, in the Map interface, we have key-value pairs.<br/> 
Each pair is called an Entry.<br/>
So, without having a map object there is no chance of having an entry object.<br/>
Therefore if we see the Map interface, the Entry interface is defined inside it.<br/>


## Relation between Outer class and Inner Class
If you have an idea about Inheritance, two classes have a parent-child relationship.<br/>
For eg: A **dog is-a an Animal**, **Cat is-a an Animal**.<br/>
So in inheritance, we have an **IS-A** relationship between 2 classes.<br/>
<br/>
But in the case of inner classes, the relationship is **HAS-A**.<br/>
**Car has-a Engine**, **Map has-a Entry**.<br/>

## Types of Inner class
Based on the position and behavior of the classes, inner classed are divided into 4 types:<br/>
1. Normal or Regular Inner Class<br/>
2. Method Local Inner Class *(class inside a method)*<br/>
3. Annonymous Class *( class with no name)*<br/>
4. Static Nested Class *(class with static keyword)*<br/>

## Normal or Regular class
When we declare any named class directly inside a class without a static modifier such class is called a normal or regular inner class.<br/>


```
class Outer{
    
    class Inner{ //normal inner class
        
    }
}
``` 
When we compile this, how many class files will be generated?<br/>
2 (.class) file will be generated<br/>
> 
Outer.class<br/>
Outer$Inner.class<br/>

### Why an inner class cannot have static declarations?
As we discussed, without having an Outer class object we cannot access the Inner class.<br/> 
But to access static members there is no requirement of object/instance.
Therefore, we can't have static declaration inside the Inner class.

![carbon (25).png](/images/blog/inner-and-nested-classes-in-java/image01.png)
 
### Different ways of interacting with Inner Class
#### Case 1 - Accessing inner class code from a static area of the outer class<br/>
To access the inner class method m1(), we require an inner class object.<br/>
To get an inner class object, we require an Outer class object.<br/>
So, first, create an Outer class object.<br/>
Now, to create an inner class object we will use the outer object(o) then *new Inner()*.<br/>

![carbon (26).png](/images/blog/inner-and-nested-classes-in-java/image02.png)

#### Case 2 - Accessing inner class code from the instance area of the Outer class.<br/>

![carbon (27).png](/images/blog/inner-and-nested-classes-in-java/image03.png)

To access the inner class method m1()  from the outer class method m2(), we can just create an Inner class object and access it.<br/>
But there might be a question, **how do we access the Inner class without the Outer class object? **<br/>
We have reached the instance method of outer class m2() with the outer object, which means we have an outer class object now we can create inner class object easily.<br/> 

#### Case 3 - Accessing inner class code from a static area of another class
This is the same as case 1

![carbon (28).png](/images/blog/inner-and-nested-classes-in-java/image04.png)

#### Case 4 - Accessing static and non-static members of an outer class from inner class

![carbon (29).png](/images/blog/inner-and-nested-classes-in-java/image05.png)

Note - we discussed earlier that we can't declare static members inside the inner class but we can definitely access static members of the outer class directly from the inner class.<br/>

#### Case 5 - Use of 'this' in Inner class

If there is a naming conflict in the outer and inner class, this keyword plays an important role.<br/>Let's see an example.<br/>

![carbon (30).png](/images/blog/inner-and-nested-classes-in-java/image06.png)

Here, we have an instance variable 'x' in Outer class, Inner class, and method of Inner class.<br/>

Within the inner class, the 'this' keyword refers current inner class object.<br/>
So, to print the value of the instance variable of the inner class we used **this.x**.<br/>
Now to print the value of 'x' of the Outer class, we used **Outer.this.x**

## Method local inner classes
Sometimes we can declare a class inside a method, such inner classes are called method local inner classes.<br/>
### What is the need?
The main purpose of the method local inner class is to provide method-specific repeated functionality.<br/>
For example, we have a method **m1()** and in that, we need to perform some operation multiple times, so the best method is to create a method **m2()**.<br/>
But the condition is we can't declare **m2()** as another class-level method, as** m2()** is very specific to m1().<br/> 
So what we can do is create ***m2() inside m1()***.<br/>

![carbon (31).png](/images/blog/inner-and-nested-classes-in-java/image07.png)

**But nested methods are not allowed in Java.**<br/>
So, here comes Method Local Inner Class i.e a class inside a method. <br/>

![carbon (32).png](/images/blog/inner-and-nested-classes-in-java/image08.png)
We can just create an Inner class object and access m2().<br/>
Method Local Inner Class is best suited to meet nested method requirements.<br/>

When we create any variable in a method that is local to that method only.<br/>
Similarly, Method Local Inner Class is local to the method where it is declared.<br/>

### Method Local Inner Class inside a static and non-static method.
When a class is declared inside a non-static/instance method then we can access both instance and static members of the outer class.<br/>

![carbon (33).png](/images/blog/inner-and-nested-classes-in-java/image09.png)

But when a class is declared inside the static method then only static members of the Outer class can be accessed because when we create a static method, its area will be static, and in static area/context, we can't access instance members.<br/>

![carbon (34).png](/images/blog/inner-and-nested-classes-in-java/image10.png)

## Anonymous Inner Class
Inner Classes which do not have a name is called Anonymous Inner class.<br/>
When we want a class just for instant use or one-time usage and we don't care about its name for the future, then we can create an Annonymous Inner class.


### How to create an Anonymous Inner class?

![carbon (37).png](/images/blog/inner-and-nested-classes-in-java/image11.png)

In statement 1, we have created a Student object with a **new **keyword.<br/>
In statement 2, instead of a semicolon (;) we have used <br/>
{

};<br/>
This means we are creating a class which is a child Student class, as it does not have a specific name we call it Anonymous Inner class.<br/>
Here,<br/>

```
 Student s = new Student()
`  {
  	  //some code
   };
``` 

means we are creating the object of the child class of Student and using the reference variable of Student class(parent).<br/>

### Types of Anonymous Inner classes
Based on declaration and behavior there are 3 types of Anonymous Inner class
1. Anonymous Inner class which extends a class.
2. Anonymous Inner class which extends an interface.

### Anonymous Inner class which extends a class
Consider the below example,<br/>

![carbon (39).png](/images/blog/inner-and-nested-classes-in-java/image12.png)

We have a Student class and it has a method plays().<br/>
In the Test class, we have created a Student object s1.<br/>
Also, for Student s2, we want to override the plays() method because Student s2 wants to play FootBall.<br/><br/>
So, we can create a top-level child class of Student and override the plays() method but we want this class only once.<br/> 
So instead of creating a named class, we have created an anonymous class that extends the Student class and we are overriding the plays() method.<br/>

When we compile the above file, 3 .class files will be generated<br/>
1. Student.class<br/>
2. Test.class<br/>
3. Test$1.class - this is the underlying name of the Anonymous Inner class which we created for s2.<br/> 
As this class is created in Test class and it is the first inner class so the name - Test$1<br/>

### Anonymous Inner class which implements an interface
In a similar way, we can define anonymous inner class by implementing an interface

![carbon (38).png](/images/blog/inner-and-nested-classes-in-java/image13.png)

### Difference between Normal Java class and Anonymous Inner class


![image.png](/images/blog/inner-and-nested-classes-in-java/image14.png)


## Static Nested classes

Sometimes we declare an inner class with static modifiers such class is called a static nested class.<br/>
Up to this, we have covered<br/>
1. Regular Inner Class<br/>
2. Method Local Inner Class<br/>
3. Anonymous Inner Class<br/>

### Why it is called Nested instead of Inner?
When we create a regular inner class, it is strongly associated with the outer class. Without the outer class object, we cannot reach the inner class.<br/>

![carbon (40).png](/images/blog/inner-and-nested-classes-in-java/image15.png)

Now let's make the inner class static.<br/>

![carbon (42).png](/images/blog/inner-and-nested-classes-in-java/image16.png)

As the class is static, without having an outer class object we can reach a static inner class.<br/> 
There is no strong association.<br/> 
Therefore instead of calling it static inner class, we call it static nested class because the class is just nested and it is not strongly associated with the outer class.<br/>

![carbon (41).png](/images/blog/inner-and-nested-classes-in-java/image17.png)

### Access static class from Outer class main method


![carbon (43).png](/images/blog/inner-and-nested-classes-in-java/image18.png)

We have created a static nested class and *main()* method in the outer class.<br/>
As we discussed, we don't require Outer class objects to access static nested classes, we can directly create Nested object.<br/>

### Access static class outside of Outer class.

![carbon (44).png](/images/blog/inner-and-nested-classes-in-java/image19.png)

We have created main() inside the Test class.<br/>
Now we want to create a static nested class object, but as this class is nested we need to specify where the static nested class is located.<br/>
Therefore, we are using **Outer.Nested**. <br/>

### Accessing outer class members from the static nested class

We have an instance variable 'x' and static variable 'y'.<br/>
When we try to access instance variable x from the static nested class, we get a compile-time error.<br/>
> 
non-static variable x cannot be referenced from a static context


![carbon (46).png](/images/blog/inner-and-nested-classes-in-java/image20.png)

### Difference between Normal Inner Class and Static Nested Class


![image.png](/images/blog/inner-and-nested-classes-in-java/image21.png)
 
## Conclusion
So far we have covered,4 different types of inner/nested classes and their usage.<br/>
I hope I was able to explain to you all the concepts.<br/>

Reference -  Have a look at the playlist on [YouTube](https://www.youtube.com/playlist?list=PLZgo3LMrtMzVgSlgzIQ_GO5gOcM1NvftS) which you can refer to if you want to learn through amazing videos.<br/>

If you find this helpful, do like it.<br/>
If you are interested in this type of blog, Follow Me✔<br/>
Feedback and Suggestions are welcome.<br/>
Good Bye👋<br/>
Keep Learning📚<br/>

