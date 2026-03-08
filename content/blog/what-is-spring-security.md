---
title: What is Spring Security? & Important terms in Spring Security
date: '2022-03-21T03:58:02.920Z'
slug: what-is-spring-security
tags:
  - Springboot
  - Security
  - Java
coverImage: /images/blog/what-is-spring-security/cover.png
series: Spring Security Series
seriesOrder: 1
---

Hi All, welcome to the Spring Security Series.

In this article, we will understand what exactly spring security is and important terms we will often use throughout the series.

## Let's start with a simple example

Suppose there is a University in your locality.

Can everyone enter the university without permission? **No**, you require some kind of permit to get into the university.

Let's say the **id-card of the university is the permit**. But when you are at the university gate and there is no one to check the id-card then what is the point of that?

So, **every university has a security guard/s** who is at the entry gate to check that anyone who enters the university has an id-card that belongs to the same university.

Also, in a university, there are **people with different roles** some are students while some are teachers or some from the accounts department.

A student can enter the classrooms, library, cafe but cannot enter the teacher's staff room or the principal's office, etc.

Similarly, teachers cannot have access to the accounts department. In this way, there are different roles and each has different privileges.

This is **similar to the web application**.

As the university needs a security guard for its protection even our **Application requires a security guard**, here **Spring Security** works as the guard of our application.

As in the university, people with valid id-card are allowed even our application needs users with valid identification (eg - user id and password).

As in the university, there are classrooms, library, staff room, accounts department, etc. In our application, we have different APIs.

Different people have different privileges in university, in an application we can set access controls to the APIs according to the roles and authorities(we will understand more about these further).

I hope with the above example you have understood why do we require Spring Security.

## What is Spring Security?

Spring Security is a framework that acts as a security guard for our java application. Whenever requests come to the application, Spring Security intercepts the request, and as 2 questions 
1. Who are you? (Authentication)
2. What do you want? (Authorization)

The main benefit of using Spring Security is it is powerful and highly customizable as per the requirements.

<kbd>
![image.png](/images/blog/what-is-spring-security/image01.png)</kbd>

## Important terms in Spring Security

### Authentication

When we answer the question, **Who are you?** asked by Spring Security by providing some kind of identification, that is called Authentication.

In the above example, we saw that we require an id-card to enter the university. Similarly, to access an application we need to provide our credentials(eg: user id and password), to authenticate ourselves.

In technical terms, Authentication confirms that users are who they say they are.

### Authorization

Even though if someone entered the university, he/she cannot access all the sections.

We should have the proper authority to access, for eg: a student does not have the authority to enter the principal or staff room.

When we answer the question,** What do you want? or Are you allowed to do this?** asked by Spring Security, which is called Authorization.

Authorization gives users(principal, teachers) permission to access a resource(principal room, staff room).

### Principal

Principal is the **currently logged-in user**.

Once a user is authenticated, the application remembers the user and stores the information in the application context. This is why we do not require to provide a user id and password at every request.

### Granted Authority

We understood Authorization, which means the permission the user has in the application.

So, how to implement this?

Here, comes Granted Authority, for every user we need to provide a list of Granted Authorities.

Eg: for student A we can have authorities as can_access_classroom and can_access_library.

### Roles

Granted Authorities are too fine-grained. If there are 10 students, we need to give the same authority to all 10 students.

Here, comes Role.

Role is basically a grouping of authorities. Suppose, we create a Role STUDENT and we assign can_access_classroom and can_access_library granted authorities to it.

So whenever a new student enters the university, instead of providing each granted authority we can assign the role to the new Student which internally contains all the granted authorities.

 
## Conclusion

So, in the first article on Spring Security Series, we learned what is it and a few important terms we use in Spring Security.

I hope this is helpful.

In the upcoming articles, we will understand concepts like Basic Authentication, Role-based and Permission based authentication, Form Login, Database Authentication, JWT, OAuth, and much more.

If you have any suggestions/feedback, please comment below.

Stay Tuned for the next one, till then Bye 👋
 
