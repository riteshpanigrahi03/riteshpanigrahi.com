---
title: "Spring Security: Role-Based Authentication"
date: "2022-04-03T17:55:26.532Z"
slug: "spring-security-role-based-authentication"
tags: ["2Articles1Week", "Java", "Springboot", "Security"]
coverImage: "/images/blog/spring-security-role-based-authentication/cover.png"
---

In the [previous article,](https://riteshpanigrahi.hashnode.dev/understanding-roles-and-authorities-and-how-to-create-them-using-enums) we have created Roles and Permissions.

In this article, we will see how to secure APIs using user roles.

In our Employee Application, we have created an API (/api/v1/employees/{employeeId}), we want this API to access only by a user whose role as ADMIN.

For this, we will make use of antMatchers()

```
@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/**").hasRole(ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }
``` 
We have used the pattern (/api/**), which means whichever endpoint starts with this pattern will be accessible only by ADMIN.

Note- we are still using Basic Auth.

Let's start the application and try using the API.

**Failure - access by EMPLOYEE**

<kbd>
![image.png](/images/blog/spring-security-role-based-authentication/image01.png)
</kbd>

**Success - access by ADMIN**


<kbd>![image.png](/images/blog/spring-security-role-based-authentication/image02.png)</kbd>

That's it for this short article.

You can find the code [here](https://github.com/riteshpanigrahi03/Spring-Boot-Security/tree/4.Role-based-Authentication) 

In the next one, we will start with Permission based authentication.

Till then Bye!
