---
title: "Spring JDBC Template: Complete CRUD application in SpringBoot"
date: "2022-01-30T07:10:21.840Z"
slug: "spring-jdbc-template-application-in-springboot"
tags: ["Springboot", "Java", "Spring"]
coverImage: "/images/blog/spring-jdbc-template-application-in-springboot/cover.png"
---

## Overview
We will create a Spring Boot application that will have multiple REST API's using Spring Data JDBC with MySQL database for Student application, in that:<br/>
1. Each Student will have an id, name, and city as attributes.<br/>
2. Api's which will help to create, update, insert and delete students from Database.<br/>

With help of this article, you will understand how to work with the Spring data Jdbc Template.<br/>

**Below are the API details:**

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image01.png)

## Dependencies
You can create a spring boot app from [https://start.spring.io/](https://start.spring.io/)
For this application, we need 3 main dependencies
1. Spring Web - for creating APIs
2. Spring Data JDBC
3. MySQL Driver

Make sure these dependencies are in the pom.xml
![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image02.png)

## Project Structure

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image03.png)

## Database and Table Creation

All students details have to be on a Student table, so we have created a 
database - *spring_boot_jdbc* and inside that a table - *Students.*<br/>
The students table has 3 columns - id, name, city and it is initialized with 2 rows.<br/>

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image04.png)

## Connect Database from Spring Boot Application
We can make use of the properties file and provide all the details of the database such as URL, Username, and Password, then due to the auto-configuration feature of SpringBoot, all configuration of connecting to the database will be done behind the scenes.<br/>

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image05.png)
 
## Student Model
We also need to create a Student class that will have the same attributes as the table.<br/> 
This will help in mapping Student row data to Student object.<br/>

```
public class Student {
    private long id;
    private String name;
    private String city;

    public Student() {
    }

    public Student(long id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
```
## JDBC Repository - DAO Layer
To perform CRUD operations such as save, insert, update, delete on the table, we need a repository interface.<br/>

```
public interface StudentDAO {
    int save(Student s);

    int update(Student s);

    Student findById(Long id);

    int deleteById(Long id);

    List<Student> findAll();

    int deleteAll();

}
``` 
Since this is an interface we need to provide the implementations of these methods.<br/> 
As this class will act as a DAO, we have annotated it with @Repository annotation. <br/>
It will also use **JdbcTemplate** which provides various methods for executing SQL queries and interacting with the database.<br/>

```
@Repository
public class StudentDAOImpl implements StudentDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<Student> rowMapper = (rs,rowNum)->{
        Student s = new Student();
        s.setId(rs.getInt("id"));
        s.setName(rs.getString("name"));
        s.setCity(rs.getString("city"));
        return s;
    };

    @Override
    public int save(Student s) {
        String query = "Insert INTO students(id,name,city) values(?,?,?)";
        return jdbcTemplate.update(query,s.getId(),s.getName(),s.getCity());
    }

    @Override
    public int update(Student s) {
        String query = "Update students SET name=?,city=? WHERE id=? ";
        return jdbcTemplate.update(query,s.getName(),s.getCity(),s.getId());
    }

    @Override
    public Student findById(Long id) {
        String query = "SELECT * FROM students WHERE id=?";
        return jdbcTemplate.queryForObject(query,rowMapper,id);
    }

    @Override
    public int deleteById(Long id) {
        String query = "DELETE FROM students WHERE id=?";
        return jdbcTemplate.update(query,id);
    }

    @Override
    public List<Student> findAll() {
        String query = "SELECT * FROM students ";
        return jdbcTemplate.query(query,rowMapper);
    }

    @Override
    public int deleteAll() {
        return jdbcTemplate.update("DELETE from students");
    }
}

``` 
## Understanding Repository methods

### 1. save(Student s)<br/>
```
public int save(Student s) {
        String query = "Insert INTO students(id,name,city) values(?,?,?)";
        return jdbcTemplate.update(query,s.getId(),s.getName(),s.getCity());
}
``` 
save(Student s) - this method is used to **add a new Student** to the table.

```
String query = "Insert INTO students(id,name,city) values(?,?,?)";
``` 
For that in the query variable, we have stored the INSERT query.<br/> 
Here '?' means it acts as the parameter which we need to pass while executing the query.<br/>

```
return jdbcTemplate.update(query,s.getId(),s.getName(),s.getCity());
``` 
Now to execute the query, we have used the JdbcTemplate **update()** method, which takes the query as an argument, and other than the query there are 3 values that correspond to 3 '?' respectively.<br/>

#### Let us understand a little more about the update() method.<br/>

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image06.png)

This is used to perform a single SQL update on the table(which includes insert, update and delete queries). <br/>
So, a SQL Prepared Statement is a compulsory argument, and also if the query requires additional parameters(as in the above example), we need to pass those as well.<br/>
This method returns an int, which tells how many rows it affected.<br/>

