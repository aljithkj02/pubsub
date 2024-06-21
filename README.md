# Real-Time Chat App with Redis Pub/Sub

This is a real-time chat application that demonstrates how to use multiple WebSocket servers in conjunction with Redis Pub/Sub for real-time communication. This project serves as a proof-of-concept (POC) and can be used as a reference for implementing similar functionalities in your applications.

## Overview

In this application, users can connect to different WebSocket servers, but still communicate with each other in real-time. This is achieved through Redis Pub/Sub, which handles the message broadcasting between the servers.

### Key Components

- **WebSocket Servers**: There are two WebSocket servers. Each server listens on a different port.
- **Redis Pub/Sub**: Redis is used to publish and subscribe to messages. When a message is sent from a client connected to one WebSocket server, it is published to a Redis channel. All WebSocket servers subscribed to that channel will receive the message and broadcast it to their connected clients.

### How It Works

1. **Connection**: Users connect to one of the WebSocket servers.
2. **Message Sending**: When a user sends a message, it is published to the Redis `chat` channel.
3. **Message Broadcasting**: All WebSocket servers subscribed to the `chat` channel receive the message and broadcast it to their respective clients.

