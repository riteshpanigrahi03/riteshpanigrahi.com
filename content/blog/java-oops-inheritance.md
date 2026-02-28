---
title: "JAVA OOPS - Inheritance"
date: "2022-01-04T02:39:09.052Z"
slug: "java-oops-inheritance"
tags: ["Java", "OOPS", "Object Oriented Programming", "inheritance"]
coverImage: "/images/blog/java-oops-inheritance/cover.png"
---

Welcome to 4<sup>th</sup> article of Java OOPs series, in this we will learn everything about Inheritance with examples.<br/>
### What is Inheritance?<br/>
Inheritance is one of the important pillars of OOPS. It is a mechanism of inheriting/acquiring all properties and behaviors (variables and methods) of a class by another class.<br/>
The class from which we are inheriting properties is called the Parent/super class.<br/>
The class which inherits parent class properties is called child/subclass.<br/>
Inheritance represents the **IS-A** relationship which is also known as a parent-child relationship.<br/>

```
class Parent{
    void m1(){
        System.out.println("Parent Class");
    }
    
}
class Child extends Parent{
    void m2(){
        System.out.println("Child Class");
    }
}
``` 
Whenever we are inheriting a *Parent *class in Java, we need to use **extends ** keyword.<br/>
In the above example, the Parent class has a method *m1()*.<br/>
Child class has a method *m2()*.<br/>
But since the child class inherits parent class, m1()(from parent class) is also available to the child class.<br/>

### What if no Inheritance?<br/>

Let's suppose we need to create a loan application. There are 3 types of loans<br/>
-> Home Loan<br/>
-> Personal Loan<br/>
-> Education Loan<br/>

```
class HomeLoan{
    //30 methods
}
class PersonalLoan{
    //30 methods
}
class EducationLoan{
    //30 methods
}
``` 
We have created 3 different classes for each loan.<br/>
If each loan requires implementing 30 different methods.<br/>
In total, we have implemented 90 methods.<br/>
But, when we see all the 3 classes are of type *Loan*, there must be some common methods between them.<br/>
Let's suppose there are 20 common methods among the 3 classes, there will be a lot of code duplicacy.<br/>
So to avoid that let's create a class Loan and implement the 20 common methods.<br/>

```
class Loan{
    //20 methods implemented
}
class HomeLoan extends Loan{
    //remaining 10 methods specific to HomeLoan is implemented
    // rest 20 from the Loan(Parent) class
}
class PersonalLoan extends Loan{
    //remaining 10 methods specific to PersonalLoan is implemented
    // rest 20 from the Loan(Parent) class
}
class EducationLoan extends Loan{
    //remaining 10 methods specific to EducationLoan is implemented
    // rest 20 from the Loan(Parent) class
}
``` 
Then we only need to inherit the Loan class and implement 10 methods specific to each loan.<br/>
In this way, with the help of inheritance, we can reuse a lot of code.<br/>

### Why use Inheritance?
1. Code Reusability.<br/>
2. Method Overriding (we will see this in polymorphism)<br/>

### Types of Inheritance
**a) Single Inheritance**<br/>

![image.png](/images/blog/java-oops-inheritance/image01.png)
It is the simplest type. When one class extends another(only one) class, that type is called single inheritance.<br/>
Here, B is inheriting A. Class A is the parent class and Class B is the child class.<br/>

```
class A{
    void m1(){
        System.out.println("Parent Class A");
    }

}
class B extends A{
    void m2(){
        System.out.println("Child Class B");
    }
}
public class Main {
    public static void main(String[] args) {
        B b = new B();
        b.m1();
        b.m2();
    }

}
/*
OUTPUT
Parent Class A
Child Class B
 */
``` 
**b) Multilevel Inheritance**<br/>

![image.png](/images/blog/java-oops-inheritance/image02.png)
Multilevel inheritance refers to the chain of inheritance.<br/>
As in the above image, C is the child class of B and B is the child class of A.<br/>
Here, Class C will have all the methods and variables of A and B as well.<br/>

```
class A{
    void m1(){
        System.out.println("Parent Class A");
    }

}
class B extends A{
    void m2(){
        System.out.println("Child Class B - Parent A");
    }
}
class C extends B{
    void m3(){
        System.out.println("Child Class C - Parent B");
    }
}
public class Main {
    public static void main(String[] args) {
        C c = new C();
        c.m1();
        c.m2();
        c.m3();
    }
}
/*
OUTPUT
Parent Class A
Child Class B - Parent A
Child Class C - Parent B
 */
``` 
**c) Hierarchical Inheritance**<br/>

![image.png](/images/blog/java-oops-inheritance/image03.png)
In this type, one class has multiple sub/child classes.<br/>
In the above example, **B, C, and D** are *child classes* of the same Parent **A**.<br/>

```
class A{
    void m1(){
        System.out.println("Parent Class A");
    }

}
class B extends A{
    void m2(){
        System.out.println("Child Class B - Parent A");
    }
}
class C extends A{
    void m3(){
        System.out.println("Child Class C - Parent A");
    }
}
class D extends A{
    void m4(){
        System.out.println("Child Class D - Parent A");
    }
}
public class Main {
    public static void main(String[] args) {

        B b = new B();
        b.m1();
        b.m2();
    }
}
/*
OUTPUT
Parent Class A
Child Class B - Parent A
 */
``` 
**d) Multiple Inheritance**<br/>

![image.png](/images/blog/java-oops-inheritance/image04.png)
When one class extends(or inherits) multiple classes. This type is called Multiple inheritance.<br/>
Till now we have seen different types of inheritances all of them had only one base or parent class but the problem with this is there are multiple parent classes.<br/>
Due to this java doesn't support Multiple inheritance.<br/>
**Let us understand why?**


```
class A{
    void m1(){
        System.out.println("Parent Class A");
    }

}
class B {
    void m1(){
        System.out.println("Parent Class B");
    }
}
class C extends A,B{ // suppose it is valid
    void m2(){
        System.out.println("Child Class C - Parent A");
    }
}

public class Main {
    public static void main(String[] args) {

        C c = new C();
        c.m1(); // which m1() method to execute? from A or B
        
    }
}
``` 
Here, let's suppose C inherits A and B where both A and B have a method m1() with the same signature.<br/>
So when the object of C is created and c.m1() is called, which m1() method will be executed?<br/>
This is an ambiguity due to which java doesn't support multiple inheritance for classes.<br/>
But we can make use of multiple inheritance in terms of interfaces because in interfaces as the methods are abstract, even though 2 parent interfaces have the same abstract method their implementation will always be done once.<br/>
### Conclusion
That is it for this article.<br/>
We learned about inheritance, why the inheritance is important and different types of inheritance.<br/>
From the next article onwards we will start with Polymorphism.<br/>
If you find this helpful, do like it.<br/>
Any suggestions comment down below.<br/>

 


