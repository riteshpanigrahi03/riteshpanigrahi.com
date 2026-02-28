---
title: "Java OOPS - Polymorphism - Part 2."
date: "2022-01-06T02:37:04.906Z"
slug: "java-oops-polymorphism-method-overloading"
tags: ["Java", "OOPS"]
coverImage: "/images/blog/java-oops-polymorphism-method-overloading/cover.png"
---

Welcome to the 6<sup>th</sup> article of this series, we will understand what is method overloading, compile-time polymorphism, static polymorphism, and much more.<br/>
### When do we say multiple methods are overloaded?<br/>
When methods have the same name but different arguments type.<br/>

```
public void m1(int a){}
public void m1(long a){}
``` 

### Why do we need method overloading?<br/>
In C language (not OOP language), to calculate the absolute value of an integer we have the abs() method.<br/> Similarly, for the long value, we have labs().<br/> This may increase the complexity as for different data types we need to remember different methods.<br/>
But in Java, with the help of the method overloading concept, we have a single method abs() for every datatype.<br/>

![image.png](/images/blog/java-oops-polymorphism-method-overloading/image01.png)
As we can see, the method name (abs) is the same just the arguments are of different types, which is nothing but method overloading.<br/>

I hope this is clear till now.<br/>
Let's understand more concepts using different examples.<br/>

### Example 1: Why method overloading is called compile-time polymorphism?

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
Here, we have 3 overloaded methods:- **No argument method,  Integer argument, and String argument**.<br/>
Accordingly, the program gets executed on all the 3 method calls. (Output is commented)<br/>
Now, in the last article, we learned about method signature and also saw how the compiler does the method resolution.<br/>

> 
In this example, the reference type used in method calls is  Test(t) and method resolution is done by the compiler at compile-time, so method overloading is also called compile-time polymorphism or static polymorphism, or early binding.<br/>

### Example 2:- Automatic promotion in overloading<br/>

```
public class Test {
    public void m1(float a){
        System.out.println("Float argument method called");
    }
    public void m1(int a){
        System.out.println("Integer argument method called");
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.m1(10);//Integer argument method called
        t.m1(10.5f);//Float argument method called
    }
}
``` 
Here we have 2 overloaded methods, one takes an int argument and the other take float.<br/>
This is the same as the earlier example.<br/>
Now if we call the m1 method with a character argument.<br/>

```
t.m1('a');
``` 
**What will the output be? Compile-time error?<br/>**
No.<br/>
Here, automatic data type promotion comes into the picture.
![image.png](/images/blog/java-oops-polymorphism-method-overloading/image02.png)
Whenever we call m1('a'), the compiler searches in the method signature table for an exact match, as in this example we don't have a method that takes char argument, the compiler **doesn't automatically give a compile error**.<br/>
It checks whether this character can be promoted to any of the other data types as per the above picture.<br/>
Since character can be promoted to integer and we do have a method that takes an integer argument, then that method will be called.<br/>
So the output will be  <br/>
```
t.m1('a'); //Integer argument method called
``` 
Similarly, if we call<br/>

```
t.m1(10.5);
``` 
Here, 10.5 is a double type and double can't be promoted to any other type.
Now the compiler will give a compile-time error.<br/>

```
java: no suitable method found for m1(double)
    method polymorphism.Test.m1(float) is not applicable
      (argument mismatch; possible lossy conversion from double to float)
    method polymorphism.Test.m1(int) is not applicable
      (argument mismatch; possible lossy conversion from double to int)
``` 
### Example 3:- Parent and Child both available


```
public class Test {
    public void m1(Object o){
        System.out.println("Object argument method called");
    }
    public void m1(Integer a){
        System.out.println("Integer argument method called");
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.m1(new Object());//Object argument method called
        t.m1(10);//Integer argument method called
        t.m1(null);//Integer argument method called

    }
}
``` 
Here one method takes Object(Parent of all classes) and the other takes Integer(child of Object).<br/>
So when we call m1(null), null can be an Object as well as Integer. 
**Which one will be called?** <br/>
In this case, always child argument method will be called.<br/>

But if the argument of both methods doesn't have a parent-child relationship.<br/>
For eg:<br/>

```
public void m1(String s){
        System.out.println("String argument method called");
    }
    public void m1(StringBuffer s){
        System.out.println("StringBuffer argument method called");
    }
``` 
If we call m1(null), then we will get a compile-time error.<br/>

### Example 4:- General Method and Variable Argument Method
Suppose we have 2 overloaded methods, one takes a single int argument, and the other takes variable integers.<br/>

```
public class Test {
    public void m1(int a){
        System.out.println("General method called");
    }
    public void m1(int... a){
        System.out.println("Variable argument method called");
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.m1();//Variable argument method called
        t.m1(10,20);//Variable argument method called
        t.m1(10); //General method called
    }
}
``` 
So, when we call m1(10), this matches both the methods but the general method will get preference and will get executed.<br/> Variable-arg methods always get the least priority.<br/>

### Example 5:- Argument reorder

```
public class Test {
    public void m1(int a,float b){
        System.out.println("int-float method  called");
    }
    public void m1(float a,int b){
        System.out.println("int-float method  called");
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.m1(10,10.5f);//int-float method  called
        t.m1(10.5f,10);//int-float method  called

        t.m1(10,5);
    }
}
``` 
Here, m1 is overloaded because the argument order is different in both methods.<br/>
-> 1st method takes an int as the first argument and then a float.<br/>
-> 2nd method takes a float as the first argument and then int.<br/>
The first two calls in the main method are simple.
But the 3rd call, m1(10,10) it matches both the methods. **How**?<br/>
For the 1st method, m1(int, float) - second argument 5 will get **promoted **to float.<br/>
For the 2nd method, m1(float, int) - first argument 10 will get **promoted **to float.<br/>
So, here we will get the ambiguous error.<br/>

```
java: reference to m1 is ambiguous
  both method m1(int, float) in polymorphism.Test and method m1(float, int) in polymorphism.Test match
``` 
### Example 6:- Method resolution is done using reference type.

```
class Animal{

}
class Monkey extends Animal{

}
public class Test {
    public void m1(Animal a){
        System.out.println("Animal version");
    }
    public void m1(Monkey m){
        System.out.println("Monkey version");
    }
    public static void main(String[] args) {
        Test t = new Test();
        Animal a = new Animal();
        t.m1(a);//Animal version
        Monkey m = new Monkey();
        t.m1(m);//Monkey version

        //parent reference can hold child object
        Animal b = new Monkey();
        t.m1(b);//Animal version
    }
}
``` 
Here, we have created 2 classes Animal and Monkey(child of animal).<br/>
In the main method, we created 2 objects one for Animal and the other for Monkey. <br/>
The first two calls to m1 are simple as before.<br/>
For the 3rd call, we have to use Animal reference(b) to hold the Monkey object and then we pass 'b' as an argument to m1.<br/>
Earlier we discussed that **method resolution in overloading is done at compile-time and reference type is used for it**.
Here, reference type if of Animal so m1 which takes Animal argument will be called.<br/>
 
### Conclusion
In this article so far we saw what is method overloading and how it works in different cases.<br/>
We understood why method overloading is called compile-time polymorphism/early binding/static polymorphism.<br/>
In the next article, we will start with method overriding.<br/>
If you have any queries/suggestions do comment below.<br/>
Thanks for Reading.<br/>


     
