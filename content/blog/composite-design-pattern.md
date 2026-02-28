---
title: "Exploring the Composite Design Pattern: Simplify Object Hierarchies"
date: "2024-03-23T17:55:19.120Z"
slug: "composite-design-pattern"
tags: ["design patterns", "System Design"]
coverImage: "/images/blog/composite-design-pattern/cover.png"
---

Hello everyone, welcome to another article of the Design Pattern series and in todays article we will understand all about Composite Design Pattern.

### **What is Composite Design Pattern?**

Imagine, we are designing a packaging system where we have 2 objects `Item` and `Box`

A Box can contain Items or it can also contains smaller Boxes, these smaller boxes can also contains Item or even smaller boxes

![](/images/blog/composite-design-pattern/image01.png)

In the above diagram, we can see a bigger box contains Items or smaller boxes, which further contains items or boxes. Now suppose, we want to calculate the total price of all the items in the bigger box. How can we do that?

In real world, we can unwrap all the boxes and calculate the price of each item. But if we try to do it through code using loop, we need the info of all the boxes and the nested boxes in it beforehand, which is a cumbersome process.

In such cases, where we can see a hierarchy, Composite Design Pattern comes into the picture.

The Composite pattern suggests that you work with `Items` and `Boxes` through a common interface which declares a method for calculating the total price.

How will it work?

For an item, we can simply return the price of it, but for a box it will check each item in the box and ask its price and then return the total price of it. If a box further contains a box, it will do the same thing for each item.

This is similar to the recursion concept.

The benefit of this approach is there is no need to know the concrete classes of objects in the tree. We don't care whether its an Item or a Box, as both share a common interface and has a method to calculate the price of it.

So, composite design pattern is a structural design pattern that let us compose objects in tree structure and then work with these structures as if they were individual objects.

In simpler terms, it helps you organize your objects in a way that you can treat both individual objects and groups of objects in a similar fashion.

## Design a File System

To more strengthen our understanding, let us try design a file system which will use composite design pattern

Suppose, we have a root directory and it can contain files or sub-directories. Similarly, each of the sub-directories can have files or directories in it.

Sounds similar to the above Item and Box example, right?

![](/images/blog/composite-design-pattern/image02.png)

1. If you see the above diagram, we have files and directories both belong to FileSystemComponent (this will be the common interface which we talked above)
    
2. The tree has a *Leaf* which is basically the File and it can't have further children attach to it
    
3. Other than leaf, we have Directories which is called as *Composite*, that can contain files or sub-directories in it. It will also have feature to add/remove multiple FileSystemComponent(can be Files or Directories)
    

**Now let us start implementing File System**

![](/images/blog/composite-design-pattern/image03.png)

`FileSystemComponent`**Interface:**

```java
public interface FileSystemComponent {
    void ls();
}
```

This is the interface that defines the common operations for both leaf components (files) and composite components (directories). The `ls` method is used to list the contents.

### `File`**Class:**

```java
package composite;

public class File implements FileSystemComponent {
    private String name;

    public File(String name) {
        this.name = name;
    }

    @Override
    public void ls() {
        System.out.println("File ->" + this.name);
    }
}
```

The `File` class implements the `FileSystemComponent` interface and represents a leaf component. It has a `name` attribute, and the `ls` method is implemented to display the file name.

### `Directory`**Class:**

```java
package composite;

import java.util.ArrayList;
import java.util.List;

public class Directory implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> childComponents;

    public Directory(String name) {
        this.name = name;
        this.childComponents = new ArrayList<>();
    }

    @Override
    public void ls() {
        System.out.println("Directory ->" + this.name);
        childComponents.forEach(FileSystemComponent::ls);
    }

    public void addComponent(FileSystemComponent component) {
        this.childComponents.add(component);
    }
}
```

The `Directory` class also implements the `FileSystemComponent` interface, and it represents a composite component.

It has a `name` attribute and a list (`childComponents`) to store its child components, which can be either files or subdirectories.

The `ls` method is implemented to display the directory name and recursively list the contents of its child components.

### `CompositeDemo`**Class (Client Code):**

```java
package composite;

public class CompositeDemo {
    public static void main(String[] args) {
        FileSystemComponent file1 = new File("passport.pdf");
        FileSystemComponent file2 = new File("result.jpg");

        Directory rootDirectory = new Directory("root");
        Directory subDirectory = new Directory("SubFolder");
        subDirectory.addComponent(file2); // adding file2 in subfolder

        rootDirectory.addComponent(file1); // adding file 1 in root
        rootDirectory.addComponent(subDirectory); // adding subfolder in root directory

        rootDirectory.ls();
    }
}
```

The `CompositeDemo` class is the client code that demonstrates the use of the Composite Pattern. It creates instances of `File` and `Directory`, adds them to each other, and then calls the `ls` method on the root directory to display the entire file system structure.

### **Output:**

```java
Directory ->root
File ->passport.pdf
Directory ->SubFolder
File ->result.jpg
```

The output shows the structure of the file system, where "root" is the main directory containing "passport.pdf" and a subdirectory "SubFolder" containing "result.jpg". The Composite Pattern allows treating both files and directories uniformly, providing a flexible and scalable structure for representing file systems.

## **Conclusion**

Thats it for this one, give this a like if you find it helpful and share among your friends.

Any feedback? Please mention them in the comments.

Until we meet again, happy learning!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/composite)

References

1. [https://www.youtube.com/watch?v=FLkCkUY7Wu0](https://www.youtube.com/watch?v=FLkCkUY7Wu0)
    
2. [https://refactoring.guru/design-patterns/composite](https://refactoring.guru/design-patterns/composite)