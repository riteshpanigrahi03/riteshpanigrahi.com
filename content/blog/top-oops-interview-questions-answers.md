---
title: "Top OOPS Interview Questions & Answers"
date: "2022-08-10T15:30:25.120Z"
slug: "top-oops-interview-questions-answers"
tags: ["Java", "interview"]
coverImage: "/images/blog/top-oops-interview-questions-answers/cover.png"
---

## 1. What is Method Signature and its use?

Let's consider the below method and try to get its method signature.

```
public int m1(int a , float b){
        //do something
}
``` 
**m1(int, float)** is the method signature of the above method.
By this, we can say method signature in java consists of **method name and datatypes of arguments in the exact order.**

### Use of Method Signature

Java Compiler uses method signature while resolving method calls. Let us take an example and understand this.


```
public class Test {
    public void m1(int a){
        System.out.println(a);
    }
    public  void m2(String name){
        System.out.println(name);
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.m1(10);
        t.m2("Sachin");
    }
}

``` 
The Test class has 2 methods m1 and m2.
So compiler maintains a method table that stores the method signature of all the methods.


![image.png](/images/blog/top-oops-interview-questions-answers/image01.png)

So whenever we call t.m1(10) compiler checks

1. t is of type Test
2. In the Test method table, do we have any method with signature m1(int)? YES
3. Executes successfully.

## 2. What is Method Overloading?

We can say that methods are overloaded when we have multiple methods with the same name but different arguments type.

There are 2 ways by which we can overload a method

1. By changing the number of arguments
2. By changing the data type


```
public class Test {
    public void m1(){
        System.out.println("No argument method called");
    }
    public void m1(int a){
        System.out.println("Integer argument method called");
    }
    public  void m1(String name){
        System.out.println("String argument method called");
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.m1();//No argument method called
        t.m1(10);//Integer argument method called
        t.m1("hello");//String argument method called
    }
}

``` 

## 3. Why use Method Overloading?

In C language (not OOP language), to calculate the absolute value of an integer we have the abs() method.

Similarly, for the long value, we have labs().
This may increase the complexity as for different data types we need to remember different methods.

But in Java, with the help of the method overloading concept, we have a single method abs() for every datatype.


![image.png](/images/blog/top-oops-interview-questions-answers/image02.png)

As we can see, the method name (**abs**) is the same just the arguments are of different types, which is nothing but method overloading.

Method overloading increases the readability of the program.

## 4. What is Method Overriding?

When a subclass (child class) is created from its Parent, all the methods are inherited to the child.

If for some method implementation in parent class, child class is not satisfied then we can change the implementation of that method in the child class.

This is called method overriding.


```
public class Parent {
    public void m1(int a){
        System.out.println("Parent class - "+a*a);
    }
    public void m2(String a){
        System.out.println("Parent class - "+a);
    }
}
class Child extends Parent{
    public void m1(int a){
        System.out.println("Child class - "+(a+a));
    }
}
class Test{
    public static void main(String[] args) {
        Parent p = new Parent();
        p.m1(3); //Parent class - 9
        p.m2("Sachin"); //Parent class - Sachin
        Child c = new Child();
        c.m1(3); //Child class - 6
        c.m2("Virat");//Parent class - Virat
    }
}

``` 
## 5. What are the rules for method overriding?

#### Rule 1:

While overriding a parent class method in the child class, the method signature should be the same for both methods.

#### Rule 2: Return type of the methods.

Return types can be of 2 types- Primitive and Object type

**Primitive**

In case the return type is primitive like** int, long, double** compulsorily the return type of overriding method should be the same.

**Object Types
**

Till Java 1.4 version even Object return types like **Integer, String, Object**, etc are required to be the same

But from the 1.5 version onwards, the return type of the overriding method can be of co-variant type.

Now, what is co-variant type? Suppose, the parent class method which the child overrides has returned type A, then the child method can have the same type A or child classes of A.


