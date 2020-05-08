# Kanban Board
Kanban Board is an application to list and check your activity and separated by some categories. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Server side using: Express, jsonwebtoken, bcrypt, Sequelize, CORS
* Client side using: Vuejs

&nbsp;

## RESTful endpoints
### POST /users/register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{ 
    "first_name": "<your first name>",
    "last_name": "<your last name>",
    "email": "<your email>",
    "password": "<your password>"
}
```

_Response (200)_
```
{
    "id": "<your id>",
    "first_name": "<your first name>",
    "last_name": "<your last name>",
    "email": "<your email>",
    "password": "<your password>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<returned error message>"
}
```
---
### POST /users/login

> User login

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<your email>",
    "password": "<your password>"
}
```

_Response (200 - OK)_
```
{
    "access_token": "<get access token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<user not found>"
}
```

### POST /tasks/
> Create Todo

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<input title>"
}
```

_Response (201 - Created)_
```
{
    "id": <your id> || SERIAL, AUTO INCREMENT,
    "title": "<your title>",
    "category": "<your category>",
    "createdAt": new Date(),
    "updatedAt": new Date()
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation Error"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /tasks/
> Read Todos

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
  not needed
```

_Response (200 - OK)_
```
[
  {
    "id": <your id> || SERIAL, AUTO INCREMENT,
    "title": "<your title>",
    "description": "<your description>",
    "createdAt": "<your created data date>",
    "updatedAt": "<your last updated data date>"
  }, ...
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### PUT /tasks/:id
> Update task attributes with id
> not done yet
<!-- _Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
  not needed
```

_Request Params_
```
    "id": <your task id>
```

_Response (200 - OK)_
```
{
    "id": <your updated id> || SERIAL, AUTO INCREMENT,
    "title": "<your updated title>",
    "description": "<your updated description>",
    "createdAt": <your created data date>,
    "updatedAt": <your last updated data date>
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Validation Error"
}
```

_Response (404 - Not Found)_
```
{
  "message": "DATA_NOT_FOUND"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
``` -->


### DELETE /tasks/:id
> Delete Task with id

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
  not needed
```

_Request Params_
```
    "id": <your task id>
```

_Response (200 - OK)_
```
{
    "id": <your deleted id> || SERIAL, AUTO INCREMENT,
    "title": "<your deleted title>",
    "description": "<your deleted description>",
    "createdAt": <your created data date>,
    "updatedAt": <your last updated data date>
}

```

_Response (404 - Not Found)_
```
{
  "message": "DATA_NOT_FOUND"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
