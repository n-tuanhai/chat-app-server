# chat-app-server
Server for the chat app project, currently being hosted locally.

# Usage:
1. Make a postgres database:
    ```
    db name: chatapp
    username: admin
    password: 123456
    ```
2. Run:
    ```
    npm install
    sequelize db:migrate
    nodemon ./server.js
    ```
3. Note:
    ```
    When registering new user, the password must be:
        - At least 8 characters long
        - Include at least one lowercase and one uppercase letter
        - Include at least one special character
        - Include at least one number
   ```