```
public class Parent {
    public Object m1(int a){ // overridden method

    }

}
class Child extends Parent{ 
    public String m1(int a){ // overriding method
    }
}

``` 
Here child class method has return type String, which is a child of Object(return type of Parent m1 method)

#### Rule 3: Scope of access modifiers

While overriding a method we can't reduce the scope of access modifiers but can increase it or keep it the same.


```
public class Parent {
    public  void m1(int a){ 
    }
}
class Child extends Parent{
    protected void m1(int a){ // public in parent and protected in child is not allowed
    }
}

``` 
## 6. Can we override private and final methods?

Overriding concept is applicable when we have a parent-child relationship between 2 classes.

If the method is **private**, that method is not accessible outside the class. So the child class cannot override the private method in the parent class.

If we try to override the **final **method we will get a compile-time error, so the overriding concept is not for final methods as well.


```
public class Parent {
    public final void m1(int a){
    }
}
class Child extends Parent{
    public void m1(int a){
    }
}
/*
java: m1(int) in polymorphism. The child cannot override m1(int) in polymorphism. Parent
  the overridden method is final
*/

``` 
## 7. Why method overloading is called compile-time polymorphism?


```
public class Test {
    public void m1(){
        System.out.println("No argument method called");
    }
    public void m1(int a){
        System.out.println("Integer argument method called");
    }
    public  void m1(String name){
        System.out.println("String argument method called");
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.m1();//No argument method called
        t.m1(10);//Integer argument method called
        t.m1("hello");//String argument method called
    }
}

``` 
Here, we have 3 overloaded methods:- No argument method, Integer argument, and String argument.

Accordingly, the program gets executed on all the 3 method calls. (Output is commented)

In this example, the reference type used in method calls is Test(t) and method resolution is done by the compiler at compile time, so method overloading is also called compile-time polymorphism or static polymorphism, or early binding.

## 8. Why method overriding is called runtime-polymorphism?


```
public class Parent {
    public void m1(int a){
        System.out.println("Parent class - "+a*a);
    }
    public void m2(String a){
        System.out.println("Parent class - "+a);
    }
}
class Child extends Parent{
    public void m1(int a){
        System.out.println("Child class - "+(a+a));
    }
}
class Test{
    public static void main(String[] args) {
        Parent p = new Parent();
        p.m1(3); //Parent class - 9
        p.m2("Sachin"); //Parent class - Sachin
        Child c = new Child();
        c.m1(3); //Child class - 6
        c.m2("Virat");//Parent class - Virat
    }
}

``` 
Here we have a Parent and Child class.
Parent has 2 methods m1 which squares the integer passed and m2 prints the string.

When a Child class inherits the parent class, it receives both methods.

But here child class is not satisfied with the implementation of the m1 method, the child class wants to add the integer passed with itself instead of the square.
So we can change the implementation of the m1 method in the child class.

Please note that the method signature of m1 is the same in both parent and child. I hope this is clear.

Now let's create another object of child class with parent reference.


```
Parent p1 = new Child();
p1.m1(3); //Child class - 6

``` 
Now here m1 method is called, **which m1 method will get executed? Parent or Child?**<br/> 
So, the compiler's role here is to just check since the reference is of type Parent, does the parent class have a method with signature m1(int)?<br/>  Yes, so it gives a green signal to JVM.<br/> 
Now at runtime, JVM checks that the object is of type Child, so the m1 method of the child class will get executed.<br/> 


> 
As JVM does the method resolution at runtime, method overriding is also known as Runtime Polymorphism, Dynamic Polymorphism, or Late Binding.

## 9. Can we override static methods?

No, we cannot override static methods because method overriding is based on dynamic binding which means method resolution is done at the runtime, based on the type of object and not the reference.

For example,


```
Parent p1 = new Child();
p1.m1(3); //Child class m1 method will be called

``` 
On the other hand, static methods are based on static binding and method resolution is done at compile time.

Even if we try to override a static method, that concept is called Method Hiding, not Method Overriding.


