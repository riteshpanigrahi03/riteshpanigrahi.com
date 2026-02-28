---
title: "Understanding \"==\" on String Objects"
date: "2022-01-13T17:12:04.368Z"
slug: "understanding-on-string-objects"
tags: ["Java"]
coverImage: "/images/blog/understanding-on-string-objects/cover.png"
---

Hi all, in this article, we will see **why the above code executes?**<br/>

String object can be created in 2 ways:<br/>
1. Using String Literal<br/>
2. Using new keyword <br/>


When we create a string using **double quotes**, it is called a string literal.<br/>
Eg : String s1 = "Hello";<br/>

Whenever a literal is created, it gets stored in the **string pool**.

### What is String Pool?

String Pool is a special place in heap memory where literals are stored.<br/>
![image.png](/images/blog/understanding-on-string-objects/image01.png)
Whenever a new literal is created, JVM checks in the string pool whether the same string already exists in the pool or not.<br/> 
If the string exists, then its reference is returned else new string is created and placed in the pool.<br/>

If we see the first 2 statements of the above snippet, <br/>

```
String s1 = "Hello";
String s2 = "Hello";
``` 
For s1, since the pool is *empty *a new String (Hello) is created in the pool and s1 is the reference to the string.<br/>

![image.png](/images/blog/understanding-on-string-objects/image02.png)

For s2, since "Hello" is *already present* in the pool, JVM will **not **create a new one, instead, it will return the earlier reference of string "Hello" which is s1.<br/>

![image.png](/images/blog/understanding-on-string-objects/image03.png)

So, <br/>

> 
String s2 = "Hello" is same as String s2 = s1

Now, the literal "Hello" has 2 references s1 and s2.<br/>

### Creating using the "new" keyword

```
String s3 = new String("Hello");
``` 
When we create a string using a *new *keyword, this object gets created outside the pool, it is different from the literal.<br/>
So its address will also be different.<br/>

![image.png](/images/blog/understanding-on-string-objects/image04.png)

Now I hope you have understood why the snippet works this way.<br/>

```
System.out.println(s1==s2);//true
System.out.println(s3==s2);//false
``` 
Since, s1 and s2 points to same object(in the pool), *s1==s2* is **true** .<br/>  
s3 points to different object, therefore *s3==s2* is **false** but if we use *equals()* for comparison it would have given **true** because it compares the content not the address.

<br/>
That's it for this short article.<br/>
If you find it helpful do like it.<br/>
Thanks for Reading! <br/>