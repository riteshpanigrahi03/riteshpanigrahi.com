---
title: Java OOPS - Encapsulation
date: '2022-01-03T03:29:40.970Z'
slug: java-oops-encapsulation
tags:
  - Java
  - Object Oriented Programming
coverImage: /images/blog/java-oops-encapsulation/cover.png
---

Welcome to 3<sup>rd</sup> article of Java OOPs series, in this article we will learn about Encapsulation.<br/>
In the [last article](https://riteshpanigrahi.hashnode.dev/java-oops-data-hiding-and-abstraction) , we saw **Data hiding** i.e hiding internal data by making variables private, and **Abstraction **- hiding implementation details by using an interface or abstract classes.<br/>
#### Let's start with Encapsulation<br/>
Encapsulation is defined as the grouping of data variables and corresponding methods in a single unit.<br/>
It basically acts as a shield to protect data from outside classes.<br/>
So, we are making use of Data Hiding by making the variables private.<br/>
Also, we are hiding the implementation of public methods to the outside world using the abstraction concepts.<br/>
We can then say **Encapsulation = Data Hiding + Abstraction**<br/>
Any component which implements Data hiding and Abstraction can be said as an encapsulated component.<br/>
All Java classes are by default encapsulated. <br/>

```
class Student{
    //implementation of data hiding
    private String name;
    private int id;
    private int marks;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }
}
``` 
Here, in the Student class, all the variables are hidden using data hiding. Getters and Setters are used to get and set each variable.<br/>

#### Tightly Encapsulated Class
If all the variables of a class are private then that class is called a Tightly Encapsulated Class. <br/>

### Conclusion
So far in the series, we have completed Data Hiding, Abstraction, and Encapsulation.<br/>
In the next one, we will learn one of the important pillars of OOP which is Inheritance.<br/>
Thanks for reading this one.<br/>
If you find this helpful, do like it.<br/>
Any suggestions comment below.<br/>
[Link to the first article of this series. ](https://riteshpanigrahi.hashnode.dev/java-oops-classes-and-objects) 
