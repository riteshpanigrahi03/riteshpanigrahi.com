---
title: "Lambda Expression in Java - Part 1"
date: "2021-11-21T18:12:38.365Z"
slug: "lambda-expression-in-java-part-1"
tags: ["Java", "lambda"]
coverImage: "/images/blog/lambda-expression-in-java-part-1/cover.png"
---

Hi,<br/>
In this tutorial, we will understand Lambda Expressions in Java.<br/> First, we will understand the what and why of the lambda expression, then we will jump into the details.<br/>
## What is a lambda expression?<br/>
Lambda expression was added in Java 8.<br/>
It is a block of code that takes in parameters and returns a value. It is an anonymous function with no name, no modifier, and no return type<br/>

## Why Should we use lambda expression?<br/>
To understand the why, we need to actually understand lambda expression, so as of now just note down the below points we will again come back to it.<br/>
1. It introduces functional programming in java<br/>
2. Helps to reduce lines of code or helps to remove boilerplate code<br/>
3. Using lambda expression makes code readable and concise<br/>
4. Easy to use with API's<br/>

## Now, let's understand - When to use lambda expressions?<br/>
We have an interface Greeting which contains only one abstract method send().<br/>

```
public interface Greeting {
    void send();
}
``` 



We have a MessageSender class, in that we have a method sendMessage() which takes Greeting as a parameter and just calls the send method of the parameter.<br/>


```
public class MessageSender {
    public void sendMessage(Greeting greeting){
        greeting.send();
    }
}

``` 


Also, we have created two implementations on the interface Greeting- HelloWorldGreeting and GoodByeGreeting which overrides send() method and print different messages accordingly.<br/>

```
public class HelloWorldGreeting implements Greeting {
    @Override
    public void send() {
        System.out.println("Hello World");
    }
}

``` 

```
public class GoodByeGreeting implements Greeting {
    @Override
    public void send() {
        System.out.println("Good Bye");
    }
}

``` 
Now let's see the Main class<br/>


```
public class Main {
    public static void main(String[] args) {
        HelloWorldGreeting helloWorldGreeting = new HelloWorldGreeting();
        GoodByeGreeting goodByeGreeting = new GoodByeGreeting();
        MessageSender messageSender = new MessageSender();
        messageSender.sendMessage(helloWorldGreeting);
        messageSender.sendMessage(goodByeGreeting);
    }
}
``` 
We have created objects of both the class HelloWorldGreeting and GoodByeGreeting and passed the objects to the sendMessage() method of the MessageSender class.<br/>


```
OUTPUT
Hello World
Good Bye
``` 
Now suppose we need 2 new messages so we need to create 2 new implementations of the Greeting interface again?<br/> No need instead we can use anonymous classes for creating new instances.<br/>


```
Greeting newGreeting = new Greeting() {
            @Override
            public void send() {
                System.out.println("Happy Journey");
            }
 };
messageSender.sendMessage(newGreeting);
``` 
Still, we are passing an instance of the class which has a method send() (action), what if we pass the action directly as an argument.<br/>

Here comes the concept of lambda expressions. <br/>
This is how we will pass a lambda expression as an argument.<br/>


```
Greeting lambdaExp = ()->System.out.println("Hello World");
messageSender.sendMessage(lambdaExp);
``` 
Here we can say that the lambda expression is the same as the send() method.<br/>
Now let us understand how the convert the send() method to lambda expression<br/>


```
Greeting lambdaExp = public void send() {
        System.out.println("Hello World");
}
```

1. remove access modifier and return type
```
Greeting lambdaExp = send() {
        System.out.println("Hello World");
}
```
2. remove the method name as lambdaExp already has a name
```
Greeting lambdaExp = () {
        System.out.println("Hello World");
}
```

3. add -> after the ()
```
Greeting lambdaExp = () -> {
        System.out.println("Hello World");
}
```

4. Now the lambda expression is ready since it has only one statement we can even remove the {}
```
Greeting lambdaExp = ()->System.out.println("Hello World");
``` 
Now here there can be a question.<br/>
### **How does the lambda expression know that it corresponds to the send() method of the interface?**<br/>
If we notice that the interface has only 1 abstract method, so java automatically infers that the given implementation is for the abstract method.<br/> Here, comes the important point - 
*lambda expression only works when the interface has just 1 abstract method and such interfaces are called Functional Interfaces*.<br/>
As the best practice, if we want an interface to use for lambda expression we can use *@FunctionalInterface* annotation so that if we add more abstract method to the same interface java give a compile-time error.<br/>

So, to summarize till here<br/>
If the interface has only one abstract method, that is called Functional Interface.<br/>
How to use Functional Interface?<br/>
1. Create  new classes which implement the interface<br/>
2. Use anonymous class<br/>
3. Use lambda expression<br/>

## Lambda Expression != Inner Class
In the above example, we have seen if we create an inner class or lambda expression both perform the same way, but both are different in terms of : scope<br/>
Let us understand this example.<br/>

 
```
public class ThisReference {
    void doProcess(int i, Process p){
        p.process(i);
    }
    void execute(){
        //call using inner class
        doProcess(10, new Process() {
            @Override
            public void process(int i) {
                System.out.println(i);
                System.out.println(this); // this refer to instance of inner class
            }
             public String  toString(){
                return "This is from Inner class";
             }

        });

        //call using lambda expression
        doProcess(10, i->{
            System.out.println(i);
            System.out.println(this); // this refers to the instance where it is called
        });

    }

    public String toString(){
        return "This is from ThisReference class";
    }

    public static void main(String[] args) {
        ThisReference thisReference = new ThisReference();
        thisReference.execute();
    }

}
interface Process{
    void process(int i);
}


``` 
In the above example, we have an interface Process that has only 1 abstract method - process(int i)<br/>
We have a class ThisReference, its execute() method calls its doProcess() method a couple of times.<br/>
In the first call, it uses an inner class - here "this" refers to the instance of the inner class <br/>and in the second call, it uses lambda expression - here "this" refers to the instance where it is called.<br/>


```
OUTPUT
10
This is from Inner class
10
This is from ThisReference class
``` 
**
One more question which can come to your mind is - What new we can do using lambda expression?**<br/>
We are not doing something new using lambdas, we are just making the code more readable and neat. Even before lambdas were introduced in Java 8, all the tasks were possible.<br/>
Also using lambdas we can send functions as arguments to another function.
<br/>

## Conclusion<br/>
So far, in this article, we have seen what is lambda expression, why and when to use lambda expression.<br/>
In the  [next article](https://riteshpanigrahi.hashnode.dev/lambda-expression-in-java-part-2) , we will see about closures in lambda expressions, some already available interfaces in* java.util.function* package, and some more concepts.
<br/>
If you have any suggestions regarding this article, do mention them in the comments.<br/>Thanks!! Keep Learning !!










