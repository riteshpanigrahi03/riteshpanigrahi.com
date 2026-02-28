---
title: "How exactly one-way SSL works?"
date: "2023-10-20T04:42:39.175Z"
slug: "how-exactly-one-way-ssl-works"
tags: ["ssh", "Security", "Cryptography"]
coverImage: "/images/blog/how-exactly-one-way-ssl-works/cover.jpeg"
---

## Introduction

One-Way SSL is a security mechanism that uses a single-side verified SSL certificate to establish a secure connection between a client and a server.

In this scenario, only the server is required to present a certificate to the client, for proving its authenticity.

**For Example:**

Let's say you are visiting an e-commerce website (eg - [https://example.com](https://example.com)). When you access the site, your browser (the client) creates a secure connection with the server hosting the website.

The server sends its SSL certificate, which contains its public key and information about the server's identity, to your browser.

Your browser then validates the certificate, ensuring it's signed by a trusted Certificate Authority (CA) and not expired. If the certificate is valid, your browser generates a symmetric session key using the server's public key, and securely sends it back to the server.

The server then decrypts the session key using its private key, and now both the client and server have the same session key to encrypt and decrypt the data they exchange. This ensures that all data transmitted between your browser and the server remains secure and confidential.

I can understand just by reading this theory there will be still lot of confusion, so in this article we will understand how this works step by step with some examples.

## Step-by-Step Guide

In a 1-way SSL handshake, the client verifies the server's identity by validating its SSL certificate. The process involves generating random numbers, exchanging certificates, and establishing a shared secret key.  
Below if the step-by-step guide for this:

1. **Client Hello**: The client starts the SSL handshake process by sending a "Client Hello" message to the server. This message contains the client's random number (Client Random), supported SSL/TLS versions, and supported cipher suites.
    
2. **Server Hello**: The server responds with a "Server Hello" message, which contains the server's random number (Server Random), chosen SSL/TLS version, and chosen cipher suite.
    
3. **Server Certificate**: The server sends its SSL certificate to the client. The certificate contains the server's public key and is usually stored in a keystore.
    
    A keystore is a repository that holds the server's private key and its associated SSL certificate.
    
4. **Client Verification**: The client verifies the server's certificate by checking if it's signed by a trusted Certificate Authority (CA).
    
    The client maintains a list of trusted CA certificates in a truststore.
    
    A truststore is a repository for storing trusted CA certificates, ensuring that the client can verify the server's identity.
    
5. **Pre-Master Secret Generation**: If the server's certificate is valid, the client generates a Pre-Master Secret (PMS) - a random number used to derive the session's shared secret key.
    
    The client encrypts the PMS with the server's public key (obtained from the server's certificate) and sends it to the server.
    
6. **Server Decryption**: The server decrypts the encrypted PMS using its private key (stored in the keystore) and retrieves the original PMS.
    
7. Both the client and the server now have three random numbers: ClientRandom, ServerRandom, and Premaster Secret.
    
    These numbers are used to generate the same session key on both sides, known as the symmetric encryption key.
    
8. The client sends a Finished message encrypted with the newly generated session key. The server decrypts this message with the same session key, verifies its integrity, and sends its own Finished message encrypted with the session key.
    
9. Once both the client and server have exchanged Finished messages, they can securely communicate using the symmetric encryption key for encrypting and decrypting data.
    

After the handshake is complete, the client and server can securely exchange data using the established session keys.

To more understand the above steps, lets take some random numbers and walkthrough again

```java
ClientRandom: 1234 
ServerRandom: 5678 
Premaster Secret: 9876
```

Now, let's assume that the Pseudorandom Function (PRF) used to combine these values is a simple concatenation followed by a hash function (e.g., SHA-256).

1. Concatenate the three random numbers: 123456789876
    
2. Apply the hash function (SHA-256): **e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855**
    

The resulting hash (**e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855**) would be the session key that both the client and server independently generate.

Here's a step-by-step breakdown:

1. Client initiates connection and sends ClientRandom (1234) in the ClientHello message.
    
2. Server responds with ServerRandom (5678) in the ServerHello message and sends its SSL certificate.
    
3. Client verifies the server's certificate and generates the Premaster Secret (9876).
    
4. Client encrypts the Premaster Secret with the server's public key and sends it in the ClientKeyExchange message.
    
5. Server decrypts the Premaster Secret using its private key.
    
6. Both the client and the server independently perform the same steps to generate the session key:
    
    1. Concatenate the three random numbers (123456789876)
        
    2. Apply the hash function (SHA-256) to get the session key (e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855)
        
7. The client and server can now securely communicate using the same session key to encrypt and decrypt data.
    

## Conclusion

I hope this has helped in understanding the flow for one-way SSL.

In the next one, we will understand the working of 2-way SSL

If you found this article helpful, do give it a like and do share this article.  
Any suggestions, please mention them in comments.  
Thanks.