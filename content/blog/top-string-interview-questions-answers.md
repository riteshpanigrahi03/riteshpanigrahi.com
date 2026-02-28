---
title: "Top String Interview Questions & Answers"
date: "2022-11-26T14:58:45.659Z"
slug: "top-string-interview-questions-answers"
tags: ["Java", "java interview questions"]
coverImage: "/images/blog/top-string-interview-questions-answers/cover.png"
---

## What is the String class in Java?

String is an object that represents a sequence of char values.

Java String class is final and it implements **Serializable, Comparable, and CharSequence** interfaces.

```
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence
``` 

**CharSequence **- It represents a **sequence of characters**, along with String class, StringBuffer and StringBuilder also implement this interface.

We will talk about these classes further.

**Comparable **- It **allows String to be compared** with each other

**Serializable** - This allows the String class to **convert the state** of an object into a byte stream.

We can create String in 2 ways

**Using new keyword**

```
String s = new String("Hello World");
``` 

**Using String literal**

Java String literal is created by using double quotes. For Example:

```
String s = "Hello World";
``` 
In the case of literals, each time when we create a literal, JVM first checks in a special memory "**string pool**". If the literal is **already present** then **JVM won't create a new instance** (we will learn more about this in further questions)

## What is a String pool?

A string Pool is a special place in heap memory where **literals are stored**.<br/>
![image.png](/images/blog/top-string-interview-questions-answers/image01.png)
Whenever a new literal is created, JVM checks in the string pool whether the same string already exists in the pool or not.<br/> 
If the string exists, then its reference is returned else a new string is created and placed in the pool.<br/>

If we see the first 2 statements of the above snippet, <br/>

```
String s1 = "Hello";
String s2 = "Hello";
``` 
For s1, since the pool is *empty *a new String (Hello) is created in the pool and s1 is the reference to the string.<br/>

![image.png](/images/blog/top-string-interview-questions-answers/image02.png)

For s2, since "Hello" is *already present* in the pool, JVM will **not **create a new one, instead, it will return the earlier reference of string "Hello" which is s1.<br/>

![image.png](/images/blog/top-string-interview-questions-answers/image03.png)

So, <br/>

> 
String s2 = "Hello" is same as String s2 = s1

Now, the literal "Hello" has 2 references s1 and s2.<br/>

## Why Java uses the concept of String literal?

When we use a literal to create String objects, if the literal is already present in the String constant pool, no new object is created for the same String literal just the reference of that object is changed.

So, Java uses String literal for memory efficiency.

## When you execute String str = new String("abcd")? How many String objects are created? 

```
String str = new String("abcd")
```

Here, for the String literal "abcd" one object will be created and this object will be stored in String Constant pool.

Apart from this, we are creating another object by **new String()**, so another object will be created and will be stored in Heap memory.

So, in total 2 objects will be created.

## Why is String class final or Immutable?

**Caching**

```
class HelloWorld {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
    }
}
``` 
In the above example, we might say we have created 2 String objects but if you have referred to previous questions, you might know that only 1 String object is created and 2 reference variables are referring to the same object.

Now if String would not have been immutable, then if s1 changes the String **Hello to HELLO** and as s2 also refers to the same String object, it will also see the effect.

Caching of a String is also very important for performance, so in Java String is immutable.

**Security**

Database credentials are generally passed as Strings to get the connections, as a String is immutable no one can change it.

If it had been otherwise, any hacker can cause a security issue in the application by changing the reference value.

**Multithreading**

The String is safe for multithreading because of its immutableness. Different threads can access a single "String instance". 

It removes the synchronization for thread safety because we make strings thread-safe implicitly.

## What are the different ways to compare Strings in java?

**Using equals() method**

The String class equals() method is used to compare 2 Strings based on their values/content.

String class provides 2 methods

equal() - compares values to 2 String objects
equalsIgnoreCase() - compares values by ignoring case


```
class HelloWorld {
    public static void main(String[] args) {
        String s1 = new String("Java");
        String s2 = new String("Java");
        String s3 = new String("C");
        String s4 = new String("JAVA");
        
        System.out.println(s1.equals(s2));
        System.out.println(s1.equals(s3));
        System.out.println(s1.equalsIgnoreCase(s4));
    }
}

/* OUTPUT
true
false
true
*/
``` 
**Using == operator**

== compares the references/objects, not the value.


```
class HelloWorld {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        // s1 and s2 points to same object
        // s3 points to a different object as it is created using new keyword.
        
        System.out.println(s1==s2);
        System.out.println(s1==s3);
    }
}
/* OUTPUT
true
false
*/
``` 
**Using compareTo() method**

When we want to compare 2 Strings lexicographically this method is used, it returns an integer that describes if the first string is less than, equal to, or greater than the second string.


```
Suppose s1 and s2 are two String objects:
If,
s1 == s2 : The method returns 0.
s1 > s2 : The method returns a positive value.
s1 < s2 : The method returns a negative value.
``` 


```
class HelloWorld {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "C";
        //s1 is greater or comes after s2, lexicographically.
        System.out.println(s1.compareTo(s2));
    }
}
/* OUTPUT
7
*/
``` 
## What is String Buffer?

StringBuffer class is used to create mutable/modifiable String objects. The StringBuffer class in Java is the same as the String class except it is mutable i.e. it can be changed.

