---
title: "Why super() must be the first statement in a constructor?"
date: "2022-04-19T18:17:56.121Z"
slug: "why-super-must-be-the-first-statement-in-a-constructor"
tags: ["Java", "interview"]
coverImage: "/images/blog/why-super-must-be-the-first-statement-in-a-constructor/cover.png"
---

### Why do we need super()?

When we create a sub-class from a super-class, the subclass inherits all the properties of the super-class.

Subclass and superclass share an "IS-A" relationship.

For example, we have a superclass Animal and a subclass Dog. So, Dog IS-A Animal.

Before Dog is created, it must first be an Animal.

Therefore, whenever the constructor of the subclass is called, that means we are creating the object of that subclass.

Before that, the superclass object should be ready.

This is the reason, why the first statement of the subclass constructor must be super(). With this when we call the subclass constructor, a superclass object is also created.


```
class A {
    private int[] arr;
    A(){
        arr = new int[2];
    }
    public int getFirstElement(){
        return arr[0];
    }
}
class B extends A{
    B(){
        super();
        System.out.println(super.getFirstElement());
    }
    public static void main(String[] args){
        B b = new B();
    }
}

``` 

```
OUTPUT

0
``` 

Even if we do not mention super(), by default Java adds the super() as the first statement.


### Now, let's come to the question, why super() should be the first statement?


```
class A {
    private int[] arr;
    A(){
        arr = new int[2];
    }
    public int getFirstElement(){
        return arr[0];
    }
}
class B extends A{
    B(){
        System.out.println(super.getFirstElement());
        super();
    }
    public static void main(String[] args){
        B b = new B();
    }
}
``` 

```
error: call to super must be the first statement in the constructor
``` 


Here, super() is the second statement of B(), let us suppose this is compiled successfully(which in reality will not).

Since, super() is executed after *System.out.println(super.getFirstElement())*, arr will not be initialized and we will get NullPointerException.

But java saves us from the Runtime exception instead it throws the compile-time error.

Therefore, super() must be the first statement so that parent class variables are all initialized before being accessed by the subclass.

<hr/>

That's it for this article.

If this was helpful, do like it ❤

Keep Learning!!

Let's meet at the next one👍


