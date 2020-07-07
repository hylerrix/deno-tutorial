# How to Use MySQL With Deno and Oak

![How to Use MySQL With Deno and Oak](https://images.unsplash.com/photo-1591509867461-d9f58becc082?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

I recently wrote about how to make a  **[Todo API in Deno + Oak (without using a database)][1]**. You can find the repo under  **[chapter\_1:oak][2]** on GitHub.

This tutorial picks up where the other left off, and I'll go over how to integrate MySQL into a Deno and Oak project.

If at any time you want to see the entire source code used in this tutorial, it's available at  [**chapter\_2:mysql**][3]. Feel free to give it a star on GitHub if you like it.

I'm assuming that you already completed the last tutorial mentioned above. If not, check it out  [here][4]  and come back when you're finished.

Before we start, make sure that you have a MySQL client installed and running:

-   MySQL community server \[[Download here][5]\]
-   MySQL Workbench \[[Download here][6]\]

I wrote a small guide for Mac OS users on setting up MySQL because I struggled with it as well. Check it out  [here][7].

If you are on a Windows machine you can use the same tools or you can also use  [XAMPP][8]  to have a MySQL instance running in your dashboard.

Once you have a MySQL instance running we can begin our tutorial.

## Let's Begin

Assuming that you're coming from this article,  [**Todo API in Deno + Oak (without using a database)**][9], we will do the following:

-   Create a MySQL database connection
-   Write a small script that resets the database every time we start our Deno server
-   Perform CRUD operations on a table
-   Add the CRUD functionality to our API controllers

One last thing – here is the entire commit difference that was made in Chapter 1 to add MySQL to the project ([source code that shows the new additions made from chapter 1][10]).

In your project root folder – mine is called  _`chapter_2:mysql`,_ though  yours can be called whatever you want – create a folder called  **db**. Inside that folder, create a file called  **config.ts and**  add the following content to it:

```db
export const DATABASE: string = "deno";
export const TABLE = {
  TODO: "todo",
};

```

Nothing fancy here, just defining our database name along with an object for tables and then exporting it. Our project will have one database called "deno" and inside that db we will only have one table called "todo".

Next, inside the  **db** folder, create another file called  **client.ts** and add the following content:

```db
import { Client } from "https://deno.land/x/mysql/mod.ts";
// config
import { DATABASE, TABLE } from "./config.ts";

const client = await new Client();
client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: "",
});

```

A couple of things are happening here.

We are importing  `Client`  from the  `mysql`  library.  `Client`  will help us connect to our database and perform operations in the database.

```db
client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: "",
});
```

`Client`  provides a method called  `connect`  which takes in object where we can provide the  `hostname`,  `username`,  `password`, and  `db`. With this information it can establish a connection to our MySQL instance.

Make sure that your  `username`  has no  `password`, as it will conflict with connecting to Deno's MySQL library. If you don't know on how to do that,  [read this tutorial][11]  I wrote.

I have left the  `database`  field blank here because I want to select it manually later in my script.

Let's add a script that will initialize a database called "deno", select it, and inside that db create a table called "todo".

Inside  `db/client.ts`  file let's make some new additions:

```db
import { Client } from "https://deno.land/x/mysql/mod.ts";
// config
import { DATABASE, TABLE } from "./config.ts";
const client = await new Client();
client.connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "",
  db: "",
});
const run = async () => {
  // create database (if not created before)
  await client.execute(CREATE DATABASE IF NOT EXISTS ${DATABASE});
  // select db
  await client.execute(USE ${DATABASE});
  // delete table if it exists before
  await client.execute(DROP TABLE IF EXISTS ${TABLE.TODO});
  // create table
  await client.execute(CREATE TABLE ${TABLE.TODO} (
        id int(11) NOT NULL AUTO_INCREMENT,
        todo varchar(100) NOT NULL,
        isCompleted boolean NOT NULL default false,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;);
};
run();

```

Here we are importing  `DATABASE`  and  `TABLE`  from our config file, then using those values in a new function called  `run()`.

Let's break down this  `run()`  function. I have added comments in the file to help you understand the workflow:

```db
const run = async () => {
  // create database (if not created before)
  await client.execute(CREATE DATABASE IF NOT EXISTS ${DATABASE});
  // select db
  await client.execute(USE ${DATABASE});
  // delete table if it exists before
  await client.execute(DROP TABLE IF EXISTS ${TABLE.TODO});
  // create table
  await client.execute(CREATE TABLE ${TABLE.TODO} (
        id int(11) NOT NULL AUTO_INCREMENT,
        todo varchar(100) NOT NULL,
        isCompleted boolean NOT NULL default false,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;);
};

```

-   Create a database called  `deno`  . If it already exists then do nothing.
-   Then select the database to use, which is called  `deno`
-   Delete the table inside  `deno`  called  `todo`  if it already exists.
-   Next, create a new table inside the  `deno`  db, call it  `todo`, and define its structure: It will have a unique auto increment  `id`  which will be an integer, another field called  `todo`  which will be a string, and finally a field called  `isCompleted`  which is a boolean. I also define  `id`  as my primary key.

The reason I wrote this script was because I don't want to have extra information in MySQL instance. Every time the script runs it just reinitializes everything.

You don't have to add this script. But if you don't, then you will have to manually create a db and the table.

Also, check out the Deno MySQL library's docs on  [db creation][13]  and on  [table creation][14].

Going back to our agenda, we just achieved two things out of the four mentioned at the top of the article:

-   Create a MySQL database connection
-   Write a small script that resets the database every time we start our Deno server

That is already 50% of the tutorial. Unfortunately, we can't see much happening right now. Let's quickly add some functionality to see it working.

## Performing CRUD operations on a table and adding the functionality to our API controllers

We need to update our Todo interface first. Go to the  `interfaces/Todo.ts`  file and add the following:

```interfaces
export default interface Todo {
  id?: number,
  todo?: string,
  isCompleted?: boolean,
}

```

What this  `?`  does is it makes the key in the object optional. I did this because later I will use different functions to pass objects with only an  `id`,  `todo`,  `isCompleted`, or all of them at once.

If you want to learn more about optional properties in TypeScript, head over to their docs  [here][15].

Next, create a new folder called  **models** and inside that folder, create a file called  **todo.ts**.  Add the following content to the file:

```models
import client from "../db/client.ts";
// config
import { TABLE } from "../db/config.ts";
// Interface
import Todo from "../interfaces/Todo.ts";
export default {
  /**

```

Right now the functions are empty, but that is okay. We will fill them up one by one.

Next go to  `controllers/todo.ts`  file and make sure you add the following:

```
// interfaces
import Todo from "../interfaces/Todo.ts";
// models
import TodoModel from "../models/todo.ts";

export default {
  /**

```

Here we have empty functions as well. Let's start filling them up.

### \[Get\] all todos API

Inside  `models/todo.ts`, add a definition for a function called  `getAll`:

```models
import client from "../db/client.ts";
// config
import { TABLE } from "../db/config.ts";
// Interface
import Todo from "../interfaces/Todo.ts";

export default {
   /**

```

We simply run a MySQL query to get all entries from table.

The  `Client`  also exposes another method besides  `connect`  (we used a "connect" method in  `db/client.ts`  file) and that is  `query`. The  `client.query`  method lets us run MySQL queries directly from our Deno code as is.

Next go to  `controllers/todo.ts`  add definition for  `getAllTodos`:

```controllers
// interfaces
import Todo from "../interfaces/Todo.ts";
// models
import TodoModel from "../models/todo.ts";

export default {
  /**

```

All we are doing is importing  `TodoModel`  and using its method called  `getAll`, which we just defined now. Since it returns as a promise we have wrapped it in async/await.

The method  `TodoModel.getAll()`  will return us an array which we simply return to  `response.body`  with  `status`  set to  `200`.

If the promise fails or there is another error, we simply go to our catch block and return a status of 400 with  `success`  set to false. We also set the  `message`  to what we get from the catch block.

That's it, we're done. Now let's fire up our terminal.

Make sure your MySQL instance is running. In your terminal type:

```
$ deno run --allow-net server.ts 
```

Your terminal should look something like this:

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-04-at-23.29.19.png)

