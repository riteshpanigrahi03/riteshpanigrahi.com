---
title: 'Flyweight Design Pattern Explained: How Text Editors Save Memory'
date: '2025-11-22T11:37:26.030Z'
slug: flyweight-design-pattern
tags:
  - System Design
  - design patterns
coverImage: /images/blog/flyweight-design-pattern/cover.png
series: Design Patterns Series
seriesOrder: 11
---

# Suppose Flyweight Pattern does not exist!

Imagine we are building a text editor application, each time the user types a character, a corresponding object is created to represent that character on the screen.This object contains information like the character itself, the font type, and its position in the screen.

So now let us start creating this simple application then we will understand what are the problems in it, then we will fix it using flyweight design pattern

**Character Class**:

```java
public class Character {
    private static int objectCreationCount = 0; // Static counter to track object creations
    private char charValue;
    private String fontType;
    private int row;
    private int column;

    public Character(char charValue, String fontType, int row, int column) {
        this.charValue = charValue;
        this.fontType = fontType;
        this.row = row;
        this.column = column;
        objectCreationCount++; // Increment counter on each object creation
    }

    public void display() {
        System.out.println("Character: " + charValue + ", Font: " + fontType + ", Position: (" + row + ", " + column + ")");
    }

    public static int getObjectCreationCount() {
        return objectCreationCount;
    }
}
```

* This class represents a character in a text editor. It contains:
    
    * `charValue`: The character itself.
        
    * `fontType`: The font type of the character.
        
    * `row` and `column`: The position of the character in the screen.
        
* The `display` will have the logic to display Character on the screen, but for simplicity the method prints the character's details on console log
    
* `objectCreationCount` is a static variable used to track the number of objects created.
    

Client - **TextEditorWithoutFlyweight Class:**

```java
public class TextEditorWithoutFlyweight {
    public static void main(String[] args) {
        String sentence = "This is a sample sentence with a lot of repetition in it.";
        int row = 0;
        int column = 0;
        for (char c : sentence.toCharArray()) {
            Character charObj = new Character(c, "Arial", row, column);
            charObj.display();
            column++;
            if (c == ' ') {
                column = 0;
                row++;
            }
        }

        // Print total number of characters in the sentence
        System.out.println("Total characters: " + sentence.length());
        // Print total number of objects created
        System.out.println("Total objects created without Flyweight: " + Character.getObjectCreationCount());
    }
}
```

* This class simulates a text editor without using the Flyweight pattern.
    
* It creates a `Character` object for each character in the given sentence.
    
* The `display` method is called for each `Character` object to print its details.
    
* Then we moves to the next column for each character, but when it finds a space, it jumps to the next row.
    
* After processing the entire sentence, it prints the total number of characters in the sentence and the total number of `Character` objects created.
    

# Problems

*Do you see any issue with this approach ?*

The problem with the current approach is that it creates a **new object for every character** in the text, which can lead to a large number of objects being created and **consume a lot of memory**.

If you are designing a memory-crunching application, then one needs to be mindful of memory consumption.

If you observe our sample sentence

```java
String sentence = "This is a sample sentence with a lot of repetition in it.";
```

There are lot of characters which are repeating, and with the current approach we are creating object for each character.

*What if we are able to store/cache the object of the character once it is created and reuse the same one again if that is repeated?* This way, we don't waste memory by making lots of copies of the same character.

```java
Frequency of each character:
'T': 3
'h': 4
'i': 5
's': 7
'a': 2
'm': 1
'p': 3
'l': 3
'e': 7
'n': 4
't': 6
'c': 2
'w': 1
'o': 2
'f': 1
'r': 2
```

In such situations, Flyweight Design Pattern comes handy.

Now let us understand, what Flyweight Pattern is and then we will solve the above problem using this pattern.

# What is Flyweight pattern?

In simple terms, the Flyweight pattern is a design pattern used to save memory by sharing common parts of objects and reusing them instead of creating new ones. It's like using a template for things that are similar, instead of making a new one every time.

# How to implement Flyweight Pattern?

* ### **Intrinsic Attributes**:
    
    These are the properties of an object that are common and can be shared among multiple objects. In this example, `charValue` and `fontType` are intrinsic attributes of the `Character` objects.
    
    For example, any number of objects for character 't' with font "Arial" , will have the same `charValue` and `fontType` .
    
* ### **Extrinsic Attributes**:
    
    These are the properties of an object that are unique and vary for each instance. In this example, `row` and `column` are extrinsic attributes that vary depending on the position of the character in the text.
    
    However, in this implementation, extrinsic attributes are passed during the display method call instead of being stored within the `Character` objects.
    

### Step 1

So, our first step is to remove extrinsic attributes from our `Character` class and pass them during the display method call instead of being stored within the `Character` objects.

```java
public class Character {
    private static int objectCreationCount = 0; // Static counter to track object creations
    private char charValue;
    private String fontType;

    public Character(char charValue, String fontType) {
        this.charValue = charValue;
        this.fontType = fontType;
        objectCreationCount++; // Increment counter on each object creation
    }

    public void display(int row, int column) {
        System.out.println("Character: " + charValue + ", Font: " + fontType + ", Position: (" + row + ", " + column + ")");
    }

    public static int getObjectCreationCount() {
        return objectCreationCount;
    }
}
```

### Step

In the above explanation, we discussed that we need to cache the objects, how do we achieve that? We will make use of a Factory class