```
//parent class  
class Parent
{  
    //we cannot override the display() method  
    public static void display()  
    {  
        System.out.printf("display() method of the parent class.");  
    }  
}  
//child class  
class Child extends Parent
{  
    //the same method also exists in the parent class  
    //it does not override, actually it is a method hiding  
    public static void display()  
    {  
        System.out.println("Overridden static method in Child Class in Java");  
    }  
}
public class Main  
{  
    public static void main(String args[])   
    {  
        Parent p = new Child();  
        //calling display() method by parent class object  
        p.display();  //"display() method of the parent class." 
    }   
}  
``` 
## 10. Difference between Method Hiding and Method Overriding


![image.png](/images/blog/top-oops-interview-questions-answers/image03.png)

## 11. Can a class be called abstract if there are no abstract methods?

A class that is declared with an abstract keyword is called an Abstract class.

It may or may not contain abstract methods.

So YES, a class can be abstract even though it has no abstract methods.

Also, we cannot instantiate an Abstract class.


## 12. Why do we need an Abstract class, if we cannot create its object?

An abstract class can be used as a template for other classes. It can provide common functionalities and the default implementation of methods to the sub-classes.

For eg: **Abstract Class Animal **

All animals move and breathe and reproduce so these can be put into the Animal Class.

Now

Concrete Class **Dog, Cat**, etc. have these base functions already provided.

## 13. Can we declare abstract methods as private?

No. Abstract methods can not be private. If abstract methods are allowed to be private, then they will not be inherited by the sub-class and will not get enhanced.

## 14. Why do we need constructors in abstract class if we can't instantiate it?

As we know that we can't create an object of an abstract class but we can create the object of its sub-class.

From the sub-class constructor, we need to implicitly call the parent class(which is abstract) constructor using super()


```
 abstract class Parent{
    String name;
    Integer age;

    public Parent(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}
class Child extends Parent{
    String course;

    public Child(String name, Integer age, String course) {
        super(name, age);
        this.course = course;
    }
}
public class AbstClassExample {
    public static void main(String[] args) {
        Child c = new Child("Ishan",25,"Science");
    }
}

``` 

In the above example, the Parent class is abstract and has 2 instance variables **name and age**.

We have created a Child class, which has 1 instance variable **course**.

When we create an object of the child class, to initialize name and age, we call the Parent class constructor using super().

That's why the abstract class should have a constructor.

## 15. What is an interface and explain its need?

The interface is a blueprint of the class with static final data variables and abstract methods.

It is used to achieve abstraction as there are only abstract methods and not method bodies.
The interface is also used to achieve Multiple Inheritance, unlike classes.

Just like the abstract class, it cannot be instantiated.

Since Java 8, we can have default and static methods in an interface.

Since Java 9, we can have private methods in an interface.


![image.png](/images/blog/top-oops-interview-questions-answers/image04.png)