### 2. update(Student s)
Note this method is different from JDBC template update() method.<br/>
```
@Override
    public int update(Student s) {
        String query = "Update students SET name=?,city=? WHERE id=? ";
        return jdbcTemplate.update(query,s.getName(),s.getCity(),s.getId());
    }
``` 
Same as save() the only difference is instead of INSERT we are using an UPDATE query.<br/>

### 3. findById(Long id)

```
@Override
    public Student findById(Long id) {
        String query = "SELECT * FROM students WHERE id=?";
        return jdbcTemplate.queryForObject(query,rowMapper,id);
    }

```
This method is used to get the Student details with the id we have passed as an argument.<br/>
So, the SELECT query will be used for this.<br/>
> 
*Here, as we are not updating the database we will not use the update() method of JdbcTemplate but use queryForObject()*.<br/>

Let us understand this method in detail.<br/>
The first parameter is the query.<br/>
The second parameter is a rowMapper.<br/> 
#### **What is RowMapper?**

When the queryForObject() will execute the SELECT query, then from the database, we will receive row data.<br/> Now to convert this row data to a Student object RowMapper is used.<br/>

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image07.png)

RowMapper is a Functional Interface as it has only one method(mapRow) and if you are aware, we can use lambda expression for the implementation.<br/>
In the same Repository class, we have provided the implementation.<br/>

```
RowMapper<Student> rowMapper = (rs,rowNum)->{
        Student s = new Student();
        s.setId(rs.getInt("id")); //mapping data of id column to id variable
        s.setName(rs.getString("name")); //mapping of name column to name variable
        s.setCity(rs.getString("city")); //mapping of city column to city variable
        return s;
};
``` 
### 4. findAll()

```
@Override
    public List<Student> findAll() {
        String query = "SELECT * FROM students ";
        return jdbcTemplate.query(query,rowMapper);
}
``` 
This method will get all the Students from the table.<br/>
In the above example, we required just one row for which we used queryForObject() and in this example, we require multiple rows, so we will use the query() method.<br/>

## Controller

```
@RestController
@RequestMapping("/api")
public class StudentController {
    @Autowired
    StudentDAO studentDAO;

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents(){
        List<Student> students = studentDAO.findAll();

        if (students.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @PostMapping("/students")
    public ResponseEntity<String> addStudent(@RequestBody Student s){
        try {
            int result = studentDAO.save(s);
            return new ResponseEntity<>("Student added Successfully",HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PutMapping("/students/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable("id") long id, @RequestBody Student s){
        Student existingStudent = studentDAO.findById(id);
        Student newDetails = new Student();
        if(existingStudent!=null){
            newDetails.setId(id);
            newDetails.setName(s.getName());
            newDetails.setCity(s.getCity());

            studentDAO.update(newDetails);
            return new ResponseEntity<>("Updated details successfully", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Cannot find Student with id=" + id, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/students/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") long id) {
        try {
            int result = studentDAO.deleteById(id);
            if (result == 0) {
                return new ResponseEntity<>("Cannot find Student with id=" + id, HttpStatus.OK);
            }
            return new ResponseEntity<>("Student was deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Cannot delete Student.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/students")
    public ResponseEntity<String> deleteAllStudents() {
        try {
            int numRows = studentDAO.deleteAll();
            return new ResponseEntity<>("Deleted " + numRows + " Student(s) successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Cannot delete Students.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

``` 
#### 1. GET - retrieve all Students
For this we are using, we are using the findAll() method of the repository. 

#### 2. POST - add new Student
We need Student as RequestBody and using the save() method of the repository.

#### 3. PUT - update details of Student.
We need id in the path variable and new details in the Request Body.
Using the findById() we check whether there exists a student with the given id or not. If yes, we use the update() method to update the details.

#### 4. DELETE - delete student by id
We need id in the path variable and use deleteById() method.

#### 5. DELETE - delete all students
deleteAll() method is used.

Now let's hit some APIs and see the result.

## Demo
#### 1. Initial state of the table.

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image08.png)

#### 2. Retrieve all students - GET API

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image09.png)

#### 3. Add new Student - POST API

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image10.png)

Database after addition on new Student

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image11.png)

#### 4. Update student - PUT API
Updating details with id=1.

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image12.png)

Database after update

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image13.png)

#### 5. Delete Student by Id - DELETE API

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image14.png)

Database after delete

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image15.png)

#### 6. Delete all students - DELETE API


![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image16.png)

Database after deletion of all students

![image.png](/images/blog/spring-jdbc-template-application-in-springboot/image17.png)

## Conclusion
That is it for this article.<br/>
[Source Code](https://github.com/riteshpanigrahi03/spring-jdbc-template-crud-application)<br/>
😊Hope this helped.<br/>
If you find this helpful do like👍 and follow✔<br/>
Any feedback or suggestions please comment down below<br/>
GoodBye🙌

