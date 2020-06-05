# KANBAN


List of available endpoints:
​
- `POST /users/register`
- `POST /users/login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

### POST /users/register

Request:

- data:

```json
{
  "email": "string",
  "first_name": "string",
  "last_name": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  
}
```

### POST /users/login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaXNzYSIsImlhdCI6MTU4OTc3NjA0NX0.W4tTBiKkglA2kBoCv-8pJIx6Utn86-PwdUPJFXZTJHY"
}
```

### GET /tasks
Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
  {
    "id": number,
    "title": "string",
    "category": "string",
    UserId: number,
    User: {
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "createdAt": date,
      "updatedAt": date
    },
    "createdAt": date,
    "updatedAt": date
  },...
]
```

### POST /tasks
Request:

- headers: access_token (string)

- data:

```json
{
  "title": "string",
  "category": "string",
  "UserId": number
}
```

​Response:

- status: 201
- body:
  ​

```json
{
    "id": number,
    "title": "string",
    "category": "string",
    UserId: number,
    User: {
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "createdAt": date,
      "updatedAt": date
    },
    "createdAt": date,
    "updatedAt": date
}
```
​

### PUT /tasks/:id
<!-- description: 
  add a joke to user favourite -->
Request:

- headers: access_token (string)

- data:

```json
{
  "title": "string",
  "category": "string",
  "UserId": "string"
}
```

Response:

- status: 200
- body:

```json
{
    "id": number,
    "title": "string", (Updated title)
    "category": "string", (Updated category)
    UserId: number,
    User: {
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "createdAt": date,
      "updatedAt": date
    },
    "createdAt": date,
    "updatedAt": date
}
```

### GET /favourites

description: 
  show current user favourite jokes

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
    "favourites": [
        {
            "id": 1,
            "Joke": {
                "id": 11,
                "category": "Miscellaneous",
                "setup": "ikan ikan apa yang berhenti?",
                "delivery": "Ikan Pause, hiya hiya",
                "createdAt": "2020-05-18T05:02:29.398Z",
                "updatedAt": "2020-05-18T05:02:29.398Z"
            }
        },
        {
            "id": 2,
            "Joke": {
                "id": 7,
                "category": "Miscellaneous",
                "setup": "Ayam ayam apa yang luas?",
                "delivery": "Ayam semesta",
                "createdAt": "2020-05-18T04:18:49.689Z",
                "updatedAt": "2020-05-18T04:18:49.689Z"
            }
        }
    ]
}
```
​
