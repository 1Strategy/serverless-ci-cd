# Serverless CI/CD Tutorial
## Building, testing, and deploying Serverless apps using CodeBuild and CodePipeline

This repo is the demo code for a [three-part tutorial](http://www.1strategy.com/blog/) on managing unit testing, integration testing, and deployment of apps built using the Serverless framework.

To play with this code locally, clone this repo and do the following:

### 1. Install global npm modules
```
npm install -g serverless eslint jest
```

### 2. Install local npm modules
Navigate to the app directory, and run
```
npm install
```
### 3. Bring up the DB
```
sls dynamodb install --stage dev
sls dynamodb start --stage dev
sls dynamodb migrate --stage dev
```
This series of commands installs a local DynamoDB, starts it, and creates any tables specified in the `serverless.yml`. Check your shell at [http://localhost:8000/shell/](http://localhost:8000/shell/) to interact with the db and view the created table.

### 4. Start the offline app
```
sls offline start --stage dev
```

The app is now available at `http://localhost:3000`.

The app has two endpoints:

#### GET /todos
Returns a list of todos:
```
[
    {
        "id": "9b3c415f-ceaa-49e3-b5af-0e335bfd4635",
        "completed": false,
        "title": "do things!",
        "updatedAt": 1513817875660
    }
]
```

#### POST /todos
Accepts an object in this format:
```
{
	"title": "do things!",
	"completed": false
}
```
Returns a status of 200. The created object is not returned;  you can see it with a GET /todos.

### 5. Run Tests
To run unit tests, use
```
npm test
```

To lint, use
```
npm run-script lint
```

To run integration tests, use
```
npm run-script integration
```

### 6. Make Changes
If you change the `serverless.yml` file, you'll need to restart your local app:
- Stop the offline app; `ctrl-c` in the terminal where it's running is all you need. It's fine to leave the db running.
- Uncomment the line in the `serverless.yml` file that says `noStart: true`. This will prevent serverless offline from trying to start a new database.
- Run `sls offline start --stage dev` again.

Changes to any other file in the app (e.g. a handler) will be reflected immediately, and don't require a restart.
