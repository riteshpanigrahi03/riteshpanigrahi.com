---
title: "What is Basic Auth and How to secure APIs using it?"
date: "2022-03-26T04:21:48.313Z"
slug: "what-is-basic-auth-and-how-to-secure-apis-using-it"
tags: ["Java", "Security", "Springboot", "2Articles1Week"]
coverImage: "/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/cover.png"
---

In the [previous article](https://riteshpanigrahi.hashnode.dev/getting-started-with-spring-security), we started by creating an employee API and secured it by just adding spring-security dependency and got introduced with form-based login.

In this article, we will keep form-based login aside and get started with Basic Auth.

I hope you have followed the previous article, we have already created the project we will continue working on the same application.

## What is Basic Authentication?

[Basic authentication](https://swagger.io/docs/specification/authentication/basic-authentication/) is a simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with the Authorization header that contains the word Basic word followed by a space and a base64-encoded string username: password.


<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image01.png)</kbd>

[Image Source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

Configure Basic Auth
To implement Basic Auth, we need to create a config class.

```
@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic(); // basic auth
    }
}
``` 
1. As AppSecurityConfig is a config class, we need to have Configuration annotation and also this configuration is used for spring security we need to also add EnableWebSecurity annotation.

2. It extends WebSecurityConfigurerAdapter which acts as a base class and it provides various methods whose functionality we can change by overriding the methods.     
           
3.  Override the configure method which takes HttpSecurity as an argument and tells spring security that we need to authorize all requests and the authentication will be Basic Auth.

Now let's start the application and access the API [(http://localhost:8080/api/v1/employees/1)](http://localhost:8080/api/v1/employees/1)
 
<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image02.png)</kbd>

In the previous article, we saw a Sign In form as it was form-based login. But here instead of that, we get a pop that asks username and password.

The default username is user and the password is present in the logs.

<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image03.png)</kbd>

Now let us understand how it works behind the scene.

In Basic Auth, **on every request, we have to send the Base 64 encoded string** of username and password in the header as

```
Example : Authorization: Basic ZGVtbzpwQDU1dzByZA==
``` 

**Request 1**
<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image04.png)</kbd>

**Request 2**

<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image05.png)</kbd>


## Whitelisting URL
Suppose we want some endpoint to be free from security(eg: home page of the website), then we can use antMatchers and pass the patterns and permit them all in the Config file.

We have created a simple HTML file(index.html) in **src/main/resources/static** which will be mapped to ("/"), we want this page to be accessed by everyone.


```
<h1>Let's Learn Spring Security</h1>
``` 

```
@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/")
                .permitAll() // look here
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }
}
``` 


<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image06.png)</kbd>

## Creating Custom User

Till now we are using default user and password provided by spring-security now we will create our own users who can access the APIs.

We need to create an **UserDetailsService Bean** in the config class, where we will declare our users
```
 @Override
 @Bean
    protected UserDetailsService userDetailsService() {
        UserDetails alexJamesUser = User.builder()
                .username("alexjames")
                .password(passwordEncoder.encode("password"))
                .roles("EMPLOYEE") // ROLE_EMPLOYEE
                .build();

        UserDetails emmaUser = User.builder()
                .username("emma")
                .password(passwordEncoder.encode("password123"))
                .roles("ADMIN") // ROLE_ADMIN
                .build();

        return new InMemoryUserDetailsManager(
                alexJamesUser,
                emmaUser
        );

    }
``` 
1. [UserDetailsService](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/userdetails/UserDetailsService.html) is a Core interface that loads user-specific data. It is used throughout the framework as a user DAO.

2. Using User builder() we are creating each user by providing the username, password, and the roles that the user has(we will learn more about roles and authorities in further articles)

3. For the password we can't directly use the String, Spring expects the password to be encrypted using an encoder.

```
@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
``` 

We have created a PasswordEncoder Bean which is basically a [BCryptPasswordEncoder](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.html).

We need to Autowire this encoder in the config class to use it.

As UserDetailsService is an interface, there are multiple Implementing classes we have used InMemoryUserDetailsManager as we are creating user in-memory only.

Let's run the application

**Success**


<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image07.png)</kbd>

**Failure**

<kbd>![image.png](/images/blog/what-is-basic-auth-and-how-to-secure-apis-using-it/image08.png)</kbd>

This is how we can create our custom users.

## Conclusion

If you find this one helpful, do give it a like👍

Any feedback/suggestions? Do comment below.

You can find the Code of this article [here](https://github.com/riteshpanigrahi03/Spring-Boot-Security/tree/2.Baisc-Auth)

In this article, we learned about
1. Basic Auth
2. How to configure spring security by extending WebSecurityConfigurerAdapter.
3. Whitelisting URL using antMatchers()
4. Creating custom users using InMemoryUserDetailsManager.

While creating users we added roles, from next article we will start with 
1. What are Roles and Authorities/Permission?
2. How to do Role-Based authentication?
3. How to do Permission-Based authentication? and much more

Stay tuned for the next one. Till then Bye👋