```java
public class CharacterFactory {
    private static Map<String, Character> characterCache = new HashMap<>();

    public static Character getCharacter(char charValue, String fontType) {
        String key = charValue + "_" + fontType;
        Character character = characterCache.get(key);
        if (character == null) {
            character = new Character(charValue, fontType);
            characterCache.put(key, character);
        }
        return character;
    }
}
```

* The `CharacterFactory` class manages the creation of `Character` objects.
    
* It uses a cache (`characterCache`) to store previously created `Character` objects.
    
* The `getCharacter` method checks if the requested character already exists in the cache. If not, it creates a new `Character` object and adds it to the cache. Otherwise, it returns the existing object from the cache.
    

Client - **TextEditorWithFlyweight Class:**

```java
public class TextEditorWithFlyweight {
    public static void main(String[] args) {
        String sentence = "This is a sample sentence with a lot of repetition in it.";
        int row = 0;
        int column = 0;
        for (char c : sentence.toCharArray()) {
            Character charObj = CharacterFactory.getCharacter(c, "Arial");
            charObj.display(row, column);
            column++;
            if (c == ' ') {
                column = 0;
                row++;
            }
        }

        // Print total number of characters in the sentence
        System.out.println("Total characters: " + sentence.length());
        // Print total number of objects created
        System.out.println("Total objects created with Flyweight: " + Character.getObjectCreationCount());
    }
}
```

* The `TextEditorWithFlyweight` class demonstrates the usage of the Flyweight pattern.
    
* For each character, it retrieves the corresponding `Character` object from the `CharacterFactory` using the `getCharacter` method.
    
* It then calls the `display` method of the `Character` object to print the character along with its font and position.
    
* After processing the entire sentence, it prints the total number of characters in the sentence and the total number of `Character` objects created using the `getObjectCreationCount` method.
    

### Let's walk through the code snippet for the sentence "ababbc":

Note - *You can ignore this if you have already understood the above code.*

1. Iteration 1 (character 'a'):
    
    * `charObj = CharacterFactory.getCharacter('a', "Arial")`
        
    * The `characterCache` map is initially empty.
        
    * Since 'a' is not present in the cache, a new `Character` object is created and added to the cache:
        
        * Key: "a\_Arial", Value: Character('a', "Arial")
            
    * The `display` method is called for the character 'a'.
        
2. Iteration 2 (character 'b'):
    
    * `charObj = CharacterFactory.getCharacter('b', "Arial")`
        
    * The cache now contains one entry for character 'a':
        
        * Key: "a\_Arial", Value: Character('a', "Arial")
            
    * Since 'b' is not present in the cache, a new `Character` object is created and added to the cache:
        
        * Key: "b\_Arial", Value: Character('b', "Arial")
            
    * The `display` method is called for the character 'b'.
        
3. Iteration 3 (character 'a'):
    
    * `charObj = CharacterFactory.getCharacter('a', "Arial")`
        
    * The cache now contains two entries for characters 'a' and 'b':
        
        * Key: "a\_Arial", Value: Character('a', "Arial")
            
        * Key: "b\_Arial", Value: Character('b', "Arial")
            
    * 'a' is already present in the cache, so the existing `Character` object is retrieved from the cache.
        
    * The `display` method is called for the character 'a'.
        
4. Iteration 4 (character 'b'):
    
    * `charObj = CharacterFactory.getCharacter('b', "Arial")`
        
    * The cache still contains two entries for characters 'a' and 'b':
        
        * Key: "a\_Arial", Value: Character('a', "Arial")
            
        * Key: "b\_Arial", Value: Character('b', "Arial")
            
    * 'b' is already present in the cache, so the existing `Character` object is retrieved from the cache.
        
    * The `display` method is called for the character 'b'.
        
5. Iteration 5 (character 'b'):
    
    * `charObj = CharacterFactory.getCharacter('b', "Arial")`
        
    * The cache still contains two entries for characters 'a' and 'b':
        
        * Key: "a\_Arial", Value: Character('a', "Arial")
            
        * Key: "b\_Arial", Value: Character('b', "Arial")
            
    * 'b' is already present in the cache, so the existing `Character` object is retrieved from the cache.
        
    * The `display` method is called for the character 'b'.
        
6. Iteration 6 (character 'c'):
    
    * `charObj = CharacterFactory.getCharacter('c', "Arial")`
        
    * The cache now contains three entries for characters 'a', 'b', and 'c':
        
        * Key: "a\_Arial", Value: Character('a', "Arial")
            
        * Key: "b\_Arial", Value: Character('b', "Arial")
            
        * Key: "c\_Arial", Value: Character('c', "Arial")
            
    * Since 'c' is not present in the cache, a new `Character` object is created and added to the cache:
        
        * Key: "c\_Arial", Value: Character('c', "Arial")
            
    * The `display` method is called for the character 'c'.
        

After processing the entire sentence "ababbc", the cache contains three entries for characters 'a', 'b', and 'c'. The total number of objects created with Flyweight would be 3 otherwise without it this total 7 objects would have been created.

# Conclusion

So, the Flyweight pattern is a helpful tool for optimizing memory usage in applications by reducing the number of objects created and reusing shared objects. By storing common parts of objects and reusing them when needed.

If this was helpful in any way, do give this article a like and share among your friends/colleagues.

Any feedback/suggestions? Please mention them in the comments.

Until we meet again, happy learning!

Complete implementations can be found over [**Github**](https://github.com/riteshpanigrahi03/design-patterns/tree/main/src/flyweight)
