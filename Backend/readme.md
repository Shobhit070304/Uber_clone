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




