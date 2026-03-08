---
title: Singleton Design Pattern
date: '2024-01-03T12:30:09.823Z'
slug: singleton-design-pattern
tags:
  - design patterns
  - System Design
  - Java
  - interview
coverImage: /images/blog/singleton-design-pattern/cover.png
series: Design Patterns Series
seriesOrder: 1
---

Hello everyone! Welcome to the first article in the design pattern learning series. In this complete series, we will understand all types of design patterns that will be useful in our software engineering career.

Before jumping into the Singleton design pattern, let us first understand in short what exactly the design pattern is and how are they classified.

## What are Design Patterns and how are they Classified?

In simple words, a design pattern is a general and reusable solution to a common problems that occurs during software design. It's like a template that helps software developers solve specific problems efficiently.

It is a solution to recurring design problems, which promotes best practices and makes it easier to understand the structure of code.

Design patterns are classified into 3 major categories based on their usage. Here are three common classifications:

1. **Creational Patterns:**
    
    * These patterns *deal with object creation mechanisms*, that increase flexibility and reuse of existing code.
        
    * Examples include the `Singleton pattern` (ensures a class has only one instance) and the `Factory pattern` (creates objects without specifying the exact class).
        
2. **Structural Patterns:**
    
    * These patterns focus on *organizing different classes and objects to form larger structures*, making it easier to understand and manage complex systems.
        
    * Examples include the `Adapter` pattern (which allows incompatible interfaces to work together) and the `Composite` pattern (which composes objects into tree structures to represent part-whole hierarchies).
        
3. **Behavioral Patterns:**
    
    * These patterns define *how objects interact and communicate with each other.*
        
    * Examples include the Observer pattern (defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified) and the Strategy pattern (defines a family of algorithms, encapsulates each one, and makes them interchangeable).
        

If this explanation seems too much, no need to stress, We'll go through each design pattern step by step, explaining everything thoroughly and providing code examples along the way.

Now let's start with our first Design pattern which is the Singleton Design Pattern

## What is the Singleton Pattern?

Singleton pattern is used when we want a class to have one and only **one instance** throughout the lifetime of an application.

This is a **creational** design pattern because it specifies how the object should be created.

This pattern makes sure, that if a class is a singleton class then it should be instantiated only once, preventing multiple object creation.

Now, you might think, Why would we need to control object creation of any class? or Why only 1 object should be created throughout the application? let us now understand some practical use cases of this design pattern

## Practical Applications

1. **Database Connections**: A Singleton database connection pool can manage access to a limited number of connections, allowing multiple components to share connections and preventing the creation of unnecessary connections.
    
2. **Configuration Management**: A Singleton configuration manager can provide a single point of access to configuration settings and ensure that they are consistent throughout the application.
    

## Implementation

As we all know, objects are created using constructors and generally constructors have public access type, by this no way we can control multiple object creation.

So, the first step here is to make the **constructor private.**

Now the question comes, if the constructor is private, How can we access it?

For this, we will need to create a static method (suppose `getInstance()`), which will internally call the private constructor and also handle multiple object creation. This static method will act as a constructor for us while creating the object.

There are 2 ways by which we can create a Singleton class

1. Lazy Initialization - Creates object when it is needed
    
2. Eager Initialization - Creates object beforehand.
    

### Lazy Initialization

```java
public class LazyInitSingleton {
    private static LazyInitSingleton lazyInitSingletonInstance;

    private LazyInitSingleton() {

    }

    /**
     * This static method will initialize the object when it is called for the first time,
     * for the subsequent calls the if condition will fail and it will return the already created object
     * @return the singleton object
     */
    public static LazyInitSingleton getInstance() {
        if (lazyInitSingletonInstance == null) {
            lazyInitSingletonInstance = new LazyInitSingleton();
        }
        return lazyInitSingletonInstance;
    }

    public void printMessage(String threadName) {
        System.out.println("Hello from " + threadName + "! " + getClass().getSimpleName() + "Instance hash code: " + this.hashCode());
    }
}
```

1. We have a class `LazyInitSingleton`, which has a static variable that will hold the object, initially it is null.
    
2. As discussed above, a private constructor will help us to stop the object creations using a constructor.
    
3. static method `getInstance()`, this method first checks if the object is not yet created i.e. `lazyInitSingletonInstance` is `null`, then it calls the private constructor, and the object is created.
    
4. If the object has already been created, then instead of creating it again, it returns `lazyInitSingletonInstance`(which was initialized the first time when *getInstance{}* was called)
    
