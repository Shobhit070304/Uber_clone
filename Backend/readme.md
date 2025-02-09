# Routes Documentation
# /users/register

## Overview
The `/users/register` route is used to register a new user in the application. It accepts user details, validates the input, hashes the password, and creates a new user record in the database.

## HTTP Method
POST

## Endpoint
/users/register

## Request Body
The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum length: 3 characters).
  - `lastname`: A string representing the user's last name (minimum length: 3 characters).
- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum length: 6 characters).

### Example Response
-`token`: A string representing the user's token.
-`user`:(object):
  - `fullname`: An object containing:
    - `firstname`: A string representing the user's first name (minimum length: 3 characters).
    - `lastname`: A string representing the user's last name (minimum length: 3 characters).
  - `email`: A string representing the user's email address (must be a valid email format).
  - `password`: A string representing the user's password (minimum length: 6 characters).



# /users/login
## Overview
The `/users/login` route is used to authenticate a user in the application. It accepts user credentials, validates the input, and returns an authentication token if the credentials are valid.

## HTTP Method
POST

## Endpoint
/users/login

## Request Body
The request body must be in JSON format and include the following fields:

- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum length: 6 characters).

### Example Response
-`token`: A string representing the user's token.
-`user`:(object):
  - `fullname`: An object containing:
    - `firstname`: A string representing the user's first name (minimum length: 3 characters).
    - `lastname`: A string representing the user's last name (minimum length: 3 characters).
  - `email`: A string representing the user's email address (must be a valid email format).
  - `password`: A string representing the user's password (minimum length: 6 characters).


# /users/profile
## Overview
The `/users/profile` route is used to retrieve the profile information of the authenticated user.

## HTTP Method
GET

## Endpoint
/users/profile

## Request Body
The request must include a valid authentication token in the headers.

Authorization: Bearer <token>

### Example Response
-`user`:(object):
  - `fullname`: An object containing:
    - `firstname`: A string representing the user's first name (minimum length: 3 characters).
    - `lastname`: A string representing the user's last name (minimum length: 3 characters).
  - `email`: A string representing the user's email address (must be a valid email format).

### Error Responses

Unauthorized Access
If the authentication token is missing or invalid, the server responds with a status code of 401 and a JSON object indicating unauthorized access.


# /users/logout
## Overview
The `/users/logout` route is used to log out the authenticated user by invalidating the authentication token.

## HTTP Method
POST

## Endpoint
/users/logout

## Request Body
The request must include a valid authentication token in the headers or cookies.

Authorization: Bearer <token>

### Example Response
On successful logout, the server responds with a status code of 200 and a JSON object indicating successful logout.

### Error Responses

Unauthorized Access
If the authentication token is missing or invalid, the server responds with a status code of 401 and a JSON object indicating unauthorized access.


## /captains/register

### Overview
The `/captains/register` route is used to register a new user in the application. It accepts user details, validates the input, hashes the password, and creates a new user record in the database.

### HTTP Method
POST

### Endpoint
`/captains/register`

### Request Body
The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum length: 3 characters).
  - `lastname`: A string representing the user's last name (minimum length: 3 characters).
- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum length: 6 characters).

#### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}


