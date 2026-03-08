---
title: Understanding Roles and Authorities & How to create them using Enums?
date: '2022-03-30T17:50:33.473Z'
slug: understanding-roles-and-authorities-and-how-to-create-them-using-enums
tags:
  - Java
  - Springboot
  - Security
coverImage: >-
  /images/blog/understanding-roles-and-authorities-and-how-to-create-them-using-enums/cover.png
series: Spring Security Series
seriesOrder: 4
---

In the [previous article](https://riteshpanigrahi.hashnode.dev/what-is-basic-auth-and-how-to-secure-apis-using-it), we started with Basic Auth by creating custom users.

In this article, we will be understanding the concept of Roles and Authorities/Permission.

Note: For simplicity, we can consider Authorities as Permissions.

Let us first understand this example.

Consider a school, as we know a school has multiple users ( students, teachers, admin).  Every user has a ROLE in it. 

So we can say, **ROLE is a high-level view of a user.
**

But a student cannot enter the staff room or admin area. Similarly, teachers do not have access to the accounts department. 

With this, we can understand that every ROLE has different PREMISSONS.

For eg: student(ROLE) can enter classroom(PERMISSION) but cannot enter staff room(PERMISSION).

Let's go back to our Employee Application which we are using for the past 2 articles.

If you remember, we created 2 users, one has a role - EMPLOYEE and the other has - ADMIN.

1. EMPLOYEE can read employee data and can read compensation data.
<kbd>![image.png](/images/blog/understanding-roles-and-authorities-and-how-to-create-them-using-enums/image01.png)</kbd>

2. ADMIN can read, write or update employee data and can also read, write, update compensation details.

<kbd>![image.png](/images/blog/understanding-roles-and-authorities-and-how-to-create-them-using-enums/image02.png)</kbd>

So, these ROLES and AUTHORITIES help us to secure our APIs.

## Creating Roles and Permissions using Enums

In the previous article, we created 2 users alexJamesUser(EMPLOYEE) and emmaUser(ADMIN). 

So, for simplicity, we will give 4 permissions for ADMIN and 0 permissions for EMPLOYEE.

See the below diagram for more understanding.

<kbd>![image.png](/images/blog/understanding-roles-and-authorities-and-how-to-create-them-using-enums/image03.png)
</kbd>

To created roles and permissions, we will use Enums(to know more about enums, you can read this [article](https://riteshpanigrahi.hashnode.dev/complete-guide-to-java-enum)). 

Let's start.

### Permission Enum
```
public enum ApplicationUserPermission {
    EMPLOYEE_READ("employee:read"),
    EMPLOYEE_WRITE("employee:write"),
    COMPENSATION_READ("compensation:read"),
    COMPENSATION_WRITE("compensation:write");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
``` 
In ApplicationUserPermission enum, we have created 4 constants(permissions).

1. EMPLOYEE_READ

2. EMPLOYEE_WRITE

3. COMPENSATION_READ

4. COMPENSATION_WRITE

### Roles Enum

As we discussed, a role can have 0 or more sets of permissions. For that let's add the below dependency in the pom.xml file, which will help to create Sets.


```
<dependency>
			<groupId>com.google.guava</groupId>
			<artifactId>guava</artifactId>
			<version>28.1-jre</version>
</dependency>
``` 

```
import com.google.common.collect.Sets;
import java.util.Set;
import static com.example.SpringSecurity.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    EMPLOYEE(Sets.newHashSet()),
    ADMIN(Sets.newHashSet(EMPLOYEE_READ, EMPLOYEE_WRITE, COMPENSATION_READ, COMPENSATION_WRITE));

    private final Set<ApplicationUserPermission> permissions;//authorities or permissions

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }
}
``` 
For each role, we have created a set of permissions.

For EMPLOYEE, as discussed no permission is assigned and for ADMIN 4 permissions are assigned.

Now while creating Users we used String now let's use the enum which we have created.


```
 @Override
    @Bean
    protected UserDetailsService userDetailsService() {
        UserDetails alexJamesUser = User.builder()
                .username("alexjames")
                .password(passwordEncoder.encode("password"))
                .roles(EMPLOYEE.name()) // ROLE_EMPLOYEE
                .build();

        UserDetails emmaUser = User.builder()
                .username("emma")
                .password(passwordEncoder.encode("password123"))
                .roles(ADMIN.name()) // ROLE_ADMIN
                .build();

        return new InMemoryUserDetailsManager(
                alexJamesUser,
                emmaUser
        );

    }
``` 

## Conclusion

So, in this article we have seen how can we create Roles and Permissions using enums.

If you find this one helpful, do give it a like👍

Any feedback/suggestions? Do comment below.

You can find the Code of this article [here](https://github.com/riteshpanigrahi03/Spring-Boot-Security/tree/3.Creating-roles-and-permissions)


In the next article, we will understand Role-based authentication.

Till then, Bye👋

Stay Tuned for the next one.