5. There is another method `printMessage()`, will be using this in further explanation, do not worry about this.
    

Now that we have created the class, let us verify whether it is working properly or not.

```java
 private static void implementLazyInitSingleton() {
        LazyInitSingleton lazyInitSingleton1 = LazyInitSingleton.getInstance();
        LazyInitSingleton lazyInitSingleton2 = LazyInitSingleton.getInstance();

        System.out.println("LazyInitSingleton Obj 1 Hashcode : " + lazyInitSingleton1.hashCode());
        System.out.println("LazyInitSingleton Obj 2 Hashcode : " + lazyInitSingleton2.hashCode());
    }
```

In the client class, we have 2 references `lazyInitSingleton1` and `lazyInitSingleton2`, but as the class is Singleton both should refer to the same object i.e. should have the same hashcode

```java
LazyInitSingleton Obj 1 Hashcode : 1828972342
LazyInitSingleton Obj 2 Hashcode : 1828972342
```

Step 1 - When `LazyInitSingleton.getInstance()` is called for lazyInitSingleton1, `lazyInitSingletonInstance` is null and the object is created and returned

Step 2 - Then for `lazyInitSingleton1` same `getInstance()` was called, at this time `lazyInitSingletonInstance` was not null, and the same object was returned which was created in step 1.

**The problem with Lazy Initialization**

This **isn't thread-safe**. If many threads use the `getInstance()` method simultaneously, it could create multiple objects. This happens because `lazyInitSingletonInstance` might be null when two threads are calling `getInstance()` at the same time.

Let us see this in our code.

```java
private static void implementMultiThreadLazyInit() {
        // Create three threads
        //This creates multiple objects , though class was designed as Singleton class.
        //This is why LazyInitSingleton is not thread-safe
        Thread thread1 = new Thread(() -> LazyInitSingleton.getInstance().printMessage("Thread 1"));
        Thread thread2 = new Thread(() -> LazyInitSingleton.getInstance().printMessage("Thread 2"));
        Thread thread3 = new Thread(() -> LazyInitSingleton.getInstance().printMessage("Thread 3"));

        thread1.start();
        thread2.start();
        thread3.start();
        /**
         * Sample Output
         * Hello from Thread 3! LazyInitSingletonInstance hash code: 2007819528
         * Hello from Thread 1! LazyInitSingletonInstance hash code: 1600927072
         * Hello from Thread 2! LazyInitSingletonInstance hash code: 2007819528
         */
    }
```

If we see the sample output, threads 3 and 2 point to the same object, but thread 1 has a different hashcode. Thread 1 and either thread 2 or 3 might have called the `getInstance()` method at the same time and 2 objects were created.

How to solve this problem?

### Eager/Early Initialization

In this approach, the object gets created during class loading as soon as JVM starts, irrespective of whether it gets accessed by any code in the application.

Let us see how we implement it.

```java
public class EagerInitSingleton {
    /**
     * In this approach, object is created beforehand when the class is loaded
     * Whenever getInstance method is called, the same object is returned
     * Pros - This is thread-safe, as multiple threads call the getInstance method at same time, and same object will be returned.
     * Cons - Waste of resources, as object is created already but there can be cases that it is never been used
     */
    private static final EagerInitSingleton eagerInitSingletonInstance = new EagerInitSingleton();

    private EagerInitSingleton() {

    }

    public static EagerInitSingleton getInstance() {
        return eagerInitSingletonInstance;
    }

    public void printMessage(String threadName) {
        System.out.println("Hello from " + threadName + "! " + getClass().getSimpleName() + "Instance hash code: " + this.hashCode());
    }
}
```

As you can see in the above code snippet, the object of `EagerInitSingleton` class is created when it is declared.

Unlike the LazyInitialization,`getInstance()` does not have any null checks as the object is already created. Due to this, this approach is thread-safe as well, multiple threads can call the `getInstance()` method at the same time and the same instance will be returned.

```java
private static void implementMultiThreadEagerInit() {
        // Create three threads
        Thread thread1 = new Thread(() -> EagerInitSingleton.getInstance().printMessage("Thread 1"));
        Thread thread2 = new Thread(() -> EagerInitSingleton.getInstance().printMessage("Thread 2"));
        Thread thread3 = new Thread(() -> EagerInitSingleton.getInstance().printMessage("Thread 3"));
        thread1.start();
        thread2.start();
        thread3.start();
    }
```