This is how my console looks when I start the server

My console is telling me two things here.

1.  That my Deno API server is running on port 8080
2.  That my MySQL instance is running on  `127.0.0.1`, which is  `localhost`

Let's test our API out. I am using  [Postman][16]  here, but you can use your favorite API client.

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-04-at-23.31.07.png)

running \[GET\] localhost:8080/todos => Will return all todos

Right now it only returns empty data. But once we add data to our  `todo`  table, it will return those todos here.

Awesome. One API down and four more to go.

### \[Post\] add a todo API

In the  `models/todo.ts`  file, add the following definition for  `add()`  function:

```
export default {
/**

Adds a new todo item to todo table

@param todo

@param isCompleted


```

The add function takes in object as an argument, which has two items:  `todo`  and  `isCompleted`.

So  `_add_:  _async_  ({ todo, isCompleted }: Todo) => {}`  can also be written as  `({todo, isCompleted}: {todo:string, isCompleted:boolean})`. But since we already have an interface defined in our  `interfaces/Todo.ts`  file which is

```
export default interface Todo {
id?: number,
todo?: string,
isCompleted?: boolean,
}

```

we can simply write this as  `_add_:  _async_  ({ todo, isCompleted }: Todo) => {}`. This tells TypeScript that this function has two arguments,  `todo`, which is a string, and  `isCompleted`, which is a boolean.

