---
title: Why static block executes before the main() ?
date: '2022-02-14T15:30:51.337Z'
slug: why-static-block-executes-before-the-main
tags:
  - Java
coverImage: /images/blog/why-static-block-executes-before-the-main/cover.png
---

Welcome to the Java Shorts Series.

In this article, we will understand what is static block and why it executes before the main() method.

## What is a static block in Java?

When we create a block with a static keyword, that is called a static block. It is used for the **static initialization** of a class.
Code inside the static block is executed only once when the class loads.


```
class Test{
    static int i; // static variable
    
    //static block
    static{
        i=10;
        System.out.println("Static block executed");
    }
    public static void main(String[] args) {
        System.out.println(Test.i); 
        System.out.println("Main() executed"); 
    }
}
``` 
> 
OUTPUT<br/>
Static block executed<br/>
10<br/>
Main() executed<br/>

## Execution Process

We have created a static block where we initialize static variable 'i' to 10 and print a statement.

In the main(), we print 'i' and another statement.

When we **compile **the Test class (command - javac Test.java), the dot class file or the **byte code** is generated.

When we execute the dot class file( command - java Test), 3 events take place:-
1. JVM loads the dot class file into the memory.
2. **During **the process of dot class **loading**, the static block gets **executed**. 

3. **After **the loading, JVM searches for the main() method, if the main() method is found it executes that or throw an error that the main() method is not found.

So, we can say that the static block executes before the main() method.

## Important points about the static block
1. Till Java 1.6 version, we could execute a static block without the main() method but from the** 1.7 version **onwards we need the main() method to see the static block execution.
2. We cannot access instance members in a static block.                                                                           
3. If there are multiple static blocks, execution will be done **top to bottom **in the order, the blocks are present in the code.
4. As a class loads only once, a static block is also** executed once**.

## Conclusion
That is it for this article. If you find this helpful, do give it a like👍

If you have any feedback for this Java Shorts series, please comment.

You can connect with me on Twitter [@ritesh_p37]( https://twitter.com/ritesh_p37).

Thanks for reading! Bye!