```java
Hello from Thread 3! EagerInitSingletonInstance hash code: 212869761
Hello from Thread 1! EagerInitSingletonInstance hash code: 212869761
Hello from Thread 2! EagerInitSingletonInstance hash code: 212869761
```

As we see in the above example, 3 threads are created with calls to the `getInstance()` method and each of the threads gets the same object.

**The problem with Eager Initialization**

This approach also has some issues, as the object is already created even if it is not needed, and this results in a waste of resources.

The resource was efficiently used in lazy initialization but it was not thread-safe.  
*Can we implement lazy initialization with thread safety? YES, let us see that in the next section.*

### Singleton Pattern with Synchronization

If you remember, the problem with `LazyInitialization` in a multi-threaded environment is `getInstance()` method is accessed by multiple threads at the same time, which results in the creation of more than one object.

If we somehow put some locking mechanism for the `getInstance()` method, our problem will be solved. This can be done in 2 ways

1. Create `getInstance()` synchronized, this will help that only one instance or thread can invoke this method. However, the problem is, suppose there are 3 threads `t1`,`t2`, and `t3` which wants to get the object and if `t1` has acquired the lock to access the methods, `t2` and `t3` has to wait. This results in unnecessary locks.
    
2. Instead of making the complete method synchronized, we can make use of a synchronized block which will help to get the lock only while object creation and not while reading/getting the object
    

```java
public class MultiThreadLazySingleton {
    private static MultiThreadLazySingleton multiThreadLazySingletonInstance;

    private MultiThreadLazySingleton() {

    }

    public static MultiThreadLazySingleton getInstance() {
        if (multiThreadLazySingletonInstance == null) {
            synchronized (MultiThreadLazySingleton.class) {
                if (multiThreadLazySingletonInstance == null) {
                    multiThreadLazySingletonInstance = new MultiThreadLazySingleton();
                }
            }
        }
        return multiThreadLazySingletonInstance;
    }

    public void printMessage(String threadName) {
        System.out.println("Hello from " + threadName + "! " + getClass().getSimpleName() + "Instance hash code: " + this.hashCode());
    }
}
```

Let us focus on the `getInstance()` method and understand the working, The rest of the code is the same as LazyInitialziation

1. Suppose there are 2 threads `t1` and `t2`, which is calls the `getInstance()` method at the same time, both the threads will bypass the first null check and will come to the `synchronized` block
    
2. Now suppose `t1` acquires the lock and gets inside the `synchronized` block
    
3. There is another null check, *why is that*? If `t1` bypasses the second null check, it will create an object. Then, `t1` releases the lock, and `t2`, which was waiting, acquires it. Without the second null check, another new object could be created. Adding the second null check avoids this problem.
    
4. Now suppose there are 2 more threads `t3`, and `t4`, when they call the `getInstance()` method no lock needs to be acquired as the object is already created. This is why we used a `synchronized` block instead of the `synchronized` method, which needs a lock even for read access.
    

```java
 private static void implementMultiThreadLazyInitWithSynchronization() {
        Thread thread1 = new Thread(() -> MultiThreadLazySingleton.getInstance().printMessage("Thread 1"));
        Thread thread2 = new Thread(() -> MultiThreadLazySingleton.getInstance().printMessage("Thread 2"));
        Thread thread3 = new Thread(() -> MultiThreadLazySingleton.getInstance().printMessage("Thread 3"));
        thread1.start();
        thread2.start();
        thread3.start();
    }
```

```java
Hello from Thread 3! MultiThreadLazySingletonInstance hash code: 1251671433
Hello from Thread 2! MultiThreadLazySingletonInstance hash code: 1251671433
Hello from Thread 1! MultiThreadLazySingletonInstance hash code: 1251671433
```

## Hacking the Singleton Pattern

Till now we have seen all the good parts of this pattern, but there are ways where this pattern can be broken. In this section, we will understand how to break the pattern and what are the ways to prevent it from breaking.

### Break Singleton Pattern with Serializable

Let's create a Singleton class with implements the Serializable interface

```java
public class SerializableSingleton implements Serializable {
    private static SerializableSingleton serializableSingletonInstance;

    private SerializableSingleton() {

    }

    public static SerializableSingleton getInstance() {
        if (serializableSingletonInstance == null) {
            serializableSingletonInstance = new SerializableSingleton();
        }
        return serializableSingletonInstance;
    }
}
```

Serialization is used to convert the object to a byte array or a file to communicate over the network and while retrieving it we deserialize it and convert it into an object.