If you want to read more on interfaces, TypeScript has an excellent document on it which you can find  [here][17].

Inside our function we have the following:

```
return await client.query(
INSERT INTO ${TABLE.TODO}(todo, isCompleted) values(?, ?),
[
todo,
isCompleted,
],
);
```

This query can be broken down into two parts:

-   `INSERT INTO ${TABLE_._TODO}(todo, isCompleted) values(?, ?)`. The two question marks here denote a use of variables inside this query.
-   The other part,  `[todo, isCompleted]`, is the variables that will go in the  _first part_ of the query and be replaced with  `(?, ?)`
-   `Table.Todo`  is just a string coming from file  `db/config.ts`  where the  `Table.Todo`  value is "`todo`"

Next inside our  `controllers/todo.ts`  file, go to the definition of the  `createTodo()`  function:

```
export default {
/**

@description Add a new todo

@route POST /todos


```

Let's break this down into two parts:

**Part 1**

```
const body = await request.body();
if (!request.hasBody) {
response.status = 400;
response.body = {
success: false,
message: "No data provided",
};
return;
}
```

All we are doing here is checking if the user is sending data in body. If not, then we return a status  `400`  and in the body return  `success: false`  and  `message: <erromessage-string>`.

**Part 2**

```
try {
await TodoModel.add(
{ todo: body.value.todo, isCompleted: false },
);
response.body = {
success: true,
message: "The record was added successfully",
};
} catch (error) {
response.status = 400;
response.body = {
success: false,
message: Error: ${error},
};
}
```

If there is no error, the  `TodoModel.add()`  function is called and simply returns a status of  `200`  and a confirmation message to the user.

Otherwise it just throws a similar error that we did in the previous API.

Now we're done. Fire up your terminal and make sure your MySQL instance is running. In your terminal type:

```
$ deno run --allow-net server.ts 
```

Go to  [Postman][18]  and run the API route for this controller:

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-04-at-23.55.02.png)

running \[POST\] localhost:8080/todos => Will add a new new todo item

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-04-at-23.57.06.png)

running \[POST\] localhost:8080/todos => Will return all todos, notice how the new added item is being returned as well

This is great, now we have two working APIs. Only three more to go.

### \[GET\] todo by id API

In your  `models/todo.ts`  file, add definition for these two functions,  `doesExistById()`  and  `getById()`:

```
export default {
/**

Takes in the id params & checks if the todo item exists

in the database

@param id

@returns boolean to tell if an entry of todo exits in table

/
doesExistById: async ({ id }: Todo) => {
const [result] = await client.query(
  SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1,
  [id],
);
return result.count > 0;
},
/**

Takes in the id params & returns the todo item found

against it.

@param id

@returns object of todo item


```

Let's talk about each function one by one:

-   `doesExistById`  takes in an  `id`  and returns a  `boolean`  indicating whether a particular todo exists in the database or not.

Let's break this function down:

```
const [result] = await client.query(
SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE id = ? LIMIT 1,
[id],
);
return result.count > 0;
```

