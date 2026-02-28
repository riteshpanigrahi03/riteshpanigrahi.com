---
title: "Understanding the Java Memory Model and 'Happens-Before' Principle"
date: "2024-06-05T14:43:02.647Z"
slug: "java-memory-model-and-happens-before-principle"
tags: ["java memory model", "concurrency", "multithreading"]
coverImage: "/images/blog/java-memory-model-and-happens-before-principle/cover.jpeg"
---

The Java Memory Model (JMM) explains how different threads in a Java program can see and use shared variables. It tells us when one thread make any changes to a variable that become visible to other threads and how to properly coordinate access to these shared variables to ensure everything works correctly.

# JVM Memory Structure

JVM divides the memory into thread stacks and heap

![The Java Memory Model From a Logic Perspective](https://jenkov.com/images/java-concurrency/java-memory-model-1.png align="center")

### **Thread Stack**

* Each thread has its own stack containing method call information and local variables.
    
* When a method is called, a new entry is pushed onto the stack, and when the method completes, the entry is popped off.
    
* Local variables of primitive types are stored on the stack and are not accessible to other threads. Each thread executing the same method will have its own copy of the local variables.
    
* If multiple threads are executing same methods, each thread will have its own copy of the local variables in their respective threads.
    

### **Heap**

* The heap contains all objects created in the Java application and is shared by all threads.
    
* If any primitive variable is part of an object, that will be stored in heap section
    
* Even if the object is created locally inside the thread, still the object resides in the heap memory, just the reference of it is stored in the thread stack as a local variable.
    

Let us understand above with an example

```java
public class TaskExample implements Runnable {

    public void run() {
        performTask();
    }

    public void performTask() {
        // Local variable - stored in the thread stack
        int localCounter = 10;

        // Reference to shared object - reference is in the thread stack, object is in the heap
        SharedData localData = SharedData.sharedInstance;

        // Print local variables
        System.out.println(Thread.currentThread().getName() + " - localCounter: " + localCounter);
        System.out.println(Thread.currentThread().getName() + " - SharedData: " + localData);

        // Accessing shared object's member variables
        System.out.println(Thread.currentThread().getName() + " - sharedValue1: " + localData.sharedValue1);
    }

    public static void main(String[] args) {
        TaskExample task = new TaskExample();

        Thread thread1 = new Thread(task, "Thread-1");
        Thread thread2 = new Thread(task, "Thread-2");

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class SharedData {

    // Static variable pointing to instance of SharedData - stored in the heap
    public static final SharedData sharedInstance = new SharedData();

    // Member variables pointing to objects on the heap
    public String sharedValue1 = "Shared Value";

    // Constructor
    private SharedData() {}
}
```

1. **Heap**:
    
    * The `SharedData` object, referenced by `SharedData.sharedInstance`, is stored in the heap.
        
    * The member variable `sharedValue1` of `SharedData` is stored in the heap.
        
2. **Thread Stack**:
    
    * Each thread (`Thread-1` and `Thread-2`) has its own stack.
        
    * The local variable `localCounter` in `performTask` is stored in the stack of each thread.
        
    * The reference to `SharedData.sharedInstance` (stored in `localData` in `performTask`) is in the stack of each thread, but the actual object is in the heap.
        

# Hardware Memory Architecture

The Java Memory Model (JMM) is a logical concept that provides a framework for understanding how Java threads interact through memory. However, it maps into the physical hardware architecture which involves registers, cache, and RAM. Let's break this down:

At the hardware level, the actual memory interactions occur through:

* **Registers**: These are in-CPU memory, which is small and fast storage locations used for calculations and data manipulation.
    
* **Cache**: Small, fast memory located close to the CPU, used to temporarily hold data that is likely to be used again soon. It helps reduce the time to access data from the main memory.
    
* **RAM (Main Memory)**: The larger, slower memory where data and programs reside when they are being used.
    

The Java Memory Model (JMM) and hardware memory architecture are different concepts. In hardware, both thread stacks and the heap are stored in main memory, with no distinction between them. Some parts of the stacks and heap can also be present in CPU caches and registers.

[![The division of thread stack and heap among CPU internal registers, CPU cache and main memory.](https://jenkov.com/images/java-concurrency/java-memory-model-5.png align="center")](https://jenkov.com/tutorials/java-concurrency/java-memory-model.html)

So, if thread stacks and heap are at different memory locations at hardware level, this can create issues while accessing variables in case of multi-threaded environment

1. **Visibility Issues**:
    
    * Changes made by one thread to shared variables may not be immediately visible to other threads if the updates are only in CPU caches or registers. This can lead to stale data being read.
        
    * **Solve** - We can use Java volatile keyword for a variable, this will indicate any variable will be read from main memory and written back into the main memory once updated
        
2. **Race Conditions**:
    
    * A **race condition** occurs in a concurrent program when two or more threads access shared data at the same time and at least one thread modifies the data.
        
    * **Solve** - Using `synchronized` block which guarantees only one thread will access the critical section at a time, which makes sure shared variables are not updated concurrently at the same time.
        

# Java Happens-Before Guarantee

Suppose we have a simple data loader class that loads some data (a list of strings) and provides a status flag indicating if the data is loaded:

```java
public class DataLoader {

    private boolean dataLoaded = false;
    private List<String> data;

    public void loadData() {
        data = new ArrayList<>(); // load data here
        dataLoaded = true;
    }

    public boolean isDataLoaded() {
        return dataLoaded;
    }

    public List<String> getData() {
        if (!dataLoaded) throw new IllegalStateException("Data not loaded yet");
        return data;
    }
}
```

In a multi-threaded scenario, if one thread calls `loadData()` and another thread calls `getData()`, there could be a race condition. The second thread might see `dataLoaded` as `true` (because it's updated), but still gets null or partial `data` (because it's not fully written to memory yet).

This is because Java's memory model allows for r**eordering of instructions** and **caching of variables**, which means there's no guarantee that `dataLoaded` is written to memory after `data` is fully written. The `getData()` method can see the updated `dataLoaded` but the stale `data`.

To solve this problem, we need to enforce a "Happens-Before" relationship between the write to `data` and the write to `dataLoaded`. We can do this using `synchronized` or `volatile` keyword.

**Using synchronized**:

```java
public class DataLoader {

    private boolean dataLoaded = false;
    private List<String> data;

    public synchronized void loadData() {
        data = new ArrayList<>(); // load data here
        dataLoaded = true;
    }

    public synchronized boolean isDataLoaded() {
        return dataLoaded;
    }

    public synchronized List<String> getData() {
        if (!dataLoaded) throw new IllegalStateException("Data not loaded yet");
        return data;
    }
}
```

With `synchronized`, when a thread exits a `synchronized` method (like `loadData()`), it flushes its own cache to the main memory, ensuring that the changes it made are visible to other threads. This guarantees that if `dataLoaded` is seen as `true` by the `getData()` method, then the `data` is also fully written to memory.

And here's the version with `volatile`:

```java
public class DataLoader {

    private volatile boolean dataLoaded = false;
    private List<String> data;

    public void loadData() {
        data = new ArrayList<>(); // load data here
        dataLoaded = true;
    }

    public boolean isDataLoaded() {
        return dataLoaded;
    }

    public List<String> getData() {
        if (!dataLoaded) throw new IllegalStateException("Data not loaded yet");
        return data;
    }
}
```

With `volatile`, each write to the `dataLoaded` variable is immediately flushed to main memory, and each read of `dataLoaded` fetches the value directly from main memory. This guarantees that if `dataLoaded` is seen as `true` by the `getData()` method, then the `data` is also fully written to memory.

In conclusion, Java's "Happens Before" guarantee is crucial for ensuring consistency in multi-threaded environments.

# Conclusion

Understanding the Java Memory Model and the "happens-before" guarantee is important for every Java developer to ensure thread safety, consistency and visibility in a multi-threaded environment.

If you found this helpful, please like and share. Any feedback? Mention it in the comments.

Thanks for reading!

References

1. [https://jenkov.com/tutorials/java-concurrency/java-memory-model.html](https://jenkov.com/tutorials/java-concurrency/java-memory-model.html)
    
2. [https://jenkov.com/tutorials/java-concurrency/java-happens-before-guarantee.html](https://jenkov.com/tutorials/java-concurrency/java-happens-before-guarantee.html)