StringBuffer is synchronized i.e thread-safe i.e 2 different threads cannot access same object at the same time.

Important methods of StringBuffer

**append(String s)**

This method is used to append the given String to the current String.


```
class HelloWorld {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Java ");
        sb.append("World");
        System.out.println(sb);
    }
}
/*
Java World
*/
``` 
**insert(int offset, String s)	**

This method inserts the given String object in the current String at the given position.


```
class HelloWorld {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Java");
        sb.insert(2, "World"); // insert World at position 2 in Java
        System.out.println(sb);
    }
}

/*
JaWorldva
*/
``` 
**replace(int startIndex, int endIndex, String str)**

This method replaces the characters in the current String from startIndex to endIndex with the given String str.


```
// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class HelloWorld {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Java");
        sb.replace(1, 3, "World"); // will remove 'av' from Java and insert World
        System.out.println(sb);
    }
}
/*
JWorlda
*/
``` 
There are also other different methods in StringBuffer, you can refer [here](https://docs.oracle.com/javase/7/docs/api/java/lang/StringBuffer.html)

## Difference between StringBuffer and StringBuilder

Same as StringBuffer, StringBuilder is also used to create mutable String objects.

The major difference between StringBuffer and StringBuilder is, StringBuilder is non-synchronized i.e. not thread-safe. 
It means two threads can call the methods of StringBuilder simultaneously.

## Difference between String and StringBuffer

|                                        **String**                                       |                           **StringBuffer**                          |
|:---------------------------------------------------------------------------------------:|:-------------------------------------------------------------------:|
| String class is immutable                                                               | StringBuffer class is mutable                                       |
| Slow and consumes a lot of memory while concat, because every time a new String is created   | StringBuffer is fast and consumes less memory when we concatenate. |
| Overrides equals() method of Object class, so that we can compare contents of 2 Strings | Doesn't override equals() method.                                   |

## Different ways of String concatenation

**Using +(String concatenation) operator**

```
public class Test {
    public static void main(String[] args) {
        String s = "Hello" + " World!";
        System.out.println(s);
    }
}

```
'+' operator is used to add or concatenate 2 strings.

Let us understand how it works internally.

In Java, String concatenation works using StringBuilder where we use its append() method to add new String to an existing one.

The above code transforms to:

```
String s1 = new StringBuilder().append("Hello").append(" World!").toString();
```

**String Concatenation by concat() method**

String concat() method adds a new string to the current String.

```
public class Test {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = " World!";
        String s3 = s1.concat(s2);
        System.out.println(s3);
    }
}

//Hello World!
```
Note: concat() does not modify s1, instead it creates a new String s3.

## Important String class methods

**trim()** - This method is used to remove white spaces before and after the String.

```
public class Test {
    public static void main(String[] args) {
        String s = "  Hello  ";
        System.out.println(s);
        System.out.println(s.trim());
    }
}
```
```
  Hello  
Hello
```
**length()** - Returns the length of the specified string.

```
public class Test {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s.length());//5
    }
}

```
**startsWith() and endsWith()**

The method startsWith() checks whether the String starts with the letters passed as arguments and endsWith() method checks whether the String ends with the letters passed as arguments.  

```
public class Test {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s.startsWith("Hel"));//true
        System.out.println(s.endsWith("ll"));//false
    }
}

```
**toUpperCase() and toLowerCase()**

toUpperCase() method converts this String into a uppercase letter and toLowerCase() method into the lowercase letter.

```
public class Test {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s.toUpperCase());//HELLO
        System.out.println(s.toLowerCase());//hello
    }
}
```

**charAt()**

charAt() method returns a character at the given index.

```
public class Test {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s.charAt(1));//e
    }
}
```
If we provide an index that is not in range of the String we get **StringIndexOutOfBoundsException**

```
public class Test {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s.charAt(7));
    }
}
```
```
Exception in thread "main" java.lang.StringIndexOutOfBoundsException: String index out of range: 7
	at java.lang.String.charAt(String.java:658)
	at Test.main(Test.java:6)

```

## What is the difference between "ABC".equals(str) and str.equals("ABC"), where str is a String object?

When we use str.equals("ABC"), there might be a case that str is null and in such situation, we will get NullPointerException.

But when we use "ABC".equals(str), we don't really bother whether str is null or not. If it is null this comparison will return false.


## Difference between str1 == str2 and str1.equals(str2)?

We use == operator for reference comparison (address comparison) and the .equals() method for content comparison. 

In simple words, == checks if both objects point to the same memory location whereas .equals() evaluates to the comparison of values in the objects.

## Why char[] array is better than a String for storing sensitive information?

1. Since String is immutable, there is no such method to overwrite the content. For example, a user can change the password multiple times, so we should update the content of the same object which is not possible in the case of String.

2. Using plain text, there is a higher chance of accidentally printing sensitive information in logs.

3. Since, String uses String Constant Pool, anyone who has the access to the memory dump can easily find the password in plain text.

4. Another reason for storing a password in the char[] array, is because char[] can be cleared, for example, after usage one can override a clear password with junk, while String is immutable in Java.


<hr>
[Top OOPS Interview Questions & Answers](https://riteshpanigrahi.hashnode.dev/top-oops-interview-questions-answers)





