# Basic API with node.js
Aquí estoy demostrando cómo usar una API desde cero, con una base de datos propia y otras dependencias importantes.


## Dependencies

- express 

    This is an important dependency for our API.

    Can be installed with the command:
    ```
    npm install --save express
    ```

- nodemon 

    This is so that we don't have to restart the service every time we make changes. It does that automatically.

    Can be installed with the command:
    ```
    npm install --save-dev nodemon
    ```

    Can be executed with:
    ```
    nodemon [direccion_archivo]
    ```

- morgan 

    Works to see the petitions log for the API in the console.

    Can be installed with the command:
    ```
    npm install --save morgan
    ```

- body-parser 

    Used for formating the code for languages like JSON.

    Can be installed with the command:
    ```
    npm install --save-dev body-parser
    ```

- mariadb 

    I have been using mariadb as a database, so we would have to install it's dependency to use it.
    If you use any other database provider, like MySQL, then you would have to install MySQL's dependency, and not mariadb's.

    Can be installed with the command:
    ```
    npm install mariadb
    ```
- sequelize

    This one is for defining models (like objects) in our API that represent database tables so we can more easily interact with the database.

    Can be installed with the command:

    ```
    npm install sequelize
    ```

 
All these dependencies can be installed with one single command:

```
npm install express morgan body-parser nodemon mariadb sequelize --save
```

 

 

## Launch the API

To create the project from scratch you would have to use the command below. This command will generate us a series of questions to generate the project,
and generate with it the main archive (we can name it however we want).
 
```
npm init
``` 

This command will prompt us with a series of questions, and most of them can be left blanc. 

>package name: (api)  
>version: (l.0.0)  
>description :  
>entry point: (index.js)  
>test command:  
>git repository:  
>keywords :  
>author: miler  
>license: (ISC)  


It will leave us with these archives:

![](README_images/archivos.png)



To launch the API we will have to execute the following command:

 
```
Node [ruta_archivo]
```

 
This command will continue being executed untill we stop it manually (Ctrl + C). The changes done to the files will not be saved until we stop this command and start it again manually. This can be changed with **nodemon**, which allows us to save the changes to the project and it will restart it automatically.

This command executes nodemon from the main archive of the project:
```
nodemon [ruta_archivo] 
```


This command is so that when we update indirect files (like files out of the main directory), it will still be watching those files, and activate nodemon automatically.
 
```
tsc --watch 
```
 


## Other notes (old)

I had to add this line which launches our server and executes the specified command (in this case "nodemon server.js"). This is because nodemon cannot be executed from any file, however, if we write this line in the package JSON file, it will execute nodemon from the main file.

>dev": "nodemon server.js

![](./README_images/packageJson.png)


This command launches the api:

```
npm run dev
```
