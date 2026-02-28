---
title: "Spring Security: Permission-based Authentication"
date: "2022-04-06T02:44:54.282Z"
slug: "spring-security-permission-based-authentication"
tags: ["2Articles1Week", "Java", "Springboot", "Security"]
coverImage: "/images/blog/spring-security-permission-based-authentication/cover.png"
---

In the [previous article](https://riteshpanigrahi.hashnode.dev/spring-security-role-based-authentication), we learned about Role-based Authentication. 

In this article, we will understand permission-based authentication.

## Creating another user

Till now in our application we have created, 2 users alexJamesUser(EMPLOYEE) and emmaUser(ADMIN). 

Now we will create another user oliverUser who will be ADMIN_TRAINEE. 

ADMIN will have read and write access to employee details whereas ADMIN_TRAINEE has only read access.

### Adding a new user to ApplicationUserRole enum

```
 ADMIN_TRAINEE(Sets.newHashSet(EMPLOYEE_READ, COMPENSATION_READ));

``` 
### Creating a user in config class


```
UserDetails oliverUser = User.builder()
                .username("oliver")
                .password(passwordEncoder.encode("pass1"))
                .roles(ADMIN_TRAINEE.name()) // ROLE_ADMIN_TRAINEE
                .build();
``` 

## Creating new Controller

Now we will create another controller which will have access to only ADMIN and ADMIN_TRAINEE.

Also, as discussed only the endpoints which has read operation will be given access to ADMIN_TRAINEE.


```
@RestController
@RequestMapping("management/api/v1/employees")
public class EmployeeManagementController {
    private static final List<Employee> EMPLOYEES = Arrays.asList(
            new Employee(1, "Alex James","Developer",10000),
            new Employee(2, "Oliver Jones","QA",8500),
            new Employee(3, "Robert Gayle","DBA",8000)
    );
    @GetMapping
    public List<Employee> getAllEmployees() {
        System.out.println("GET - getAllEmployees");
        return EMPLOYEES;
    }

    @PostMapping
    public String registerNewEmployee(@RequestBody Employee employee) {
        System.out.println("POST - registerNewEmployee");
        return "Employee added successfully !";
    }

    @DeleteMapping(path = "{employeeId}")
    public String deleteEmployee(@PathVariable("employeeId") Integer employeeId) {
        System.out.println("DELETE - deleteEmployee");
        return "Employee with id->"+employeeId+" deleted!";
    }

    @PutMapping(path = "{employeeId}")
    public String updateEmployee(@PathVariable("employeeId") Integer employeeId, @RequestBody Employee student) {
        System.out.println("PUT - updateEmployee");
        return "Employee with id->"+employeeId+" updated!";
    }
}
``` 

We have created EmployeeManagementController, which contains 4 methods
1. GET - to get all employees
2. POST - to register new Employee
3. DELETE - remove an employee
4. PUT - update details of existing employees.

Note - I have not implemented the exact logic of different methods, as learning Spring Security is the objective of this application and not CRUD.

Now let's secure the endpoints as per the Permissions in the AppSecurityConfig class.

Again we will make use of antMatchers() for this

```
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/**").hasRole(ADMIN.name())
                //new antMatchers()
                .antMatchers(HttpMethod.DELETE,"/management/api/**").hasAnyAuthority(EMPLOYEE_WRITE.name(),COMPENSATION_WRITE.name())
                .antMatchers(HttpMethod.PUT,"/management/api/**").hasAnyAuthority(EMPLOYEE_WRITE.name(),COMPENSATION_WRITE.name())
                .antMatchers(HttpMethod.POST,"/management/api/**").hasAnyAuthority(EMPLOYEE_WRITE.name(),COMPENSATION_WRITE.name())
                .antMatchers(HttpMethod.GET,"/management/api/**").hasAnyRole(ADMIN.name(),ADMIN_TRAINEE.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }
``` 
Apart from previous matchers, we have added 4 new antMatchers() which specify the http method types, pattern and the authorities of the users who can access the endpoints.


```
.antMatchers(HttpMethod.DELETE,"/management/api/**").hasAnyAuthority(EMPLOYEE_WRITE.name(),COMPENSATION_WRITE.name())
``` 
This says if someone tries to access HTTP Method DELETE with the pattern /management/api/**, then that user must have either of the 2 authorities EMPLOYEE_WRITE or COMPENSATION_WRITE.

Now let's try to access the API

<kbd>
![image.png](/images/blog/spring-security-permission-based-authentication/image01.png)</kbd>

When tried to access POST API using emmaUser credentials.


```
ADMIN(Sets.newHashSet(EMPLOYEE_READ, EMPLOYEE_WRITE, COMPENSATION_READ, COMPENSATION_WRITE))
``` 
Since emmaUser is having role ADMIN and for ADMIN we have provided the required permissions, still we are not able to pass the security filter and we got 403 forbidden.

Now let's understand **Why?**

If we try to see the debug logs of spring security by adding the below in the application.properties file.


```
logging.level.org.springframework.security=DEBUG
``` 
We can see that even we have added the authorities in the Enum still emmaUser(ADMIN) does not have any authorities mapped to her.


<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image02.png)</kbd>

While creating the users we have mentioned the role, though the enum constant for the role takes a Set of permissions spring security does not know about that, we need to add authorities to the users.

## Few Observations

### When we add roles while creating a user, internally it is mapped to List<GrantedAuthority>


<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image03.png)</kbd>

In the above debug as well, we saw ROLE_ADMIN as GrantedAuthority List
<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image04.png)</kbd>

### UserDetails Interface


<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image05.png)</kbd>

By the above 2 observations, we can say that Roles and Permissions/Authorities need to be present in a single Collection of type GrantedAuthority interface.

Now let's create that.

GrantedAuthority is an interface and one of its implementation classes is SimpleGrantedAuthority, we will create a Set of SimpleGrantedAuthority which will contain the permissions we assigned to each role in the ApplicationUserRole enum.

Sounds confusing? Don't worry we will see it in detail.


```
public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
}
``` 
**getPermissions()** method will provide all the permissions we added, using stream we are generating SimpleGrantedAuthority of each permission.

Also, we need to add the role by adding ROLE_ before the name.

Complete ApplicationUserRole  will look like below


```
public enum ApplicationUserRole {
    EMPLOYEE(Sets.newHashSet()),
    ADMIN(Sets.newHashSet(EMPLOYEE_READ, EMPLOYEE_WRITE, COMPENSATION_READ, COMPENSATION_WRITE)),
    ADMIN_TRAINEE(Sets.newHashSet(EMPLOYEE_READ, COMPENSATION_READ));

    private final Set<ApplicationUserPermission> permissions;//authorities or permissions

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }
    
    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}

``` 
Now that we have a method that returns **Set<SimpleGrantedAuthority>** which was required, we need to give this Set for each user to Spring Security.


```
@Override
    @Bean
    protected UserDetailsService userDetailsService() {
        UserDetails alexJamesUser = User.builder()
                .username("alexjames")
                .password(passwordEncoder.encode("password"))
                //.roles(EMPLOYEE.name()) // ROLE_EMPLOYEE
                .authorities(EMPLOYEE.getGrantedAuthorities())
                .build();

        UserDetails emmaUser = User.builder()
                .username("emma")
                .password(passwordEncoder.encode("password123"))
                //.roles(ADMIN.name()) // ROLE_ADMIN
                .authorities(ADMIN.getGrantedAuthorities())
                .build();

        UserDetails oliverUser = User.builder()
                .username("oliver")
                .password(passwordEncoder.encode("pass1"))
                //.roles(ADMIN_TRAINEE.name()) // ROLE_ADMIN_TRAINEE
                .authorities(ADMIN_TRAINEE.getGrantedAuthorities())
                .build();


        return new InMemoryUserDetailsManager(
                alexJamesUser,
                emmaUser,
                oliverUser
        );

    }
``` 
We have commented on the** roles()** instead of each user role we are calling the **getGrantedAuthorities()** method to set the GrantedAuthorities.

Complete AppSecurityConfig will look like below

```
@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/**").hasRole(ADMIN.name())
                //new antMachers()
                .antMatchers(HttpMethod.DELETE,"/management/api/**").hasAnyAuthority(EMPLOYEE_WRITE.getPermission(),COMPENSATION_WRITE.getPermission())
                .antMatchers(HttpMethod.PUT,"/management/api/**").hasAnyAuthority(EMPLOYEE_WRITE.getPermission(),COMPENSATION_WRITE.getPermission())
                .antMatchers(HttpMethod.POST,"/management/api/**").hasAnyAuthority(EMPLOYEE_WRITE.getPermission(),COMPENSATION_WRITE.getPermission())
                .antMatchers(HttpMethod.GET,"/management/api/**").hasAnyRole(ADMIN.name(),ADMIN_TRAINEE.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    @Override
    @Bean
    protected UserDetailsService userDetailsService() {
        UserDetails alexJamesUser = User.builder()
                .username("alexjames")
                .password(passwordEncoder.encode("password"))
                //.roles(EMPLOYEE.name()) // ROLE_EMPLOYEE
                .authorities(EMPLOYEE.getGrantedAuthorities())
                .build();

        UserDetails emmaUser = User.builder()
                .username("emma")
                .password(passwordEncoder.encode("password123"))
                //.roles(ADMIN.name()) // ROLE_ADMIN
                .authorities(ADMIN.getGrantedAuthorities())
                .build();

        UserDetails oliverUser = User.builder()
                .username("oliver")
                .password(passwordEncoder.encode("pass1"))
                //.roles(ADMIN_TRAINEE.name()) // ROLE_ADMIN_TRAINEE
                .authorities(ADMIN_TRAINEE.getGrantedAuthorities())
                .build();


        return new InMemoryUserDetailsManager(
                alexJamesUser,
                emmaUser,
                oliverUser
        );

    }
}

``` 


Now, let's start the application in debug mode, and let me show what's happening behind the scenes.

All roles and permissions are under one collection

## Behind the scenes

**EMPLOYEE**

<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image06.png)</kbd>

**ADMIN**

<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image07.png)</kbd>

**ADMIN_TRAINEE**

<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image08.png)</kbd>

Now let's access the API

**Accessing POST endpoint by ADMIN - SUCCESS**


<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image09.png)</kbd>

**Accessing POST endpoint by ADMIN_TRAINEE - FAILURE
**
<kbd>![image.png](/images/blog/spring-security-permission-based-authentication/image10.png)</kbd>

I hope this is clear till now.

So far we have used antMatchers() to secure APIs, there is also another way to do it by Annotations.

## Permission based Authentication using Annotations

We can use **PreAuthorize **annotation on each method.


```
@RestController
@RequestMapping("management/api/v1/employees")
public class EmployeeManagementController {
    private static final List<Employee> EMPLOYEES = Arrays.asList(
            new Employee(1, "Alex James","Developer",10000),
            new Employee(2, "Oliver Jones","QA",8500),
            new Employee(3, "Robert Gayle","DBA",8000)
    );
    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_ADMINTRAINEE')")
    public List<Employee> getAllEmployees() {
        System.out.println("GET - getAllEmployees");
        return EMPLOYEES;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('employee:write','compensation:write')")
    public String registerNewEmployee(@RequestBody Employee employee) {
        System.out.println("POST - registerNewEmployee");
        return "Employee added successfully !";
    }

    @DeleteMapping(path = "{employeeId}")
    @PreAuthorize("hasAnyAuthority('employee:write','compensation:write')")
    public String deleteEmployee(@PathVariable("employeeId") Integer employeeId) {
        System.out.println("DELETE - deleteEmployee");
        return "Employee with id->"+employeeId+" deleted!";
    }

    @PutMapping(path = "{employeeId}")
    @PreAuthorize("hasAnyAuthority('employee:write','compensation:write')")
    public String updateEmployee(@PathVariable("employeeId") Integer employeeId, @RequestBody Employee student) {
        System.out.println("PUT - updateEmployee");
        return "Employee with id->"+employeeId+" updated!";
    }
}

``` 
And in the config class, we need to add EnableGlobalMethodSecurity annotation

After this, if we again restart our application it will work the same as before. 

## Conclusion

That's it for this article.

You can find the code [here](https://github.com/riteshpanigrahi03/Spring-Boot-Security/tree/4.Role-based-Authentication)

We learned how to create a collection of GrantedAuthority and how to configure config class or make use of annotations to achieve permission-based authentication.
 
If you have noticed in the config class, we have used csrf.disable(), I haven't talked about in this article.

So, in the next one we will understand all about CSRF, what it is, why to disable and much more.

So, stay tuned for the next article, till then Bye👋

