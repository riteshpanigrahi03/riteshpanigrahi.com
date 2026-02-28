---
title: "Spring Security: Architecture and Internal Workflow"
date: "2022-04-20T14:51:56.885Z"
slug: "spring-security-architecture-and-internal-workflow"
tags: ["Java", "THW Web Apps", "Springboot"]
coverImage: "/images/blog/spring-security-architecture-and-internal-workflow/cover.png"
---

In the [previous article](https://riteshpanigrahi.hashnode.dev/what-is-csrf-all-about), we learned about CSRF.

If you have not followed previous articles if this [series](https://riteshpanigrahi.hashnode.dev/series/spring-security), do check them out for a better understanding.

In this article, we will understand **how Spring Security works behind the scene.**

Whenever a **Client**(eg: Browser) wants to send a request to **Server**(our Spring Boot Project), if we have secured the APIs using Spring Security, the request will pass through the Filter and it will be first authenticated and then redirected to the server.


<kbd>![image.png](/images/blog/spring-security-architecture-and-internal-workflow/image01.png)</kbd>

Now lets us understand** how the filter will help us to authenticate the request?**


<kbd>![image.png](/images/blog/spring-security-architecture-and-internal-workflow/image02.png)</kbd>

### Step 1

Whenever the client sends a username and password, it reaches the **DelegatingFilterProxy**.

### Step 2

DelegatingFilterProxy **converts **the request to an **Authentication **object. 
This object contains all the details like username, password, principal,isAuthenticated, etc.

DelegatingFilterProxy does not have any idea how to authenticate the request.

So it Delegates to the Authentication Manager.

### Step 3

AuthenticationManager has an *authenticate *method that takes the Authentication object created in the last step.

In an Application, we can have multiple **AuthenticationProviders**, as in the above image we have added 3 AuthenticationProviders

1.  Which authenticate using the token
2. Which authenticate using username and password
3. Which authenticate using OAuth.

AutehticationMangers does not have information about AutenticationProviders, so it further delegates the job to **ProviderManager**.

### Step 4

We want to use an AuthenticationProvider which uses username and password.

ProviderManager checks with all the providers one by one using the *supports *method. 

Once it finds the correct one(which returns true), it delegates the job to that AuthenticationProvider to authenticate.

### Step 5

AuthenticationProvider should have the user details.

How can AuthenticationProvider know whether the user which sends the request is a valid user or not?

This is the job of the UserDetailsSerivce to provide the user details from the system.

### Step 6

The responsibility of the UserDetailsService is to get the UserDetails from the database or In memory or cache or any other means.
 
If a user with the given username is not present in the system, it throws an error. 

If user details are available, it returns the UserDetails object.

### Step 7

UserDetails is now available to the AuthenticationProvider, so it will authenticate whether the request matches the user details in the system.

If yes, it returns the authentication object to the ProviderManager.

### Step 8

ProviderManager sends the same object to the Filter

### Step 9

Filter sets the authentication object in the security context.

### Step 10

Once the authentication object is in the context, then the user can send multiple requests and the user will no more be required to provide login details.

## Conclusion
I hope the internal work of Spring Security is clear.

If you have any queries/feedback/suggestions, do comment below.

Do like👍, if this was helpful.

In the next article, we will understand Form-based authentication.

Stay Tuned for the next one. Till then Bye👋