[Image Source](https://www.javatpoint.com/interface-in-java)


## 16. What is a marker interface?

This type of interface does not contain any data member or member functions.
So, the class with implements these interfaces, provides run-time type information about objects, so the compiler and JVM have additional information about the object.

Eg:  Serializable, Cloneable, Remote, etc.
```
public interface Serializable{  
}  
``` 
## 17. What is the significance of the final variable, method, and class?

final variable - Its value can't be changed

final method - This method can't be overloaded or overridden

final class - This class can't be inherited

## 18. What is the blank final variable?

When the variable is not initialized at the time of declaration, then that variable is called a blank final variable

This variable can be initialized only in the constructor.


```
class B {
    final String name;

    B(String name) {
        this.name = name;
    }
}
``` 

## 19. What is the use of the super keyword in java?

The **super** keyword is used to refer to the immediate parent of the class.

We can use super for 3 different cases

1. To refer to immediate parent class instance variable
> super.variable_name

2. To refer to immediate parent class method 
> super.method_name()

3. To refer to immediate parent class constructor
> super() (if we want to call the parameterized constructor of the parent class we can add the parameter as well)


## 20. What is constructor chaining and explain its need?

Constructor chaining is the process of calling one constructor from another constructor.

Constructor chaining can be done in 2 ways

1. Calling another constructor in the same class using **this()** keyword

2. Calling super class constructor from subclass using **super()** keyword

**Constructor chaining within the same class using this() keyword
**

```
class Test{
    public Test() { //constructor 1
        this(10); //calling constructor 3
        System.out.println("Default constructor called");
    }
    Test(int x, int y){ //constructor 2
        System.out.println("Parameterized constructor with 2 params called");
    }
    Test(int x){ //constructor 3
        this(10, 15); //calling constructor 2
        System.out.println("Parameterized constructor with 1 params called");
    }
}
public class ConstChaining {
    public static void main(String[] args) {
        new Test();
    }
}
/*
Parameterized constructor with 2 params called
Parameterized constructor with 1 param called
Default constructor called
*/
``` 

**Constructor chaining using super() keyword
**

```
class Base {
    public Base() {
        System.out.println("Parent class - Base constructor called");
    }
}

class Derived extends Base {
    public Derived() {
        super(); // Note - even if we do not explicitly mention super(), still compiler will add this statement
        System.out.println("Child class - Derived constructor called");
    }
}
public class ConstChaining {
    public static void main(String[] args) {
        new Derived();
    }
}
/*
Parent class - Base constructor called
Child class - Derived constructor called
*/
``` 
**Need**

When we want to pass parameters to different constructors using a single object.  Using constructor chaining, we can perform multiple tasks through a single constructor instead of writing each task in a single constructor.

## 21. What is a Copy constructor?

A copy constructor is used when we want to create an object using another object of the same java class.

When we want to create a deep copy of an object or when an object is too complex, copy constructor can be used.


```
class Animal{
    private String name;
    private String color;
    private int age;
    private String sound;
    private String type;

    public Animal(String name, String color, int age, String sound, String type) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.sound = sound;
        this.type = type;
    }

    public Animal(Animal a) {
        this.name = a.name;
        this.color = a.color;
        this.age = a.age;
        this.sound = a.sound;
        this.type = a.type;
    }
}
public class CopyConstructor {
    public static void main(String[] args) {
        Animal a1 = new Animal("Dog","White",3,"Bark","Pet");
        Animal a2 = new Animal(a1);

        System.out.println(a1.hashCode());
        System.out.println(a2.hashCode());
    }
}
/*
1828972342
1452126962
 */
``` 
If we see the output the hashcode is different for both objects, which means they are independent of each other.

## 22. Why do we need a private constructor?

Private constructors restrict the instantiation of a class. 

When a class needs to prevent other classes from creating its objects then private constructors are used.

The best example of the private constructor is a singleton design pattern which says that only one instance of the class exists at a point in time.


```
class TestClass
{
    private static TestClass object = null;

    private TestClass()
    {
        //private constructor
    }

    public TestClass getObject()
    {
        if(object == null)
        {
            object = new TestClass();   //Creating object using private constructor
        }

        return object;
    }
}
``` 

## 23. What is Inheritance?

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
But since the child class inherits the parent class, m1()(from parent class) is also available to the child class.<br/>

## 24. What are the different types of Inheritance?

**a) Single Inheritance**<br/>

![image.png](/images/blog/top-oops-interview-questions-answers/image05.png)

It is the simplest type. When one class extends another(only one) class, that type is called single inheritance.<br/>
Here, B is inheriting A. Class A is the parent class and Class B is the child class.<br/>

**b) Multilevel Inheritance**<br/>

![image.png](/images/blog/top-oops-interview-questions-answers/image06.png)

Multilevel inheritance refers to the chain of inheritance.<br/>
As in the above image, C is the child class of B and B is the child class of A.<br/>
Here, Class C will have all the methods and variables of A and B as well.<br/>

**c) Hierarchical Inheritance**<br/>

![image.png](/images/blog/top-oops-interview-questions-answers/image07.png)

In this type, one class has multiple sub/child classes.<br/>
In the above example, **B, C, and D** are *child classes* of the same Parent **A**.<br/>

