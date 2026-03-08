---
title: "Understanding Transactions, Isolation Levels & Concurrency Problems in Databases"
date: "2026-03-08T15:19:28.837Z"
slug: "database-transaction-isolation-levels"
tags: ["Databases", "System Design", "Transactions", "Concurrency"]
coverImage: ""
---

Whenever we build an application —banking, e-commerce, ticket booking—multiple users interact with the system at the same time.

Two users may try to update the same record, or one user may read data while someone else is modifying it. For example, two users trying to book the same seat for a concert.

So how do databases keep our data consistent?  
This is where **Transactions** and **Isolation Levels** come into the picture.

In this article, we will understand:

* What is a Transaction
    
* What is Isolation in ACID
    
* The problems that happen when multiple transactions run at the same time
    
* Different Isolation Levels
    
* How each level solves or fails to solve concurrency issues
    

In the next article, we will go deeper into **how isolation is implemented using Locks and MVCC**.

## What is a Transaction?

A transaction is simply a **unit of work**—a group of operations that should succeed or fail together.

For example:  
When we transfer money, we **deduct** it from one account and **add** it to another. If the amount gets deducted but not added to the other account, it becomes a big problem.

So both actions—deduct and add—must happen in the same transaction. Either both succeed, or both fail. Partial success is not allowed.

## What is Isolation?

As we know, many transactions run at the same time in a database. There is no issue when they read or write **different** rows. But when they try to access the **same** row at the same time, concurrency problems (race conditions) can occur.  
  
So, Isolation in ACID ensures that:

> Even when multiple transactions run at the same time, each transaction should feel like it is the only one running.

In the next article, we will look at how databases use locks to provide Isolation. But before that, it’s important to understand the different concurrency problems and the Isolation levels that solve them.

## Problems with Concurrent Transactions

### Dirty Read

A dirty read happens when a transaction reads **uncommitted data** from another transaction.

When **Transaction T2 reads data written by T1 which is not yet committed**.  
If **T1** later rolls back, **T2** ends up using wrong data.

**Example**

Imagine a wallet system.

* **Initial balance:** ₹1000
    

**Transaction T1:**

```plaintext
UPDATE wallet SET balance = balance - 500   -- reduces to 500
(not committed yet)
```

**Transaction T2:**

```plaintext
SELECT balance FROM wallet   -- reads 500
```

**T2** thinks the balance is 500.

But suddenly **T1** fails and rolls back → balance goes back to **1000**.

Now **T2** has operated using a value (500) that never actually existed in the committed database.  
That’s a *dirty read*.

### Non-Repeatable Read

Here, a transaction reads the same record twice and gets **different values**.

* T1 reads a row
    
* T2 updates the same row and commits
    
* T1 reads again → gets a different value
    

So the same query inside the same transaction returns different results.

**Example**

**Initial balance: ₹1000**

**Transaction T1:**

```plaintext
SELECT balance FROM wallet   -- reads 1000
```

**Transaction T2:**

```plaintext
UPDATE wallet SET balance = 800;
COMMIT;
```

**Back to Transaction T1:**

```plaintext
SELECT balance FROM wallet   -- now reads 800
```

**T1** saw two different values for the same row during its execution.  
This is *non-repeatable read*.

### Phantom Read

A phantom read happens when the **number of rows** changes between two queries in the same transaction.

This happens when:

* T1 reads a **set of rows (range query)**
    
* T2 inserts a new row inside that range
    
* T1 reads again and sees an *extra* row
    

The row “appears like a phantom”.  
This happens only with **range queries**, not with single-row reads.

**Example**

**Table: Orders**

| id | amount |
| --- | --- |
| 1 | 500 |
| 2 | 700 |

**Transaction T1:**

```plaintext
SELECT * FROM orders WHERE amount > 400;
-- gets: (1,500), (2,700)
```

**Transaction T2:**

```plaintext
INSERT INTO orders(id, amount) VALUES (3, 600);
COMMIT;
```

**Back to Transaction T1:**

```plaintext
SELECT * FROM orders WHERE amount > 400;
-- gets: (1,500), (2,700), (3,600)
```

