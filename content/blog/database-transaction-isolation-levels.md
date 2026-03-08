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

### What problems it solves?

* Dirty Read
    
* Non-repeatable Read
    

### Still possible?

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




In the previous article, we understood what Transactions are, why Isolation matters, and how different Isolation Levels handle concurrency problems.

But one question is still open:

**How do databases actually make Isolation Levels work behind the scenes?**

In this article, we will understand exactly that.

When two users try to read or modify the same data, the database needs a way to make sure everything stays consistent. To do this, databases mainly use two techniques:

* **Locks**
    
* **MVCC (Multi-Version Concurrency Control)**
    

Let’s understand both with simple examples.

## Lock-Based Concurrency Control

Locking is one of the simplest ways to maintain consistency.

Think of it like using a public washroom.  
If someone is inside, the door is locked, and everyone else must wait outside.  
Once the person comes out and unlocks the door, the next person can use it.

Databases work in a similar way — when one transaction is using a piece of data, others have to wait until it’s free.

A lock tells the database:

* "Someone is reading this row — don’t allow writes."
    
* "Someone is writing this row — don’t allow read/write."
    

So databases ensure only safe operations happen at the same time.

### Types of Locks

1. **Shared Lock (S Lock)** — Used for Reads
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1763141993814/deb06561-2f7e-4d49-9460-de2a738b03a9.png align="center")
    
    If a transaction wants to read a row, it takes a Shared Lock.
    
    Multiple readers can hold shared locks **at the same time**.
    
    But writers cannot write until all shared locks are released.
    
    **Example**
    
    * T1 reads product row → Shared Lock
        
    * T2 also reads → Shared Lock
        
    * T3 wants to update → must wait
        
2. **Exclusive Lock (X Lock)** — Used for Writes
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1763142047863/3a660af1-08cf-4dce-8a82-fad83d0ef9f6.png align="center")
    
    Only one transaction can hold an Exclusive Lock.
    
    And no one else can read or write until this lock is released.
    
    **Example**
    
    * T1 updates product → Exclusive Lock
        
    * T2 tries to read → blocked
        
    * T3 tries to update → blocked
        
3. **Range Locks (Predicate Locks)**
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1763142749744/542a3f91-9eb0-4832-8a50-763044410ff2.png align="center")
    
    So far, we’ve seen Shared Locks (S-locks) and Exclusive Locks (X-locks).  
    Both of those lock **individual rows**.
    
    But sometimes locking individual rows isn’t enough.
    
    👉 What if a transaction needs to protect a **condition**, not just a row?
    
    Example:
    
    Transaction T1:
    
    ```sql
    SELECT * FROM orders WHERE amount > 100;
    ```
    
    Transaction T2:
    
    ```sql
    INSERT INTO orders VALUES (id=50, amount=150);
    ```
    
    **Without Range Locks:**
    
    * T1 reads rows with amount &gt; 100
        
    * T2 inserts a new matching row
        
    * T1 reads again → sees one extra row  
        ❌ **Phantom Read**
        
    
    **With Range Locks:**
    
    * T1 locks the *entire range*: “amount &gt; 100”
        
    * T2 is blocked when trying to insert a row into that range  
        ✔ **Phantom prevented**
        

## Locking in Different Isolation Levels

When multiple transactions run at the same time, the database uses **Shared Locks (S-locks)** and **Exclusive Locks (X-locks)** to maintain consistency.

But until when the lock needs to be held changes based on the **isolation level**

### **1\. Read Uncommitted**

**Locking behavior:**

* Reads **do not take shared locks**.
    
* Writers take exclusive locks only when modifying data.
    

**Why?**  
The focus is on **speed**, not consistency.  
Since no S-locks are taken, a transaction can read a row **even if another transaction hasn't committed it** → leading to **dirty reads**.

This is the least safe isolation level.

### **2\. Read Committed**

(Default for many databases)

**Locking Rules**

* **Short shared locks** while reading  
    → S-lock is taken just for the duration of the read and immediately released.
    
* **Exclusive locks** during write  
    → X-lock held until commit.
    

**Why short shared locks?**

Read Committed guarantees only one thing:

👉 **You will never read uncommitted data.**

So while reading a row:

1. The reader takes a Shared Lock
    
2. This temporarily blocks writers from modifying that same row
    
3. After the row is fetched, the lock is **released immediately**
    

