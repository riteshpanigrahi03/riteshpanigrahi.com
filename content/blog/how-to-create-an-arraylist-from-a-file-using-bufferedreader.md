---
title: "How to create an ArrayList from a File using BufferedReader?"
date: "2022-01-14T16:11:03.226Z"
slug: "how-to-create-an-arraylist-from-a-file-using-bufferedreader"
tags: ["Java"]
coverImage: "/images/blog/how-to-create-an-arraylist-from-a-file-using-bufferedreader/cover.png"
---

Hi all, in this article we will see how to get data from a file and make an ArrayList using BufferedReader.
## BufferedReader
BufferedReader is used to read data from an input stream, this stream can be anything like files, sockets, or entering data from the keyboard.<br/>
Buffer keeps chunks of data in its buffer while Reader reads data from buffer instead of the source, this reduces I/O operations.<br/>

For this example, we have created a file data.txt having players names (great batters of our Indian Cricket)<br/>

```
Sachin
Sehwag
Virat
Yuvraj
Raina
Dhoni
``` 
We need to make *ArrayList of String* with these data.<br/>
So, BufferedReader *excepts a **Reader** in its constructor and size of the buffer which is optional*.<br/>
The default size of the buffer is 8KB.<br/>
Since we are reading data from a file, we will provide FileReader.<br/>
 
```
BufferedReader br = new BufferedReader(new FileReader("src/resources/data.txt"));
``` 
Then using the readLine() method of BufferedReader class, we will read each line and then add it into the ArrayList.<br/>

```
BufferedReader br = new BufferedReader(new FileReader("src/resources/data.txt"));
ArrayList<String> players = new ArrayList<>();
String line = br.readLine(); //reading 1st line
while (line!=null){ //repeat until all the lines are done
     players.add(line);
     line= br.readLine(); // reading line for next iteration
}
System.out.println(players);
``` 

![image.png](/images/blog/how-to-create-an-arraylist-from-a-file-using-bufferedreader/image01.png)

I hope this is clear.<br/><br/>
If we don't want to make use of Buffer then we can do the same thing using FileReader as well, but BufferedReader has some amazing helper methods such as:-<br/>
**String readLine()** - reads data line by line<br/>
**int read()** - reads single character<br/>
**boolean ready()** - to check whether the input stream is ready to be read or not.<br/>

Similarly, there are many such methods you can have a look at the  [official documentation](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedReader.html) <br/>

This is it for the article.<br/>
I have started sharing short Java articles.<br/>
If you have any feedback for these short articles or any suggestions, do comment.<br/>
If this was helpful please give it a like.<br/>
Thanks for Reading... Bye!<br/>
