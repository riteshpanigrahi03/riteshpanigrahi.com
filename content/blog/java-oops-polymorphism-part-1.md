---
title: "Java OOPS  - Polymorphism - Part 1"
date: "2022-01-05T03:08:03.613Z"
slug: "java-oops-polymorphism-part-1"
tags: ["Java", "oop"]
coverImage: "/images/blog/java-oops-polymorphism-part-1/cover.png"
---

Welcome to the 5<sup>th</sup> article of this series.<br/>
From this article onwards we will start understanding one of the important concepts in OOPS which is polymorphism.<br/> We will learn what is overloading, overriding, static and dynamic binding.<br/>
But before that let us first learn about ***method signature*** because this term will be used many times and we should have a clear understanding of it.<br/>

Let us consider the below method and try to get its method signature.<br/>

```
public int m1(int a , float b){
        //do something
}
``` 
**m1(int, float)** is the method signature of the above method.<br/>
By this, we can say method signature in java consists of ***method name and datatypes of arguments in the exact order***.<br/>
As of now, we know how to get the method signature of a method.<br/> Now there might be a question that - What is the use of it? Who will make use of the method signature?<br/>
Java Compiler uses method signature while resolving method calls. Let us take an example and understand this.<br/>

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
The Test class has 2 methods m1 and m2.<br/>
So compiler maintains a method table that stores the method signature of all the methods.<br/>

![image.png](/images/blog/java-oops-polymorphism-part-1/image01.png)

So whenever we call t.m1(10) compiler checks<br/>
1. t is of type Test
2. In the Test method table, do we have any method with signature m1(int)? YES
3. Executes successfully.<br/>

Now let's try to call a method whose signature is not in the method table.<br/>

```
t.m3(10.5);
``` 
Can you guess the output?<br/>
Yes, we will get a compile-time error.<br/>

```
java: cannot find symbol
  symbol:   method m3(double)
  location: variable t of type polymorphism.Test
``` 
I hope this is clear to all.<br/>
Now, if you have noticed in the method signature we don't have the return type in it.<br/>
Can we create 2 methods with the same signature and different return types?<br/> Let's see.<br/>

```
public void m1(int a){
        System.out.println(a);
}
public int m1(int a){
        return a;
}
``` 

```
Compile Error - java: method m1(int) is already defined in class polymorphism.Test
``` 
We get a compile-time error in this case.<br/>

So that's it for this article if you have any suggestions please comment.<br/>
In the next article, we will start with the overloading concept.<br/>
Thanks for reading.<br/>
