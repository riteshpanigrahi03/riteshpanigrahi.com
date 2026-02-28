---
title: "Can the main() method be overloaded in Java?"
date: "2022-04-18T16:00:59.325Z"
slug: "can-the-main-method-be-overloaded-in-java"
tags: ["Java"]
coverImage: "/images/blog/can-the-main-method-be-overloaded-in-java/cover.png"
---

Hello everyone, in this quick article we will understand whether we can overload the main() method or not.

### Let us first quickly understand what Method Overloading is?

When a class has multiple methods with the same name but differentiates on basis of the number of arguments or types of arguments or order of arguments, that feature is called Method Overloading.

### Now, let's get back to the question, can we overload the main() method?

The answer is YES, like any other method we can also overload the main() method.

But what will be the **impact if we overload the main() method?**

The main() method is the starting point of the java program, JVM looks at the main() method with the below signature.

```
public static void main(String args[])  
```
Without the main() method, JVM will not execute the program.

So, even if we overload the main() method, JVM will always call the original method(with the above signature).


```
class MainMethodOverload {
    public static void main(String[] args) {
        System.out.println("Orignal main() method"); 
    }
    public static void main(Integer[] args) {
        System.out.println("Overloaded main() method with Integer[] args parameter"); 
    }
}
``` 

```
OUTPUT

Orignal main() method
``` 

So, how to call the overloaded method?

We need to call them from the original main() method.

<hr/>

That's it for this quick article.

If you find this helpful, do like it ❤

Any feedback/suggestions, do comment below.

Keep Learning, till then Bye👋