**Because the lock is not held until the transaction ends (commit)**, if you try to read the same row again later, you may get a different value → **Non-repeatable reads**.

### **3\. Repeatable Read**

**Locking Rules**

* **Shared locks are held until the transaction ends (commit)**
    
* Exclusive locks (writes) still held until commit
    

**Why hold S-locks till the end?**

To ensure:

👉 **If you read a row once, you get the same value for the entire transaction.**

The database prevents:

* Dirty reads
    
* Non-repeatable reads
    

Because no one can modify the row while you are reading it multiple times.

### **4\. Serializable**

**Locking Rules**

* Uses **range locks** (predicate locks)
    
* Locks entire sets of keys, not individual rows
    
* Prevents inserts, deletes, or updates that could change your query result
    

**Why?**

To make parallel transactions behave as if they ran **one after another**.

This eliminates:

* Dirty reads
    
* Non-repeatable reads
    
* Phantom reads
    

But it also reduces concurrency.

## MVCC (Multi-Version Concurrency Control)

Until now, everything we discussed was based on **locks**.

But locks have a drawback:

When one transaction is reading or writing a row, other transactions may have to **wait**.

This reduces concurrency.

To solve this, many modern databases (PostgreSQL, MySQL InnoDB, Oracle) use a smarter mechanism called **MVCC**.

MVCC stands for:

**Multi-Version Concurrency Control**

**Meaning:**  
Instead of blocking readers or writers, the database keeps **multiple versions of a row**, so different transactions can see **different snapshots** of the same data at the same time.

Imagine a simple table row:

```sql
id = 1, balance = 100
```

Transaction T1 updates the balance:

```sql
UPDATE accounts SET balance = 200 WHERE id = 1;
```

Before T1 commits, T2 reads the row.

**With Locks:**

T2 is blocked.  
(T1 holds an exclusive lock until commit.)

**With MVCC:**

The database keeps:

* Old version: balance = 100
    
* New uncommitted version: balance = 200
    

T2 reads the **old stable version** (100).  
T1 sees and works on the **new version** (200).

No blocking.

### **How MVCC Works Internally**

Every row (or version of a row) contains metadata:

* `created_by_txn_id` — which transaction created this version
    
* `deleted_by_txn_id` — which transaction deleted or replaced this version (NULL if still active)
    

When a transaction starts, it gets a **snapshot** — changes that were already committed.  
Let’s see how this works with a simple example.

**Example — Multiple Versions of a Row**

Initial row:

```sql
Row Version V1:
  balance = 100
  created_by = TX0   (old committed txn)
  deleted_by = NULL
```

**Step 1: Transaction A starts**

TX\_A takes a snapshot.  
It sees only committed data → **V1 is visible**.

**Step 2: Transaction B updates the row**

TX\_B updates balance to 150.

Database does NOT overwrite V1.  
Instead it creates a new version:

```sql
New Row Version V2:
  balance = 150
  created_by = TX_B
  deleted_by = NULL
```

The old version is now marked as deleted:

```sql
V1.deleted_by = TX_B
```

TX\_B commits.

**What do different transactions see?**

* **TX\_A** (which started *before* TX\_B committed)  
    → Uses its old snapshot  
    → Still sees **V1 = 100**
    
* **New transactions starting after TX\_B commits**  
    → See **V2 = 150**
    

This is the magic of MVCC:  
**old transactions keep seeing old versions, new transactions see new versions.**

**What if TX\_A tries to update after reading the old version?**

TX\_A read V1 when it started.  
Now it tries to write:

* DB checks the version chain
    
* V1 has `deleted_by = TX_B` → meaning someone else updated the row after TX\_A started
    

This creates a **write conflict**.

The database will **abort** TX\_A or ask it to retry.

This ensures correctness without blocking reads.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1763146433624/3678ac45-ee8a-4844-8f1a-4acbc6b01056.png align="center")

## **Conclusion**

In this article, we saw how databases actually maintain isolation behind the scenes.  
Shared locks, exclusive locks, range locks, and MVCC snapshots — each one plays a role in keeping our data correct when many transactions run at the same time.

In the next article, we’ll build on this and learn **Optimistic vs Pessimistic Locking** with real examples.

If you found this helpful, please give it a like or share it 👍  
And if you have suggestions or feel I missed something, do drop a comment — I’d love to hear your thoughts! 💬🙌
