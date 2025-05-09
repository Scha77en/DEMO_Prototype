# Frontend Exercise

A Next.js demo that fetches posts from a public API, caches them in Redis, and applies code-splitting for performance.

---

## Architecture

- **Next.js** (App Router) renders `/posts` server-side.
- **Redis** (cache-aside) speeds up repeat fetches with a 60 s TTL.
- **PostList** is a Client Component, loaded dynamically to keep the initial JS bundle small.

## Quick Start


Go inside the folder Demo-App

```bash
cd Demo-App
```

### Automated (recommended)
Ensure `setup.sh` is executable:
```bash
chmod +x setup.sh
```
Then run
```bash
./setup.sh
```

This will check for the following :

- The required tools (git, node, npm, docker, docker-compose).
- It will create the '.env.local' file if not already created with 'REDIS_URL=redis://localhost:6379'
- It will start the Redis via Docker.
- Will install the Dependencies.
- Will ask you if you want to build and start the app.

### Manual

If you prefer setuping manually you can follow the next steps :

1- Clone and Install
```bash
git clone <the-repo-ssh>
```

```bash
npm install
```

2- Start Redis

```bash
docker-compose up -d
```

3- Build and Start

Dev: --> http://localhost:3000
```bash
npm run dev
```
Prod:
```bash
npm run build && npm start
```
<br></br>

## Environment, Docker

- **Docker**:  
  Contains a Redis container, can be started via `docker-compose up -d`.  

- **Environment Variable**:  
  The app uses a single env variable:  
  `REDIS_URL=redis://localhost:6379` — automatically created by `setup.sh`.

The REDIS_URL environment variable tells the app where to connect to Redis.
`redis://localhost:6379` which means:

- protocol: redis://

- host: localhost

- port: 6379 (the default Redis port)

So the app can talk to the local Redis container running via Docker.

## Performance

### **Redis Fetch Times**

#### **when you first visit : http:/localhost:3000/posts**

***Cache MISS*** shows the very first request where your app has to reach out over the network.

- in terminal:

![Cache Miss](Demo-App/screenshots/cache_miss.png) 

- on the web page:

![First Requist](Demo-App/screenshots/first_requist_cache.png)


#### **reloading**

***Cache HIT*** shows repeat requests served in-memory by Redis—no network delay.

- in terminal:

![Cache Hit](Demo-App/screenshots/cache_hit.png)

- on the web page:

![Repeated requist](Demo-App/screenshots/repeated_requist_cache.png) 


### **Dynamic Loading:**  
  The post list UI (`PostList`) is extracted into its own client component and dynamically imported only when needed.  
  
  
  **Why?**
   
   To Keep the initial JavaScript bundle smaller, so the page loads faster for first‐time visitors.

   The gain is minimal in this small demo, but it becomes significant in larger applications with heavier UI.


## Scaling Outline

#### To handle thousands or millions of users, i can think of the following:

- **Horizontal Scaling** which means Running multiple copies of the Next.js app behind a load balancer so traffic is spread across servers.

- **Managed Redis with TTLs** Moving to a hosted Redis service (e.g. AWS ElastiCache) and keep using short TTLs (time-to-live) so cached data stays fresh but Redis can serve huge read volumes.

- **CDN for Static Assets** Serving JavaScript, CSS and images via a Content Delivery Network so users worldwide download assets from the nearest edge location, cutting latency.