**T1** sees a new row that didn’t exist earlier → a *phantom row*.

### Summary

| **Problem** | **What happens** | **Example** |
| --- | --- | --- |
| **Dirty Read** | T2 reads uncommitted data of T1 | reads balance=500 but T1 rolls back |
| **Non-Repeatable Read** | T1 reads same row twice, gets different values | 1000 → (update by T2) → 800 |
| **Phantom Read** | T1 reads a range twice and sees new/missing rows | new order inserted in amount &gt; 400 |

## Isolation Levels

To prevent these problems, databases provide **4 isolation levels**.

Isolation level defines **how much one transaction is isolated from another**.  
Higher isolation = safer, but slower.  
Lower isolation = faster, but more anomalies.

Let’s go one by one.

### Read Uncommitted

**Lowest isolation.**  
A transaction can read uncommitted data from another transaction.

**What problems can still happen?**

* Dirty Read
    
* Non-repeatable Read
    
* Phantom Read
    

**Example**

T1 updates a row but doesn't commit.  
T2 comes and reads that uncommitted value.  
If T1 rolls back, T2 used wrong data → dirty read.

This level is rarely used in real systems.

### Read Committed

A transaction will **only see committed data**.  
You can’t read someone else’s uncommitted changes.

**What problems it solves?**

* Dirty Read
    

**What problems still remain?**

* Non-repeatable Read
    
* Phantom Read
    

**Example (Non-repeatable Read still happens)**

T1:

```plaintext
SELECT balance FROM wallet;  -- 1000
```

T2:

```plaintext
UPDATE wallet SET balance = 800;
COMMIT;
```

T1 again:

```plaintext
SELECT balance FROM wallet;  -- 800
```

Same query → different results.

### Repeatable Read

Once a transaction reads a row, **nobody can change that row until the transaction finishes**.

**What problems it solves?**

* Dirty Read
    
* Non-repeatable Read
    

**What problems still remain?**

* Phantom Read
    

**Example (Phantom Read)**

T1:

```plaintext
SELECT * FROM orders WHERE amount > 400;  
-- returns rows: 500, 700
```

T2:

```plaintext
INSERT INTO orders VALUES (3,600);
COMMIT;
```

T1 again:

```plaintext
SELECT * FROM orders WHERE amount > 400;
-- new row 600 appears (phantom)
```

Rows appear/disappear from the range → phantom read.

### Serializable

**Highest isolation level.**

Works as if **all transactions run one after another**, even though they run in parallel.

**Solves everything:**

* Dirty Read ✔️
    
* Non-repeatable Read ✔️
    
* Phantom Read ✔️
    

**Example**

T1 scans:

```plaintext
SELECT * FROM orders WHERE amount > 400;
```

Now at serializable:

* Other transactions **cannot insert any row** that matches this range until T1 commits.
    
* So no new phantom row can appear.
    

**Downsides**

* Very slow
    
* Causes lock waits and deadlocks
    
* Rarely used unless the system needs strict consistency
    

### Summary

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Concurrency | Consistency |
| --- | --- | --- | --- | --- | --- |
| Read Uncommitted | ❌ | ❌ | ❌ | Very High | Low |
| Read Committed | ✔️ | ❌ | ❌ | High | Medium |
| Repeatable Read | ✔️ | ✔️ | ❌ | Medium | High |
| Serializable | ✔️ | ✔️ | ✔️ | Low | Very High |

## Conclusion

In this article, we understood what isolation means in a database and why problems like dirty reads, non-repeatable reads, and phantom reads occur when transactions run in parallel. We also looked at how different isolation levels try to solve these problems.

In the next article, we will go one step deeper and see **how databases actually implement isolation** behind the scenes.  
We will cover:

* How locks work internally
    
* Shared locks
    
* Exclusive locks
    
* Range locks
    
* What MVCC is and when it is used
    
* How each isolation level uses locks differently
    
* And a few practical examples to make everything clear
    

---

If you found this helpful, please give it a like or share it. 👍  
And if you have any suggestions or feel I missed something, do drop a comment — I’d love to hear from you. 💬

Thanks! 🙌