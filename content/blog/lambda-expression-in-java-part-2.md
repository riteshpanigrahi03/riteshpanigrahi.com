---
title: "Lambda Expression in Java - Part 2"
date: "2021-11-27T13:33:34.933Z"
slug: "lambda-expression-in-java-part-2"
tags: ["Java"]
coverImage: "/images/blog/lambda-expression-in-java-part-2/cover.png"
---

In the  [previous ](https://riteshpanigrahi.hashnode.dev/lambda-expression-in-java-part-1) article, we learned about *lambda expression*, *why and when to use them, how to write lambda expressions, functional interfaces, and the difference between lambda expression and inner classes*.<br/>

In this article, we will understand **available functional interfaces** and **closures**.<br/>

# 1. Why create Functional Interfaces?<br/>
In the [previous ](https://riteshpanigrahi.hashnode.dev/lambda-expression-in-java-part-1) article, we have seen that to make use of lambda expression we need ***Functional Interfaces***.<br/>Let's consider the below example to understand more
<br/>
We have created a class **Player** which has a *name, age, and the category* as instance variables.<br/>


```
class Player{
    String name;
    int age;
    String category;

    public Player(String name, int age, String category) {
        this.name = name;
        this.age = age;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
``` 
Below is the **Main** class<br/>

```
import java.util.Arrays;
import java.util.List;

public class Main{
    public static void main(String[] args) {
        List<Player> players = Arrays.asList(
                new Player("Dhoni",39,"Wicket Keeper"),
                new Player("Kohli",33,"Batter"),
                new Player("Bumrah",27,"Bowler"),
                new Player("Rohit",32,"Batter"),
                new Player("Jadeja",31,"All-rounder"),
                new Player("Hardik",26,"All-rounder")
                );

        System.out.println("Print All the batters from the list");
        printOnCondition(players, p->p.getCategory().equals("Batter"),p->System.out.println(p.getName()));

        System.out.println("\nPrint All the players with category whose age less than 30");
        printOnCondition(players,p->p.getAge()<30,p->System.out.println(p.getName()+ "->"+p.getCategory()));
        ;
    }

    private static void printOnCondition(List<Player> players, Condition condition, Perform perform) {
        for(Player player : players){
            if(condition.test(player)){
                perform.action(player);
            }
        }
    }
}


interface Condition{
    boolean test(Player p);
}
interface Perform{
    void action(Player p);
}
``` 
<br/>
1. We have created a *List of Players*<br/>
2. Also there are 2 functional interfaces<br/>
->**Condition ** - has an abstract method test that *takes in a Player and returns boolean*.<br/>
->**Perform** - has an abstract method action that *takes in a Player and does some action and returns nothing*<br/>
3. We also have a method *printOnCondition *which *takes a list of players, an instance of condition, and an instance of Perform*.<br/>
It calls the **test() **method of the Condition interface if that returns true it acts by calling the **action()** method of the Perform interface.<br/>

Whenever we call this method, we pass the lambda expression for the 2<sup>nd</sup> and 3<sup>rd</sup> parameters.<br/>
For eg;-<br/>

```
System.out.println("Print All the batters from the list");
printOnCondition(players, 
                              p->p.getCategory().equals("Batter"),
                              p->System.out.println(p.getName())
                           );
``` 
Here in the second parameter, we have passed the lambda expression which *returns true only if the player is a 'Batter'*.<br/>
In the third parameter, we have passed the lambda expression for the action() method of the Perform interface, which will *just print the name of the player*.<br/>

So, the flow will be, <br/>
* whenever the above method call happens, for loop will start on the list of players and for each player<br/>
* their category will be checked if it is batter<br/>
* then the action method of the perform interface will be called which will just print the name of the player(as we have passed this as lambda expression).<br/>

Similarly, you can also refer to the example where we are printing names and categories of players whose age is less than 30 yrs.<br/>

Here, *creating functional interfaces is overhead*, we have 2 functional interfaces **Condition **and **Perform ** their name could be anything, we just need an *abstract method that takes and inputs and returns boolean(eg:- test method) *and *an abstract method that takes in input and returns nothing(eg:- action method)* respectively.<br/>
So, for this in Java 8 there are already many out-of-the-box interfaces available which we can use in most cases.<br/>

For example, we have an interface  [*Predicate*](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html) it is a generic interface and has an abstract method **test(T t)**, which takes in *input parameter and returns boolean*

![image.png](/images/blog/lambda-expression-in-java-part-2/image01.png)
So, we can use this Predicate interface in place of our created Condition interface.

Similarly, for our **Perform **interface, we need a method that takes an input and returns nothing. We can use the already available  [*Consumer*](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html)  interface, which has a similar method accept(T t).

![image.png](/images/blog/lambda-expression-in-java-part-2/image02.png)

So, now let's update the above *printOnCondition *method, there will not be any change in the *main()* method.


```
private static void printOnCondition(List<Player> players, Predicate<Player> predicate, Consumer<Player> consumer) {
        for(Player player : players){
            if(predicate.test(player)){
                consumer.accept(player);
            }
        }
    }
``` 
There are many such interfaces you can have a look at  [here](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html) which can directly be used as per requirement.<br/>

# 2. Closures
To understand closures, let us consider the below example.<br/>

```
public class ClosureExample {
    public static void main(String[] args) {
        int a = 10;
        int b =20;
        doProcess(a, i->System.out.println(i+b));
    }
    static void doProcess(int n,Perform p){
        p.action(n);
    }
}

interface Perform{
    void action(int n);
}

//OUTPUT -> 30

``` 
Here, we have created 2 variables 'a' and 'b', when we call doProcess() method we pass a lambda expression in that we have used (i+b). <br/>
If we take a note this lambda expression will be used in the doProcess() method scope, but over there we don't have 'b'.<br/> **So how are we getting the value 30?**<br/>
This variable 'b' is not in the scope of the execution of lambda expression, compiler freezes the value of 'b' from the main method and passes the **value**(not the variable) along with the lambda expression so that whenever the expression executes, the compiler finds the value of b.<br/>
Also, since 'b' is used at the time of execution of lambda execution, the compiler trusts us that we won't change the value of 'b'.<br/> So, we can say variable 'b' is **effectively final** as adding the final keyword is not mandatory.<br/>
If we try to change the value of 'b', compiles will throw an error.

```
doProcess(a, i->{
            System.out.println(i+b);
            b=40 ;
        });

``` 

```
Error - java: local variables referenced from a lambda expression must be final or effectively final
``` 
# 3. Conclusion
So in  [part 1](https://riteshpanigrahi.hashnode.dev/lambda-expression-in-java-part-1), we got familiar with lambda expressions and in this part, we understood some more concepts.<br/>
Thanks for reading this article<br/>
If you have any suggestions, do comment below.<br/>
*Keep Learning!*<br/>

 













