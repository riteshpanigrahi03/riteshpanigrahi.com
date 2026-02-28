---
title: "Beginners Guide to Service Mesh and Istio"
date: "2024-02-21T11:45:35.724Z"
slug: "beginners-guide-to-service-mesh-and-istio"
tags: ["#ServiceMesh"]
coverImage: "/images/blog/beginners-guide-to-service-mesh-and-istio/cover.png"
---

Recently, while inspecting the pod logs for one of the services, I came across something interesting. In addition to the service container, I noticed an Istio container within the same pod.

On further investigating came to know it is a Service Mesh, so in this article I will share my understanding on service mesh and istio.

As developers, our primary focus is on developing business logic and growing our product/application. Often, we don't look into certain infrastructure concepts, as they are abstracted by our organization's platform/devops teams. This abstraction not only makes deploying the application easier but also allows us to focus on building robust business logic.

So, let us try to understand about Service Mesh and Istio in this article.

## What is Service Mesh?

A service mesh is a dedicated infrastructure layer built into an application that controls service-to-service communication in a microservices architecture.

It helps communication in a microservices architecture. It manages things like who talks to whom, how much traffic each service gets, and makes sure communication is secure.

All these communication logic can be present directly into the microservices, but service mesh abstracts this logic by running a proxy or sidecar alongside the service.

We will understand more about sidecar, further in this article.

## Challenges of not using Service Mesh and how does it solves it?

Imagine a e-commerce platform which has multiple microservices like OrderSystem, PaymentSystem, FulfillmentSystem, etc.

1. Communication
    
    * **Problem:** Without a service mesh, imagine the Order service directly communicating with Payment, Inventory, and Shipping. As the system grows, Understanding and managing this communication web becomes complex and prone to errors.
        
    * **Solution (Service Mesh):** Service mesh abstracts away direct communication between services. Developers can focus on business logic, while the service mesh organizes and manages communication through proxies or sidecars.
        
        * **Example:** In a service mesh setup, the Order service communicates with a Payment service through its sidecar proxy, reducing direct dependencies.
            
2. **Load Balancing Issues:**
    
    * **Problem:** Manual load balancing lead to uneven traffic distribution, which can impact performance.
        
    * **Solution (Service Mesh):** Service mesh provides dynamic load balancing.Traffic is smartly distributed among service instances.
        
        * **Example:** The Payment service has three instances. Without a service mesh, one instance might get overloaded. With service mesh, traffic is intelligently distributed.
            
3. **Limited Visibility:**
    
    * **Problem:** Lack of centralized monitoring makes troubleshooting and performance optimization challenging.
        
    * **Solution (Service Mesh):** Integrate centralized monitoring and tracing tools within the service mesh.
        
        * **Example:** Without service mesh, tracing a failed order request is like finding a needle in a haystack. With service mesh, you have a dashboard showing the entire journey of the request.
            
4. **Inconsistent Security:**
    
    * **Problem:** Security mechanisms are implemented inconsistently across services, leading to potential vulnerabilities and issues.
        
    * **Solution (Service Mesh):** Enforces consistent security policies like mutual TLS and access control within the service mesh.
        
        * **Example:** Without service mesh, some services might use encryption while others don't. With service mesh, it's like having a security guard enforcing the same level of protection at the entrance of each service.
            
5. **Traffic Routing for A/B Testing:**
    
    * **Problem:** Without service mesh, implementing A/B testing or canary releases is challenging, and controlling traffic for these scenarios is manual.
        
    * **Solution (Service Mesh):** Service mesh enables seamless traffic routing and control.
        
        * **Example:** Suppose you want to test a new payment feature. With service mesh, you can easily route a small percentage of users to the new Payment service version, ensuring a controlled and gradual rollout without affecting all users at once.
            

In summary, service mesh addresses communication challenges, optimizes traffic distribution, enhances visibility, ensures consistent security, and facilitates advanced traffic routing scenarios like A/B testing, making the management of microservices more efficient and reliable.

Now lets understand what is Istio.

## What is Istio?

Istio is a open source implementation of service mesh. Service Mesh is a concept and Istio is one of its implementation which is widely used across cloud native applications. It provides a set of powerful features which we discussed above that helps manage and control the interactions between services in a complex and distributed system.

## How does Istio works?

Istio works by deploying a sidecar proxy (usually Envoy) alongside each microservice instance. These proxies intercept and control the communication between services. Istio also consists of a control plane that manages the configuration and policies applied to these proxies.

Before Istio

[![Before utilizing Istio](/images/blog/beginners-guide-to-service-mesh-and-istio/image01.svg)](https://istio.io/latest/about/service-mesh/)

After using Istio

[![After utilizing Istio](/images/blog/beginners-guide-to-service-mesh-and-istio/image02.svg)](https://istio.io/latest/about/service-mesh/)

Here's a breakdown of how Istio works:

1. **Sidecar Proxies:**
    
    * For each service, Istio deploys a sidecar proxy (e.g., Envoy) alongside it in the same Kubernetes pod.
        
    * These sidecar proxies takes control of all inbound and outbound traffic for the respective microservice.
        
2. **Control Plane:**
    
    * Istio has a control plane responsible for configuring and managing the behaviour of the sidecar proxies.
        
    * Major components of the control plane include Pilot (service discovery and traffic management), Mixer (policy checks and telemetry), Citadel (security and certificate management), and Galley (configuration validation).
        
3. **Traffic Management:**
    
    * Istio allows define rules for traffic management, such as routing, load balancing, and fault injection.
        
    * For example, you can route a percentage of traffic to a new version of a service for testing purposes.
        
4. **Security Features:**
    
    * Istio provides built-in security features such as mutual TLS for encrypting communication between services.
        
    * It enforces access control policies and manages identity and certificate issuance.
        
5. **Observability:**
    
    * Istio collects telemetry data, including metrics, logs, and traces, to provide insights into the behavior and performance of services.
        
    * This data can be visualized using tools like Grafana and Kiali.
        

Let's walk through a simple example where Service A calls Service B, and Istio is in place to manage the communication.

In Istio, when Service A calls Service B, the communication is intercepted by the sidecar proxy of Service B before it reaches the actual Service B. Here's the sequence of events:

1. **Service A calls Service B:**
    
    * The communication from Service A is initially directed towards Service B.
        
2. **Interception by Sidecar Proxy (Envoy) of Service B:**
    
    * Before the communication reaches Service B, it is intercepted by the sidecar proxy (typically Envoy) deployed alongside Service B.
        
3. **Processing by Sidecar Proxy:**
    
    * The sidecar proxy of Service B processes the incoming request, applying any configured policies (such as routing rules, security checks, etc.).
        
4. **Communication to Service B:**
    
    * After processing, the sidecar proxy forwards the request to the actual Service B.
        

## Conclusion

So, in this article I tried to provide a 500 ft overview on Service Mesh and Istio, which I think will be helpful for you to explore further on this

So, in this article, I've tried to give you a basic idea about Service Mesh and Istio. It's like a friendly guide for your microservices, making sure they talk smoothly and stay secure. As a backend developer, knowing this stuff can help you build stronger applications. Explore more about Service Mesh and Istio—it's like having a cool tool to make your work easier in the world of microservices.

### References:

\[1\] [https://istio.io/latest/about/service-mesh/](https://istio.io/latest/about/service-mesh/)

\[2\] [https://www.youtube.com/watch?v=16fgzklcF7Y](https://www.youtube.com/watch?v=16fgzklcF7Y)