**d) Multiple Inheritance**<br/>

![image.png](/images/blog/top-oops-interview-questions-answers/image08.png)

When one class extends(or inherits) multiple classes. This type is called Multiple inheritances.<br/>

Java does not support multiple inheritances

## 25. Why multiple inheritance is not supported in Java?

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
Let's suppose C inherits A and B where both A and B have a method m1() with the same signature.<br/>
So when the object of C is created and c.m1() is called, which m1() method will be executed?<br/>
This is an ambiguity due to which java doesn't support multiple inheritances for classes.<br/>
But we can make use of multiple inheritances in terms of interfaces because in interfaces as the methods are abstract, even though 2 parent interfaces have the same abstract method their implementation will always be done once.<br/>

## 26. Why multiple inheritance is supported by interfaces and not by classes?

As we already know, multiple inheritances are not supported in class due to ambiguity, but it is supported in interfaces because the implementation of the method which is common in both interfaces is provided only once in the implementation class.

This resolves the ambiguity problem.


```
interface A {
    void display();
}
interface B {
    void display();
}
class C implements A,B {

    @Override
    public void display() {
        System.out.println("Implementing display() in child class");
    }
}
``` 
In the above example, Class C implements the ***display()*** method, and as we can only create objects of the class and not the interfaces, there will not be any ambiguity while calling the ***display()*** method.

## 27. Which class is the Parent of all classes and why do we need it?

Object class is the superclass of all the classes.

Every object has some common properties and methods which every Java developer needs to implement it.

For eg : equals(), hashcode(), toString(), etc.

To reduce the burden on the developer SUN developed a class called Object by implementing all these properties and methods.

All these methods have generic logic common for all the subclasses, if this logic is not satisfying the subclass requirement then the subclass can override it.

## 28. Are static members inherited to sub-class?

Yes, Static members are also inherited from sub-classes.


```
class A
{
    static int i = 10;
 
    static void method()
    {
        System.out.println("Static Method");
    }
}
 
class B extends A
{
 
}
 
public class StaticInitializers
{
    public static void main(String[] args)
    {
        B.method();       //Calling inherited static method     
 
        System.out.println(B.i);    //printing inherited static field.
    }
}
``` 
## 29. Are constructor and instance initialization blocks inherited to subclass?

No, the constructor and instance initialization block of the superclass cannot be inherited from its subclass but they are executed while creating an object of the subclass.


## 30. What is an Instance initializer block?

The instance Initializer block is used to initialize the instance data member. It runs each time when the object of the class is created.

## 31. What is the use of the Instance Initializer Block if we can directly initialize data members of the class?


```
class MyClass{
    int[] arr;
    {
        // insert 10 at even index and 20 and odd index
        arr = new int[10];
        for(int i=0;i<arr.length;i++){
            if(i%2==0){
                arr[i]=10;
            }else {
                arr[i]=20;
            }
        }
    }
}
``` 

We can directly initialize data members but if we want to implement some logic while initializing then it can be useful.

In the above example, we have used for loop, and at even indices, we add 10 and 20 at odd indices.

## 32. What is invoked first, instance initializer block or constructor?

Let's take the below example,


```
class Car {
    Car() {
        System.out.println("Car Constructor called");
    }
    {
        System.out.println("Instance Initializer invoked");
    }

}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
    }
}

``` 
> Instance Initializer invoked

> Car Constructor called

By looking at the output, we could say the instance initializer block is invoked first and then the constructor.

But that's not the case, Instance initializer block is invoked at the time of object creation. 

The java compiler copies the instance initializer block in the constructor after the first statement super().

So, we can say that Constructor is invoked first.


![image.png](/images/blog/top-oops-interview-questions-answers/image09.png)

[Image Source](https://www.javatpoint.com/instance-initializer-block)

So, to summarize

1. Instance Initializer block is invoked at the time of object creation i.e it gets invoked inside the constructor

2. It is invoked after the parent class constructor is invoked i.e after the super() statement.





