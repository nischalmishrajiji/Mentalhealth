# Mentalhealth

-To start the server :  node app.js
-Add your system ip in .env file

```mermaid
flowchart TD
    A[User Request] -->|Makes Request| B[Route]
    B --> C[Middleware]
    C --> D[Controller]
    D --> E[Model]
    E --> D
    D -->|Returns Response| B
    B -->|Sends Response| A
