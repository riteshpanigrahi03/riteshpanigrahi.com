---
title: Java OOPS - Data Hiding and Abstraction
date: '2022-01-02T02:21:20.465Z'
slug: java-oops-data-hiding-and-abstraction
tags:
  - Object Oriented Programming
  - Java
coverImage: /images/blog/java-oops-data-hiding-and-abstraction/cover.png
---

Welcome to 2<sup>nd</sup> article of the Java OOPs series, in the  [previous article](https://riteshpanigrahi.hashnode.dev/java-oops-classes-and-objects)  we learned about classes and objects.<br/>
In this, we will cover **Data Hiding** and **Abstraction**.<br/> 
### Data Hiding<br/>
Data hiding is basically hiding internal data(variables) from the outside world(other classes).<br/>
The outside class should not access the data directly.<br/>
For eg: Our bank account balance is not available directly to everyone, it is private to us.<br/>
Similarly, data hiding can be achieved programmatically by making the variables private.<br/>
It helps to keep our data secure and if any entity wants to access the data should be authenticated.<br/>
So, how to get private data?<br/>
For eg:- To get the account balance we go to the bank and provide them the account number and id proof then only they tell us the balance.<br/>
Similarly in Java using *getters*, we can implement all the logic of validation and then return the data to the entity which asked for it.<br/>


```
class Bank{
    private long balance=0; // private data - data hiding
    private int bank_id;
    public long getBalance(int id){
        //Checking user authorization
        //Checking bank_id same as given id or not
        if(this.bank_id==id){
            return balance;
        }
        //Unauthorized User
        return -1;
    }
}
``` 

### Abstraction<br/>
When something is not complete we call that abstract.<br/>
In oops, hiding internal operations is an abstraction. <br/>Just highlight the set of services we offer, no need to provide implementation details.<br/>
For eg:- While sending a message to another person, we as users don't need to know how internally it is working, that is an abstraction.<br/>

> Abstraction focuses on WHAT? and not on HOW?


How do we achieve Abstraction?<br/>
1. Using Abstract Classes
2. Using Interface - as all the methods are abstract, outside users have no idea about its implementation. So we can achieve abstraction.

### Conclusion
In this article, we learned about Data Hiding and Abstraction and their importance.
<br/>In the next article, we will start with Encapsulation.<br/>
If you have any suggestions do comment below.<br/>
Thanks for Reading.<br/>

