# Installation

```bash
$ git clone https://github.com/CodebitsDesign/typescript-mean-backend.git <project-name>
$ cd <project-name>
$ yarn install
```

Install `mocha`:
```bash
$ sudo yarn global add mocha
```

# Run
Make sure you have typescript installed, then run:

```bash
yarn start
```

# Test
```
yarn test
```

# Database
When you first run this project, it will connect to a remote MongoDB instance I have setup so this project can be run with minimal overhead. However, I advise you to create your own `<project>/properties/local.properties.json` and `<project>/properties/test.properties.json`, since the remote mongo instance is cleaned on a regular basis.


----------------------------

# Create MongoDB database and account user

## MongoDB Connection

Check db server:
```bash
$ service mongod status
```

Run db server:
```bash
$ sudo service mongod start

$ service mongod status
  ...
   Active: active (running)
```

[Getting Started with the mongo Shell](https://docs.mongodb.com/v3.0/tutorial/getting-started-with-the-mongo-shell/)

Start the mongo Shell:
```bash
$ mongo

// To display the database you are using:
$ MongoDB> db
test

// Print help
$ MongoDB> help

// Exit mongo shell
$ MongoDB> exit 
$
```
> ```bash
> db.help()                    help on db methods
> db.mycoll.help()             help on collection methods
> sh.help()                    sharding helpers
> rs.help()                    replica set helpers
> help admin                   administrative help
> help connect                 connecting to a db help
> help keys                    key shortcuts
> help misc                    misc things to know
> help mr                      mapreduce
> 
> show dbs                     show database names
> show collections             show collections in current database
> show users                   show users in current database
> show profile                 show most recent system.profile entries with time >= 1ms
> show logs                    show the accessible logger names
> show log [name]              prints out the last segment of log in memory, 'global' is > default
> use <db_name>                set current database
> db.foo.find()                list objects in collection foo
> db.foo.find( { a : 1 } )     list objects in foo where a == 1
> it                           result of the last line evaluated; use to further iterate
> DBQuery.shellBatchSize = x   set default number of items to display on shell
> exit                         quit the mongo shell
> MongoDB Enterprise >
>
> ```
>> To switch databases, issue the `use <db>`


## How to create a MongoDB database
<http://theholmesoffice.com/how-to-create-a-mongodb-database/>
> With MongoDB you create a database the first time you save data into it.

```bash
$ mongo

mongo> show dbs

admin         0.000GB
local         0.000GB
>
>
``` 

Step 1. "`Use`" the database you wish to create:
> rather than explicitly creating a database, MongoDB will `create a database when it first has data saved to`. 
>> In order to save data, we need to connect to our new database `even though it doesn’t exist yet`. 

```bash
// new database: `ts-mean-test`
mongo> use ts-mean-test
>
```
> the database hasn’t been created yet.

Step 2. Insert some data into the `ts-mean-test` database:
> there are no `tables`, `rows` or `columns`. 
> In their place, MongoDB uses ***`collections`*** and ***`objects`***. Think of `collections` as tables, and `objects` as table rows.

```bash
mongo> db
ts-mean-test

// new collection: `teams`
> db.teams.save({Country:"Korea",GroupName:"Codebits.Design"})  
>
> show dbs

admin     0.000GB
local     0.000GB
ts-mean-test  0.000GB
> 
>
```           
> That will create a new collection called “`teams`”, and save an object with two fields “`Country`” and “`GroupName`”. Crucially, this will now also save our database. 
> Check that it has been created by running `show dbs` again.

Step 3. testing by reading the data back out:
```bash
mongo> show collections

teams
>
> db.teams.find()

{ "_id" : ObjectId("5902ef7eeeffb94cf18735d4"), "Country" : "Korea", "GroupName" : "Codebits.Design" }
>
>
```

> -   A **database** holds a set of collections
> -   A **collection** holds a set of documents
> -   A **document** is a set of fields
> -   A **field** is a key-value pair
> -   A **key** is a name (string)
> -   A **value** is a - basic type like string, integer, float, timestamp, binary, etc., a document, or an array of values


## How to create a MongoDB accout user 
[User Management on MongoDB](https://docs.mongodb.com/v3.0/reference/method/#user-management)

-   `show users`: Print a list of users for current database.
-   `db.createUser(user, writeConcern)` : Creates a new user.
 
Create User with Roles : 
<https://docs.mongodb.com/v3.0/reference/method/db.createUser/#db.createUser>

The following operation creates ***`mongoUser`*** in the ***`ts-mean-test`*** database and gives the user the `readWrite` and `dbAdmin` roles.
```bash
mongo> use ts-mean-test
> 
> db.createUser(
   {
     user: "mongoUser",
     pwd: "password",
     roles: [ "readWrite", "dbAdmin" ]
   }
)

>
>
```

Show the account users of `ts-mean-test` database:
```bash
mongo> use ts-mean-test
> 
> show users

{
        "_id" : "ts-mean-test.mongoUser",
        "user" : "mongoUser",
        "db" : "ts-mean-test",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "ts-mean-test"
                },
                {
                        "role" : "dbAdmin",
                        "db" : "ts-mean-test"
                }
        ]
}

>
> exit
$ 
``` 

Connect `ts-mean-test` database with `mongoUser` account:
```bash
$ mongo ts-mean-test -u mongoUser -p
Enter password:

mongo> db  

ts-mean-test
>
>
```


----------------------------


# DefinitelyTyped for TypeScript

## TypeScript 2.x

If you are using TypeScript 2.x you no longer need to have Typings or Definitely Typed installed. Simply install the following package.
```bash
$ yarn add @types/node --dev
or
$ npm install @types/node --save-dev
```

> OPTIONAL: If you are specifying typeroots or types in your tsconfig.json. You may need to update the tsconfig.json to include node as a type. By default any package under @types is already included in your build unless you've specified either of these options.

Below is proper configuration for each of these options:
`tsconfig.js`
```json
{
    "compilerOptions": {
        // types option has been previously configured
         "types": [
            // add node as an option
            "node"
         ],
         // typeRoots option has been previously configured
         "typeRoots": [
            // add path to @types
            "node_modules/@types"
         ]
    }
}
```

## TypeScript 1.x

The definitive step-by-step guide to use DefinitelyTyped typings for applications written in TypeScript. - Posted on 2016/06/20
<https://neoheurist.wordpress.com/2016/06/20/definitely-typed/>

Install `typings`:
```bash
$ yarn add typings
```

Run `typings`:
```bash
$ yarn run typings

```

Create an empty `typings.json` file using the typings init command:
```bash
$ yarn run typings init
```

Find a package typings:
```bash
$ yarn run typings search express

Viewing 20 of 53
NAME                      SOURCE HOMEPAGE                                                 DESCRIPTION VERSIONS UPDATED                 
express                   npm    https://www.npmjs.com/package/express                                1        2017-02-17T20:54:33.000Z
express                   dt     http://expressjs.com                                                 2        2017-01-18T06:03:22.000Z
...
```

To determine which  `typings` file to use, run the `typings` `info` command:
```bash 
$ yarn run typings info dt~express --versions
```

Install package typings:
```bash
$ yarn run typings install dt~express --save --global
```
