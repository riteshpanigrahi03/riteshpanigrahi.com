---
title: "Java OOPS - Polymorphism - Part 3"
date: "2022-01-07T03:35:08.032Z"
slug: "java-oops-polymorphism-method-overriding"
tags: ["Java", "oop"]
coverImage: "/images/blog/java-oops-polymorphism-method-overriding/cover.png"
---

Welcome to the 7<sup>th</sup> article of this series, we will learn about method overriding and some rules while overriding and in the end, we will also see the comparison between overload and overriding.<br/> <br/> 
When a subclass (child class) is created from its Parent, all the methods are inherited to the child.<br/> 
If for some method implementation in parent class, child class is not satisfied then we can change the implementation of that method in the child class.<br/>  This is called **method overriding**.<br/> 

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
Here we have a Parent and Child class.<br/> 
Parent has 2 methods m1 which squares the integer passed and m2 prints the string.<br/> <br/> 
When a Child class inherits parent class, it receives both the methods.<br/>  But here child class is not satisfied with the implementation of the m1 method, the child class wants to add the integer passed with itself instead of square.<br/>  So we can change the implementation of the m1 method in child class.<br/> 
*Please note that the method signature of m1 is the same in both parent and child.
I hope this is clear*.<br/> 
Now let's create another object of child class with parent reference.<br/> 

```
Parent p1 = new Child();
p1.m1(3); //Child class - 6
``` 
Now here m1 method is called, **which m1 method will get executed? Parent or Child?**<br/> 
So, the compiler role here is to just check since the reference if of type Parent, does parent class has a method with signature m1(int)?<br/>  Yes, so it gives a green signal to JVM.<br/> 
Now at runtime, JVM checks that the object is of type Child, so the m1 method of child class will get executed.<br/> 


> 
As JVM does the method resolution at runtime, method overriding is also known as Runtime Polymorphism or Dynamic Polymorphism or Late Binding.

## Rules for Overriding
### Rule 1:<br/> 
While overriding a parent class method in the child class, the method signature should be the same for both methods.<br/> 

### Rule 2:<br/> 
Return type of the methods.<br/> 
Return types can be of 2 types- Primitive and Object type<br/> 

1. Primitive<br/> 
In case the return type is primitive like int, long, double compulsorily the return type of overriding method should be the same.<br/> 

2. Object Types<br/> 
Till Java 1.4 version even Object return types like Integer, String, Object, etc required to be the same<br/> 
But from the 1.5 version onwards, the return type of the overriding method can be of co-variant type.<br/> 
Now, **what is co-variant type?**
Suppose, the parent class method which child overrides has return type A, then the child method can have the same type A or child classes of A.<br/> 

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
Here child class method has return type String, which is a child of Object(return type of Parent m1 method)<br/> 

### Rule 3: Modifiers<br/> 
**private** - Overriding concept is not applicable to private methods as they are not visible outside the class.<br/> 

**final**- If we try to override the final method we will get a compile-time error, so the overriding concept is not for final methods as well.

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
java: m1(int) in polymorphism. Child cannot override m1(int) in polymorphism.Parent
  the overridden method is final
*/
``` 
Overriding a non-final method and making it final in the child class is possible.<br/> 

abstract- We can override an abstract method and make it non-abstract.<br/>  Also, we can override a non-abstract method and make an abstract(but then the child class of the child class has to provide implementation)<br/> 

### Rule 4: Scope of access modifiers<br/> 
While overriding a method we can't reduce the scope of access modifiers but can increase it or keep it the same.<br/> 

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
### Overriding static methods<br/> 

Overriding static methods to non-static and vice-versa is not allowed because static methods are class level and non-static methods are object level.<br/> 
But we can definitely override the Parent static method in the Child class making the method static.<br/> 

```
public class Parent {
    public static  void m1(int a){
    }
}
class Child extends Parent{
    public static void m1(int a){
    }
}
``` 

But this concept is not called overriding, it is called Method Hiding.
So,**what is the difference between overriding and method hiding?**<br/> 


![image.png](/images/blog/java-oops-polymorphism-method-overriding/image01.png)

### Comparison between Overloading and Overriding

![image.png](/images/blog/java-oops-polymorphism-method-overriding/image02.png)

### Conclusion
This was it about Method Overriding.<br/>
Here we come to the end of the Java OOPs series.<br/>
If you have not read other articles of this series, visit  [here](https://riteshpanigrahi.hashnode.dev/java-oops-classes-and-objects) .<br/>
If you find this helpful, do give it a like.<br/>
Any suggestions do comment below.<br/>
Thanks for Reading.<br/>