We simply check the count here in the table against a particular todo id. If the count is greater than zero, we return  `true`. Otherwise, we return  `false`.

-   `getById`  returns the todo item against a particular id:

```
return await client.query(
SELECT * FROM ${TABLE.TODO} WHERE id = ?,
[id],
);
```

We are simply running a MySQL query here to get a todo by id and returning the result as-is.

Next, go to your  `controllers/todo.ts`  file and add a definition for a  `getTodoById`  controller method:

```
export default {
/**

@description Get todo by id

@route GET todos/:id


```

Let's break this down into two smaller parts:

```
const isAvailable = await TodoModel.doesExistById(
{ id: Number(params.id) },
);



```

First we check if the todo exists in the database against an id by using this method:

```
const isAvailable = await TodoModel.doesExistById(
  { id: Number(params.id) },
);
```

Here we need to convert  `params.id`  into a  `Number`  because our todo interface only accepts  `id`  as a number. Next, we just pass  `params.id`  to the  `doesExistById`  method. This method will return as a boolean.

Then we simply check if the todo is not available and return a  `404`  method with our standard response like with the previous endpoints:

```
if (!isAvailable) {
  response.status = 404;
  response.body = {
    success: false,
    message: "No todo found",
  };
  return;
}
```

Then we have:

```
try {
const todo: Todo = await TodoModel.getById({ id: Number(params.id) });
response.status = 200;
response.body = {
  success: true,
  data: todo,
};
} catch (error) {
response.status = 400;
response.body = {
  success: false,
  message: Error: ${error},
};
```

This is similar to what we were doing in our previous APIs. Here we are simply getting data from the db, setting the variable  `todo`, and then returning the response. If there is an error we simply return a standard error message in the catch block back to the user.

Now fire up your terminal and make sure your MySQL instance is running. In your terminal type:

```
$ deno run --allow-net server.ts 
```

Go to  [Postman][19]  and run the API route for this controller.

Remember that every time we restart our server we reset the db. If you don't want this behavior, you can simply comment out the  `run`  function in the file  `db/client.ts`.

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-17.09.32.png)

running \[POST\] localhost:8080/todos => Will add a new new todo item

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-17.10.13.png)

running \[POST\] localhost:8080/todos => Will return all todos

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-17.11.03.png)

running \[GET\] localhost:8080/todos/:id => will return the todo for that id if found

![running [GET] localhost:8080/todos/:id => will return the todo for that id if found](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-17.16.06.png)

running \[GET\] localhost:8080/todos/<unknown-id> => returns status 404 with not found error message

So far we have done APIs for:

-   Get all todos
-   Create a new todo
-   Get a todo by ID

And here are the remaining APIs:

-   Update a todo by ID
-   Delete a todo by ID

### \[PUT\] update todo by id API

Let's create a model for this API first. Go in our  `models/todo.ts`  file and add a definition for an  `updateById`  function:

```
**

```

The  `updateById`  takes in 3 params:  `id`,  `todo`, and  `isCompleted`.

We simply run a MySQL query inside this function:

```
onst result = await client.query(
UPDATE ${TABLE.TODO} SET todo=?, isCompleted=? WHERE id=?,
[
  todo,
  isCompleted,
  id,
],
);
```

This updates a single todo item's  `todo`  and  `isCompleted`  by a specific  `id`.

Next we return a count of rows updated by this query by doing:

```
  // return count of rows updated
return result.affectedRows;
```

The count will either be 0 or 1, but never more than 1. This is because we have unique IDs in our database – multiple todos with the same ID cannot exist.

Next go to our  `controllers/todo.ts`  file and add a definition for a  `updateTodoById`  function:

```
updateTodoById: async (
{ params, request, response }: {
  params: { id: string };
  request: any;
  response: any;
},
) => {
try {
  const isAvailable = await TodoModel.doesExistById(
{ id: Number(params.id) },  );
  if (!isAvailable) {
response.status = 404;
response.body = {
  success: false,
  message: "No todo found",
};
return;  }
  // if todo found then update todo
  const body = await request.body();
  const updatedRows = await TodoModel.updateById({
id: Number(params.id),
...body.value,  });
  response.status = 200;
  response.body = {
success: true,
message: `Successfully updated ${updatedRows} row(s)`,  };
} catch (error) {
  response.status = 400;
  response.body = {
success: false,
message: `Error: ${error}`,
```

