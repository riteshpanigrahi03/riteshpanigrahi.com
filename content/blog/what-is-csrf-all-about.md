---
title: "Spring Security: What is CSRF all about?"
date: "2022-04-09T12:53:38.373Z"
slug: "what-is-csrf-all-about"
tags: ["2Articles1Week", "Java", "Spring", "Security"]
coverImage: "/images/blog/what-is-csrf-all-about/cover.png"
---

In the [previous article](https://riteshpanigrahi.hashnode.dev/spring-security-permission-based-authentication), we understood permission-based authentication where we disabled CSRF.

In this article, we will understand what CSRF is, when to use CSRF protection and how to implement CSRF protection.

## What is CSRF?

CSRF stands for **Cross Site Request Forgery**

Let us understand this with the below example

**Step 1**

Suppose you want to transfer $100 from your account to your friend's account whose account no is  9876.

Generally, you will log in to the bank's website then you will fill out a form where you will put the details and transfer the money.

In the backend, there will be a **POST** request to the bank server.

<kbd>![image.png](/images/blog/what-is-csrf-all-about/image01.png)</kbd>

Whenever we are logged in, a **cookie **is present on the browser with the Session details.

**Step 2**

Now, you are still logged in with the bank's application and you got a mail in your inbox which says, "**Win Amazing prizes in a second**". 


<kbd>![image.png](/images/blog/what-is-csrf-all-about/image02.png)</kbd>

**Step 3**

Now suppose, you open the mail and visit the website **surprises dot com** whose link is in the message. 

Here, **surprises dot com** is the attacker's domain.

The attacker's page will be a **hidden form** that will send a request to your bank to transfer money to his account, which is the same POST endpoint we saw earlier.


<kbd>![image.png](/images/blog/what-is-csrf-all-about/image03.png)</kbd>


<kbd>![image.png](/images/blog/what-is-csrf-all-about/image04.png)</kbd>

So, here the attacker has **forged **a request on your behalf to the bank application.

**Bank will feel both the request are valid. How?**

When you first log in to the bank application/website, session details are saved in the browser and at every request, the cookie is sent along with it.

When you visited the malicious website on your browser and click the button, the same cookie will to sent to the bank application and the bank will feel it is a valid one.

So, this is what CSRF attack is. I hope this is clear.

## How do we protect ourselves from such attacks? 

To protect against CSRF attacks we need to ensure there is something in the request that the evil site is unable to provide.

One solution is to use the **Synchronizer Token Pattern**. This solution is to ensure that each request requires, in addition to our session cookie, a randomly generated token as an HTTP parameter. 

When a request is submitted, the server must look up the expected value for the parameter and compare it against the actual value in the request. If the values do not match, the request should fail. (Taken from [documentation](https://docs.spring.io/spring-security/site/docs/5.0.x/reference/html/csrf.html))

Due to the Same Origin Policy, the attacker will not be able to get the CSRF token.


<kbd>![image.png](/images/blog/what-is-csrf-all-about/image05.png)</kbd>

[Image Source](https://stackoverflow.com/questions/45012015/how-to-validate-csrf-tokens)

## When to use CSRF protection?

As per [Spring documentation](https://docs.spring.io/spring-security/site/docs/5.0.x/reference/html/csrf.html), we should use CSRF protection for any request that could be processed **by a browser by normal users**. 

If you are only creating a service that is used by non-browser clients, you will likely want to disable CSRF protection.

## Let's go back to our application

Comment **csrf().disable()** from config class and start our application.

```
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //.csrf().disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/**").hasRole(ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

``` 
If we access the API with the correct credentials, still we will not be able to execute the request. This is due to CSRF.


<kbd>![image.png](/images/blog/what-is-csrf-all-about/image06.png)</kbd>

## Now let's see how we will generate CSRF tokens.


```
 @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/**").hasRole(ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }
``` 
We have added **CookieCsrfTokenRepository.withHttpOnlyFalse()** which allows javascript to read the token.

Spring security adds the token in the** cookie(XSRF-TOKEN)** and the client needs to send the same token with every request in the **header(X-XSRF-TOKEN)**.

The server will validate the token from the header of the request and the generated token.
 
## Now let's test the application.

We are using Postman as a client and as we need the token for POST, PUT, PATCH APIs.

We will first hit the GET API and collect the token from the cookie(in regular practice we get the token with javascript eg- Angular or React).


<kbd>![image.png](/images/blog/what-is-csrf-all-about/image07.png)</kbd>
 
Now copy the XSRF-TOKEN and paste it in the header for POST request.


<kbd>![image.png](/images/blog/what-is-csrf-all-about/image08.png)</kbd>

## Conclusion
So, that's it regarding CSRF.

You can find the code [here](https://github.com/riteshpanigrahi03/Spring-Boot-Security/tree/6.CSRF)

To read more on this, you can follow [Spring Documentation](https://docs.spring.io/spring-security/site/docs/5.0.x/reference/html/csrf.html)

In the next article, we will start with Form-Based Authentication.

Till then Bye!