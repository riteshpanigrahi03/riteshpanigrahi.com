---
title: "Spring Dependency Injection and Autowiring"
date: "2022-01-10T16:40:30.290Z"
slug: "spring-dependency-injection-and-autowiring"
tags: ["Spring", "Springboot", "dependency injection"]
coverImage: "/images/blog/spring-dependency-injection-and-autowiring/cover.png"
---

In this article, we will understand how dependency injection work in Spring and what is Autowiring and why do we require it.<br/>
# Dependency Injection
Let's start by creating a plain Spring Boot project.<br/><br/>
Also, let's create a POJO class - Student<br/><br/>
Student class has *3 attributes - id, name, and percentage*. Getters and Setters, Constructor(just prints a statement when the object is created), and method **display**.<br/>

```
public class Student {
    private int id;
    private String name;
    private double percentage;

    public Student() {
        System.out.println("Student Object Created");
    }

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
    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
    public  void display(){
        System.out.println("Hi,from Student");
    }
}
``` 
Now suppose we want a **Student **object, we can create that with *new *keyword.

```
@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		Student s = new Student();
		s.display();
	}
}
``` 

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image01.png)

But Spring dependency injections says, **"Hey developer, you just focus on the logic, I will create objects for you!"**<br/>
So, we don't need to make use of the 'new' keyword.<br/> Then how we will get the objects?<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image02.png)

*'run' *method returns **ConfigurableApplicationContext**, this will help us to get the desired object.


```
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(DemoApplication.class, args);
		Student s = context.getBean(Student.class);
		s.display();

	}

}
``` 
We are asking the context to give us the object or bean of the Student class.<br/>

Let's see the output of this.

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image03.png)
It gives an error:- No qualifying bean. **Why?**<br/>

Spring provides a container that stores all the objects or beans which we will require while execution.<br/>
As we require a Student class object, the spring container should have that bean or object so that it can provide us, right?<br/>
So, **how does Spring container knows which class object we want?**<br/>
Here comes the @Component annotation.<br/> 
We need to add this to the Student class, so that the spring container will know that we will require this bean, and then it will create and store it in the container.<br/>

```
import org.springframework.stereotype.Component;
@Component
public class Student {
    private int id;
    private String name;
    private double percentage;

    public Student() {
        System.out.println("Student Object Created");
    }

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
    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
    public  void display(){
        System.out.println("Hi,from Student");
    }
}
``` 
So, the moment the run method gets executed, a spring container will be formed and it will contain **student** object.<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image04.png)
<br/>
Now if we run the code, we are telling spring that we want Student class bean using the **getBean()** method, Spring will check that we have a bean of type Student in the container and then we will simply get the object of the Student class.<br/> This is what is called **Dependency Injection**.<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image05.png)

Now let's learn one more thing, if we declare a class with @Component annotation and then we don't use it while execution (using context.getBean()) still the object will be created.<br/>

```
@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(DemoApplication.class, args);
		//Student s = context.getBean(Student.class);
		//s.display();
	}
}
``` 

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image06.png)
Even if we call the getBean for Student multiple times, still object will be created only once.<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image07.png)
<br/>
This is because spring by defaults works on the **Singleton design pattern**, the object is created only once and it is created before the requirement of the object in the execution process. <br/>
But if we want to create different objects and objects should be created only when it is needed, we need to change the scope to prototype.<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image08.png)

Calling 2 objects with prototype scope<br/>
![image.png](/images/blog/spring-dependency-injection-and-autowiring/image09.png)
I hope dependency injection is clear, now let's focus on Autowiring.<br/>

# Autowiring
Now suppose the *Student also has an address*, so let us create an **Address** class. This class has *3 variables and a method showAddress().* <br/>


```
public class Address {
    int roomNo;
    String buildingName;
    String city;

    public Address() {
        System.out.println("Address Object Created");
    }

    public int getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(int roomNo) {
        this.roomNo = roomNo;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
    public void showAddress(){
        System.out.println("Hi, from Address");
    }
}

``` 
Now add this class to the Student class, and we will call showAddress() method in the display() method of the Student class.<br/>

```
@Component
public class Student {
    private int id;
    private String name;
    private double percentage;
    private Address address;
    
    public Student() {
        System.out.println("Student Object Created");
    }

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
    public double getPercentage() {
        return percentage;
    }
    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
    public  void display(){
        address.showAddress(); //calling Address class method
        System.out.println("Hi,from Student");
    }
}

``` 
As we require, Address class object in Student, we need to add @Component annotation to  Address class.<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image10.png)

Now let's see the output.<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image11.png)
Here it says the address is null.<br/>
**Why this error?**

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image12.png)
As we have added @Component annotation, there is 2 objects in the container but how the student will know that address is available?<br/>
We have to connect student with address, here comes Autowire.<br/><br/>

We will tell student class that there is address object available using the @Autowired annotation.

```
package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
public class Student {
    private int id;
    private String name;
    private double percentage;
    @Autowired
    private Address address;

    public Student() {
        System.out.println("Student Object Created");
    }

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
    public double getPercentage() {
        return percentage;
    }
    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
    public  void display(){
        address.showAddress();
        System.out.println("Hi,from Student");
    }
}

``` 
Now it will run perfectly.<br/>

![image.png](/images/blog/spring-dependency-injection-and-autowiring/image13.png)

> 
Autowiring is basically used to inject the object dependency implicitly.<br/>

# Conclusion
So far in this article, we understood what is dependency injection, how beans and objects are stored in Spring Container and we saw why do we require Autowiring.<br/>
If you find this article helpful, do like it.<br/>
Any suggestions for further articles/ improvement comment down below.<br/>
Thanks for Reading!!<br/>




