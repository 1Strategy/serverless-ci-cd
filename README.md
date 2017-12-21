# Serverless demo: Serverless, GitHub, and Code Pipeline

## Install global npm modules
```
npm install -g serverless eslint jest
```

## Install local npm modules
Navigate to the app directory, and run
```
npm install
```

## Bring up the DB
```
sls dynamodb install --stage dev
sls dynamodb start --stage dev
sls dynamodb migrate --stage dev
```
Check your shell at [http://localhost:8000/shell/](http://localhost:8000/shell/) to see the db and view the created table.

## Start the offline app
```
sls offline start --stage dev
```

The app is now available at `http://localhost:3000`.

The app has two endpoints:

### GET /todos
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

### POST /todos
Accepts an object in this format:
```
{
	"title": "do things!",
	"completed": false
}
```
Returns a status of 200. The created object is not returned;  you can see it with a GET /todos.

## Testing
To run tests, use
```
npm test
```

To lint, use
```
npm run-script lint
```

## Making Changes
If you change the `serverless.yml` file, you'll need to restart it:
- Stop the offline app; `ctrl-c` in the terminal where it's running is all you need. It's fine to leave the db running.
- Uncomment the line in the `serverless.yml` file that says `noStart: true`. This will prevent serverless offline from trying to start a new database.
- Run `sls offline start --stage dev` again.

Changes to any other file in the app (e.g. a handler) will be reflected immediately, and don't require a restart.
