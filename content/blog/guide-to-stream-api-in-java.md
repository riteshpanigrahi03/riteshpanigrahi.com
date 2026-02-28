---
title: "Guide to Stream API in Java"
date: "2021-12-05T10:53:28.849Z"
slug: "guide-to-stream-api-in-java"
tags: ["Java", "stream"]
coverImage: "/images/blog/guide-to-stream-api-in-java/cover.png"
---

In Java 8 **Stream API** was introduced, Stream API is used to PROCESS the collection of objects.<br/>
It'd be better if you have a little know-how of lambda expressions.<br/>
I've already published 2 articles on lambda expression you can refer to those if you are new to lambda expression.<br/>
 [Part 1](https://riteshpanigrahi.hashnode.dev/lambda-expression-in-java-part-1) <br/>
 [Part 2](https://riteshpanigrahi.hashnode.dev/lambda-expression-in-java-part-2) <br/>
Now let us first understand the difference between *collections* and *streams*.<br/>

> If we want to present a group of objects as a single entity,  then go for collections.<br/>
> If we want to process objects from the collection, then we should go for streams.<br/>

**Note**- Stream is not a data structure, so it does not store data, but it operates on the source data structure i.e collections, arrays, etc.<br/>

If you are already aware of I/O Stream, *are IOStream and Streams API the same*?<br/>
No..<br/>
>I/O Stream - talks about the stream of data.<br/>
>Streams - talks about the stream of objects.<br/>

If this is clear till now, let's move forward.<br/>
# 1) How to create a stream?<br/>
### a) Stream of Collection - Using stream() method<br/>
As we discussed, to create a stream we need a collection of objects so let us create an ArrayList.<br/>

```
List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5,6));
Stream<Integer> stream = list.stream();
``` 
We can use the *stream()* method of the  [Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html)  interface<br/>

### b) Stream of Array - Using stream()<br/>
Arrays can also be used as a source for a stream.

```
Integer[] arr = {1,2,3,4,5,6};
Stream<Integer> streamOfArray = Arrays.stream(arr);
Stream<Integer> streamOfPart = Arrays.stream(arr, 2, 5);
``` 
Using the *Arrays.stream()* method we can create a stream of a whole array or part of the array.<br/>

# 2) How to process streams?<br/>
Now that we have created streams of objects, as we earlier discussed streams are used to process the objects, now let's focus on the processing of objects.<br/>

### a) filter<br/>
If we want to filter out some objects from the collections of objects based on some condition, we can use *filter()* method of the  [Stream ](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html) Interface.<br/>

```
List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5,6));
Stream<Integer> stream = list.stream();
List<Integer> listAfterFilter = stream.filter(i -> i % 2 == 0).collect(Collectors.toList());
System.out.println(listAfterFilter);//[2, 4, 6]
``` 
We want some conditions to filter right?<br/> 
>So, *filter()* method takes  [Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html)  as an argument, as we know Predicate is a **Functional Interface** so we can use a **lambda expression**.<br/>
In the above example, we are filtering all the even elements from the list, after filtering we are collecting the new list using the collect() method.<br/>

### b) map<br/>
If the requirement is to square all elements of the ArrayList, we can use the map.<br/>
>Basically, if we want to perform some function on every object of the stream, we should use a map().<br/>
 
```
List<Integer> listAfterMap = stream.map(i->i*i).collect(Collectors.toList());
System.out.println(listAfterMap);//[1, 4, 9, 16, 25, 36]
``` 
### c) count<br/>
count() is used to get a number of elements in the stream.<br/>

```
List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5,6));
Stream<Integer> stream = list.stream();
//to get number of even elements
long countEven = stream.filter(i -> i % 2 == 0).count();
System.out.println(countEven);//3
``` 
### d) sorted<br/>
sorted() method of the Stream interface is used to sort all objects<br/>

```
List<Integer> list = new ArrayList<>(Arrays.asList(4,5,6,1,2,3));
Stream<Integer> stream = list.stream();
List<Integer> sortedList = stream.sorted().collect(Collectors.toList());
System.out.println(sortedList);//[1, 2, 3, 4, 5, 6]
``` 
By default *sorted()* method sorts in increasing order<br/>
What if we want to do customized sorting?<br/> 
Let's say descending order<br/>
We need to pass an instance of comparator as an argument to the sorted method.<br/>

Now,let's talk about  [Comparator](https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html) interface.<br/> 
**Comparator **is a **Functional Interface** that has a method compare() which actually does a comparison between two objects.<br/>

![image.png](/images/blog/guide-to-stream-api-in-java/image01.png)
>compare(o1,o2)<br/>
--> returns -ve if o1 has to come before o2<br/>
--> returns +ve if o1 has to come after o2<br/>
--> returns 0 if o1 and o2 are equal<br/>

So, to sort in descending order, we need to pass a lambda expression so the sorted method.<br/>

```
(i1,i2)->(i1<i2)? 1 : (i1>i2) ? -1 : 0
``` 
We want to sort in descending order<br/>
If *i1 is less than i2*, means i1 should come after i2, so return 1<br/>
If *i1 is greater than i2*, means i1 should come before i2, so return -1<br/>
If both are *equal* return 0<br/>


```
List<Integer> list = new ArrayList<>(Arrays.asList(4,5,6,1,2,3));
Stream<Integer> stream = list.stream();
List<Integer> sortedList = stream.sorted((i1,i2)->(i1<i2)? 1 : (i1>i2) ? -1 : 0).collect(Collectors.toList());
System.out.println(sortedList);//[6, 5, 4, 3, 2, 1]
``` 

# 3) Iterating the stream<br/>
To iterate the collection of objects we generally use *for or for-each loop*.<br/>

```
List<Integer> list = new ArrayList<>(Arrays.asList(4,5,6,1,2,3));
for(Integer i : list){
    System.out.println(i);
 }
``` 
But using streams we can avoid this, instead, we can use the **forEach method**(not loop). <br/>
This method always expects an instance of a Consumer interface, and as we know Consumer is a functional interface and for a functional interface, we can use lambda expressions.<br/>

```
List<Integer> list = new ArrayList<>(Arrays.asList(4,5,6,1,2,3));
Stream<Integer> stream = list.stream();
stream.forEach(i->System.out.println(i));
``` 
So, as in the above example, we have printed each element of the stream, we can also pass any implementation of the consumer interface.<br/>

# Conclusion<br/>
In this article, we have seen how to create streams, we then understood how to use different methods of the Stream interface to process the objects like filter(), map(), sorted(), count().<br/>
There are many more methods you can refer to the  [official documentation](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html) for more details.<br/>
This is it for this article.<br/>
Do like this, if you find it helpful.<br/>
If any suggestions, do mention them in the comments.<br/>
<br/>
Thanks for Reading !!<br/>
Keep Learning !!<br/>



  





