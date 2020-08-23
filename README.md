# Microservice Architecture


# API Documnentation

* **URL**

  /signup

* **Method:**

  `POST`
  
* **Payload**
`{"email":"tes@gmail.com", "paswwrod":"test123","role":"admin"}`
 * **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
    "data": {
        "role": "basic",
        "_id": "5f424982d63ea54164bef05e",
        "email": "prashanthblr82@gmail.com",
        "password": "$2b$10$YvbKIMwcBpr9IcDKyaJWd.IYxVwjeaIy7F45vkU5kQWI/8xI7jY7y",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyNDk4MmQ2M2VhNTQxNjRiZWYwNWUiLCJpYXQiOjE1OTgxNzk3MTQsImV4cCI6MTU5ODI2NjExNH0.p_8zVusomrhVYzhErUfvUKWl_2q1mguuDrg5wU96SG0",
        "__v": 0
    },
    "message": "prashanthblr82@gmail.com is Registered successfully"
}
```

* **URL**

  /login

* **Method:**

  `POST`
  
* **Payload**
`{"email":"tes@gmail.com", "paswwrod":"test123"}`
 * **Success Response:**
      ```
      {
       "data": {
          "email": "prashanthblr82@gmail.com",
         "role": "basic"
        },
       "accessToken":           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyMzY5YTZjZTIzMTA3MzgxZjI0MjAiLCJpYXQiOjE1OTgxNzk4NTYsImV4cCI6MTU5ODI2NjI1Nn0.WKyyXeM5uTmuDlvik1b8melHlJXCQtPY7SL9hWUS  -Vs",
    "message": "prashanthblr82@gmail.com Loginned successfully"
      }
  ```
 
* **Error Response:**

   **Content:**
   * INVALID email
   `{"status": "error","message": "Email does not exist"}`

  * INVALID Paasword
  `{ "status": "error",  "message": "Password is not correct" }`

* **URL**

  /users

* **Method:**

  `GET`
  
* **Headers:**
  `x-access-token:djlaejfjaef` 
 
* If the user is admin then he can see the list of users which is present in the db

  * If your not admin user
    Response
    `{"status": "error","message": "You don't have enough permission to perform this action"}`
  * If your admin user
    Response 
    ```
    {
    "data": [
        {
            "role": "basic",
            "_id": "5f42369a6ce23107381f2420",
            "email": "prashanthblr82@gmail.com",
            "password": "$2b$10$1EC9NheQK40rTbae2UmI/OcWwINaBXpT/eM5bohOOv4qDHxXrNqM6",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyMzY5YTZjZTIzMTA3MzgxZjI0MjAiLCJpYXQiOjE1OTgxNzk4NTYsImV4cCI6MTU5ODI2NjI1Nn0.WKyyXeM5uTmuDlvik1b8melHlJXCQtPY7SL9hWUS-Vs",
            "__v": 0
        },
        {
            "role": "basic",
            "_id": "5f424982d63ea54164bef05e",
            "email": "prashanthblr82@gmail.com",
            "password": "$2b$10$YvbKIMwcBpr9IcDKyaJWd.IYxVwjeaIy7F45vkU5kQWI/8xI7jY7y",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyNDk4MmQ2M2VhNTQxNjRiZWYwNWUiLCJpYXQiOjE1OTgxNzk3MTQsImV4cCI6MTU5ODI2NjExNH0.p_8zVusomrhVYzhErUfvUKWl_2q1mguuDrg5wU96SG0",
            "__v": 0
        },
        {
            "role": "admin",
            "_id": "5f424bb8d63ea54164bef05f",
            "email": "prashanthbit121@gmailcom",
            "password": "$2b$10$1bApfkscS6P9UZ3iPiVsiu8YBJjVw/s865OUducoFV//pspHoEbZW",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyNGJiOGQ2M2VhNTQxNjRiZWYwNWYiLCJpYXQiOjE1OTgxODAyODcsImV4cCI6MTU5ODI2NjY4N30.eOK7SW3ff-79q7vw7WY4COOISwYR9I9ZBj_E6t6XJxY",
            "__v": 0
        }
    ]
}
```

* **URL**

  /users/:userId

* **Method:**

  `[GET,PUT,DELETE]`
  
* **Headers:**
  `x-access-token:djlaejfjaef` 
 
* The admin user can create, update or delete the users to the db

  * If your not admin user
    Response
    `{"status": "error","message": "You don't have enough permission to perform this action"}`
 
  * Resposne for GET
  ```
   {
    "data": {
        "role": "admin",
        "_id": "5f424bb8d63ea54164bef05f",
        "email": "prashanthbit121@gmailcom",
        "password": "$2b$10$1bApfkscS6P9UZ3iPiVsiu8YBJjVw/s865OUducoFV//pspHoEbZW",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyNGJiOGQ2M2VhNTQxNjRiZWYwNWYiLCJpYXQiOjE1OTgxODAyODcsImV4cCI6MTU5ODI2NjY4N30.eOK7SW3ff-79q7vw7WY4COOISwYR9I9ZBj_E6t6XJxY",
        "__v": 0
    }
  }
  ```
  *  Response for PUT
  ```
  {
    "data": {
        "role": "admin",
        "_id": "5f424bb8d63ea54164bef05f",
        "email": "prashanthbit121@gmailcom",
        "password": "dzdcze",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyNGJiOGQ2M2VhNTQxNjRiZWYwNWYiLCJpYXQiOjE1OTgxODAyODcsImV4cCI6MTU5ODI2NjY4N30.eOK7SW3ff-79q7vw7WY4COOISwYR9I9ZBj_E6t6XJxY",
        "__v": 0
    },
    "status": "Success",
    "message": "User has been updated"
  }
  ```

*   Response for DELETE
    ```
      {
    "data": {
        "role": "admin",
        "_id": "5f424bb8d63ea54164bef05f",
        "email": "prashanthbit121@gmailcom",
        "password": "dzdcze",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQyNGJiOGQ2M2VhNTQxNjRiZWYwNWYiLCJpYXQiOjE1OTgxODAyODcsImV4cCI6MTU5ODI2NjY4N30.eOK7SW3ff-79q7vw7WY4COOISwYR9I9ZBj_E6t6XJxY",
        "__v": 0
    },
    "status": "Success",
    "message": "User has been updated"
      }
    ```
** Note ** : If WE CREATE A NEW USER A MAIL NOTIFICATION WILL BE SENT TO THE USER

** Note ** : The Admin Users can create, modfify or delete the product deatils

* **URL**

  /products

* **Method:**

  `POST`
  
* **Headers:**
  `x-access-token:djlaejfjaef` 
 
* The admin user can create, update or delete the users to the db

  * If your not admin user
    Response
    `{"status": "error","message": "You don't have enough permission to perform this action"}`

  * The Admin User Response
    `{"data":{"_id":"5f425070fe2aee2570f23aad","name":"Prashanth","color":"black","details":"fdcdc","price":"13e1","userId":"5f42506ffe2aee2570f23aac","__v":0},"message":"Product created successfully successfully"}`


* **URL**

  /products

* **Method:**

  `GET`
  
* **Headers:**
  `x-access-token:djlaejfjaef` 
 
* The admin user can create, update or delete the users to the db

  * If your not admin user
    Response
    `{"status": "error","message": "You don't have enough permission to perform this action"}`

  * The Admin User Response
    `{"data":{"_id":"5f425070fe2aee2570f23aad","name":"Prashanth","color":"black","details":"fdcdc","price":"13e1","userId":"5f42506ffe2aee2570f23aac","__v":0},"message":"Product created successfully successfully"}`

* **URL**

  /products/:productId

* **Method:**

  `[GET,PUT,DELETE]`
  
* **Headers:**
  `x-access-token:djlaejfjaef` 
 
* The admin user can create, update or delete the users to the db

  * If your not admin user
    Response
    `{"status": "error","message": "You don't have enough permission to perform this action"}`
 
  * Resposne for GET
    `{"status":"Success","data":{"_id":"5f425070fe2aee2570f23aad","name":"Prashanth","color":"black","details":"fdcdc","price":"13e1","userId":"5f42506ffe2aee2570f23aac","__v":0}}`
  * Response for PUT
    `{"status":"Success","data":{"_id":"5f425070fe2aee2570f23aad","name":"POP","color":"red","details":"djkasjx;kwx","price":"2000","userId":"5f42506ffe2aee2570f23aac","__v":0},"message":"Product is been updated Successfully"}`
  * Resoponse for DELETE
    `{"status":"Success","message":"Product is been deleted Successfully"}`
    
 ##POSTMAN Test Collection
 
 The Postman test collection is present [here](https://github.com/Prashi121/DoodleBlueTask/blob/master/Postman_Collcetions/PrashanthTest.postman_collection.json)
** Note ** : Please make sure to use proper PORT number to run
The test results is attached which run in my  local
