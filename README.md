# EMPLOYEE MANAGER

## Getting Started

### Pre-requisites (Tools)

- Node: v18.18.0 above
- PostgreSQL 14 LTS above

### Setting up directly on local machine

This step is most suited to be carried out in a CLI rather rather than a GUI. In this guide, I would be using bash.

- STEP 1: Create a directory for cloning the repository.

```sh
mkdir employee_manager && cd employee_manager
```

- STEP 2: Clone the repository to your local machine.

```sh
git clone https://github.com/daviddivinefavour/employee-manager.git .
```

- STEP 3: Install all project dependencies by running the `yarn` command in your terminal.

```sh
yarn
```

- STEP 4: Transpile code from ES6 to ES5 using babel

```sh
yarn build
```

- STEP 5: Copy environment variables from .env.example to new .env file, and update the environment with the working values.

```sh
cp .env.example .env
```

- STEP 6: On the first setup, you should create a database to persist data. But first drop database if it exists already.

```sh
yarn db:drop
```

- STEP 7: Now create new database

```sh
yarn db:create
```

- STEP 8: Run migrations to populate database with needed tables.

```sh
yarn db:migrate
```

- STEP 9: There are many modes for initialization, including development, staging, and others. However, development mode is used on default for this guide.

```sh
yarn start:dev
```