```java
 private static void implementSerializableSingleton() throws IOException, ClassNotFoundException {
        SerializableSingleton serializableSingleton = SerializableSingleton.getInstance();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("object.obj"));
        objectOutputStream.writeObject(serializableSingleton);
        objectOutputStream.close();

        //deserialzing
        ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("object.obj"));
        SerializableSingleton deserializedInstance = (SerializableSingleton) objectInputStream.readObject();
        objectInputStream.close();
        System.out.println("SerializableSingleton Object 1 :" + serializableSingleton.hashCode());
        System.out.println("SerializableSingleton Object 2 :" + deserializedInstance.hashCode());
    }
```

1. First, we create an object, `serializableSingleton`  
    then we Serialize it into a file object.obj
    
2. To deserialize it we used the same file and got the object `deserializedInstance`
    
3. As we can see the class `SerializableSingleton` is a Singleton class, then both the object `serializableSingleton` and `deserializedInstance` should be the same, but that's not the case here.
    

```java
SerializableSingleton Object 1 :626202354
SerializableSingleton Object 2 :1274370218
```

As we can see the hashcode for both the objects of the same class is different, this violates the SIngleton pattern principle.

**How do we resolve this?**  
In our class, we need to Override a method `readResolve()` which is called by the JVM during deserialization, this method will return the existing instance instead of creating a new one during deserialization.

```java
public class SerializableSingleton implements Serializable {
    private static SerializableSingleton serializableSingletonInstance;

    private SerializableSingleton() {

    }

    public static SerializableSingleton getInstance() {
        if (serializableSingletonInstance == null) {
            serializableSingletonInstance = new SerializableSingleton();
        }
        return serializableSingletonInstance;
    }

    protected Object readResolve() {
        return serializableSingletonInstance;
    }
}
```

```java
SerializableSingleton Object 1 :626202354
SerializableSingleton Object 2 :626202354
```

### Break Singleton Pattern using Reflections

As we know using Reflections, we can get access to all the methods, and constructors of a class. This can violate the singleton design pattern, as we can convert the private constructor to public and create multiple objects.

We will make use of the LasySingleton class for this example

```java
private static void implementReflection() throws InvocationTargetException, InstantiationException, IllegalAccessException, InvocationTargetException {
        Constructor[] constructors = LazyInitSingleton.class.getDeclaredConstructors();

        Constructor constructor = constructors[0];
        constructor.setAccessible(true); // making private constructor public

        LazyInitSingleton lazySingleton = (LazyInitSingleton) constructor.newInstance(); // creates a object by using public constructor created above
        LazyInitSingleton instance = LazyInitSingleton.getInstance();
        System.out.println("Reflected hashcode singleton :"+lazySingleton.hashCode());
        System.out.println("Singleton instance : "+ instance.hashCode());
    }
```

1. We got all the constructors using `getDeclaredConstructors()`
    
2. Then we make the `private` constructor `public`
    
3. Now we create 2 objects, one using the getInstance() method and another using the constructor we got using reflection and both will have different hashcodes
    

```java
Reflected hashcode singleton :1828972342
Singleton instance : 1531448569
```

**How to resolve this?**

To solve this problem, we can use Enums to create a Singleton class

```java
public enum EnumSingleton {
    SINGLETON_INSTANCE;

    public void printMessage() {
        System.out.println("Hello! from EnumSingleton. Hashcode - " + this.hashCode());
    }
}
```

1. Enums by default have static members and always result in singleton objects, here `SINGLETON_INSTANCE` is static and a singleton object
    
2. The constructors are called by JVM and it is thread-safe as well.
    

```java
 EnumSingleton.SINGLETON_INSTANCE.printMessage();
```

Output

```java
Hello! from EnumSingleton. Hashcode - 1915910607
```

## Conclusion

So far in this article, we understood the need for Singleton DP, different ways to implement it, what are the problems in each of them, and how to resolve them.

This article could be a little lengthy for a few of the readers, as I have tried to explain it in a way that will be helpful for beginners as well.

Any feedback? do mention them in the comments.

If you find this helpful do give it a like and share it with your friends. We will again meet in the next one for Factory Design Pattern

Till then, happy learning!

Complete implementations can be found over [Github](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/singleton)

**References**

1. [https://refactoring.guru/design-patterns/singleton](https://refactoring.guru/design-patterns/singleton)
    
2. [https://www.geeksforgeeks.org/singleton-design-pattern/](https://www.geeksforgeeks.org/singleton-design-pattern/)
    
3. [https://www.youtube.com/watch?v=ASI0TfcY\_7U](https://www.youtube.com/watch?v=ASI0TfcY_7U)
