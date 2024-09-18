# Mentalhealth

To start the server :  node app.js
```mermaid
flowchart TD
    A[User Request] -->|Makes Request| B[Route]
    B --> C[Middleware]
    C --> D[Controller]
    D --> E[Model]
    E --> D
    D -->|Returns Response| B
    B -->|Sends Response| A

flowchart test
    A[prince thursty]-->B[take waterbottle]