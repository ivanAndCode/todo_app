# Workshop
- [ ]  Login to your github account
- [ ]  Fork the repo  https://github.com/ivanAndCode/todo_app
- [ ]  Clone your repo
- [ ]  Check that your git is setup properly, make sure you can push to the repo by making a dummy commit (modify readme, for example)
  https://stackoverflow.com/a/44099011
- [ ]  Install dependencies
    - [ ]  Run the app
    - [ ]  Run the tests
        - [ ]  unit
        - [ ]  UI
- [ ]  Create a simple workflow with one job and one step “echo ‘Hello TestBash’” and make it executable “on push”
    - [ ]  Find an example workflow https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
    - [ ]  create a file in a `.github/workflows/` folder called `my-first-workflow`
- [ ]  Push the code & see the workflow run in the github actions tab
- [ ]  Add a job to run unit tests
- [ ]  Add the job to run UI tests
- [ ]  Think about failure & what is wrong
- [ ]  Fix the job to have the step to start the webapp before running tests
- [ ]  Separate big step into two smaller ones for readability
- [ ]  Think about sequential/parallel execution. Make UI test run only after unit tests have passed.
- [ ]  Optional: remove the `say-hello` stage
- [ ]  Optional: modify the pipeline pretending there is a deployment of our webapp to the testing ⇒ staging ⇒ production environments
- [ ]  Optional: modify the pipeline to display a better name. Maybe a name of the current commit?
- [ ]  Optional: convert our last action to use the official action from Cypress to
    - [ ]  start the webapp
    - [ ]  run the tests


# Answers
1. simple workflow
   ```yml
   name: learn-github-actions
   run-name: ${{ github.actor }} is learning GitHub Actions
   on: [push]
   jobs:
     say-hello:
       runs-on: ubuntu-latest
       steps:
         - run: echo "Hello TestBash!"
   ```
   
2. running unit tests
```yml
run-unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd ./src/webapp/api && npm ci && npm run test
```

3. run UI tests
```yml
run-ui-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd ./e2e/cypress && npm ci && npm run test
```
4. running webapp
```yml
start-webapp-and-run-ui-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: |
          cd ./src/webapp &&
          npm ci &&
          npm run start-server &
          sleep 10 &&
          curl http://localhost:8080 -I &&
          cd ./e2e/cypress && npm ci && npm run test
```

5. separating

```yml
start-webapp-and-run-ui-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: |
          cd ./src/webapp &&
          npm ci &&
          npm run start-server &
          sleep 10 &&
          curl http://localhost:8080 -I
      - run: cd ./e2e/cypress && npm ci && npm run test
```

6. run sequentially
```yml
needs: run-unit-tests
```