This is almost the same as of our previous APIs we wrote. The part that's new here is this:

```
// if todo found then update todo
const body = await request.body();
const updatedRows = await TodoModel.updateById({
id: Number(params.id),
...body.value,
});
```

We simple get the body that the user sends us in JSON and pass the body to our  `TodoModel.updateById`  function.

We have to convert the  `id`  to a number to comply with our Todo interface.

The query is executed and returns the count of updated rows. From there we simply return it in our response. If there is an error it goes to the catch block where we return our standard response message.

Let's run this and see if it works. Make sure your MySQL instance is running and run the following from your terminal:

```
$ deno run --allow-net server.ts 
```

Go to  [Postman][20]  and run the API route for this controller:

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-17.42.02.png)

running \[PUT\] localhost:8080/todos/:id => will update content of that todo by given id

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-17.43.13.png)

running \[GET\] localhost:8080/todos/ => will return all todos, see how the todo you updated is also showing there.

### \[DELETE\] todo by id API

In your  `models/todo.ts`  file create a function called  `deleteById`:

```
/**

Deletes a todo by ID

@param id

@returns integer (count of effect rows)


```

Here we simply pass an  `id`  as a param and then use the delete MySQL query. We then return the updated count of rows. The updated count will either be 0 or 1 because the ID of each todo is unique.

Next, go in your  `controllers/todo.ts`  file and define a  `deleteByTodoId`  method:

```
/**

@description Delete todo by id

@route DELETE todos/:id


```

This is pretty straightforward. We pass the  `params.id`  to our  `TodoModel.deleteById`  method and return the count of rows updated with this query.

If anything goes wrong an error is thrown in the catch block which returns our standard error response.

Let's check this out.

Make sure your MySQL instance is running. In your terminal type:

```
$ deno run --allow-net server.ts 
```

Go to  [Postman][21]  and run the API route for this controller:

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-18.23.04.png)

running \[GET\] localhost:8080/todos/ => will return all todos

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-18.23.11.png)

running \[DELETE\] localhost:8080/todos/:id => will delete a todo by ID

![](https://www.freecodecamp.org/news/content/images/2020/06/Screenshot-2020-06-07-at-18.23.44.png)

running \[GET\] localhost:8080/todos/ => will return all todos, see how todo with "id" is no longer here

With this we are done with our Deno + Oak + MySQL tutorial.

The entire source code is available here:  [https://github.com/adeelibr/deno-playground][22]. If you find an issue, just let me know. Or feel free to make a pull request and I'll give you credit in the repository.

If you found this tutorial helpful, please share it. And as always, I am available on  [Twitter under @adeelibr][23]. I would love to hear your thoughts on it.

  

[1]: https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/
[2]: https://github.com/adeelibr/deno-playground/tree/master/chapter_1:oak
[3]: https://github.com/adeelibr/deno-playground/tree/master/chapter_2:mysql
[4]: https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/
[5]: https://dev.mysql.com/downloads/mysql/
[6]: https://dev.mysql.com/downloads/workbench/
[7]: https://github.com/adeelibr/deno-playground/blob/master/guidelines/setting-up-mysql-mac-os-catalina.md
[8]: https://www.apachefriends.org/index.html
[9]: https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/
[10]: https://github.com/adeelibr/deno-playground/pull/1/commits/5b63b51ebcadededcfec452fe6877a0bd0f1f83f
[11]: https://github.com/adeelibr/deno-playground/blob/master/guidelines/setting-up-mysql-mac-os-catalina.md#set-your-mysql-password-to-empty
[12]: https://deno.land/x/mysql/mod.ts%22
[13]: https://deno.land/x/mysql/#create-database
[14]: https://deno.land/x/mysql/#create-table
[15]: https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties
[16]: https://www.postman.com/
[17]: https://www.typescriptlang.org/docs/handbook/interfaces.html
[18]: https://www.postman.com/
[19]: https://www.postman.com/
[20]: https://www.postman.com/
[21]: https://www.postman.com/
[22]: https://github.com/adeelibr/deno-playground
[23]: https://twitter.com/adeelibr