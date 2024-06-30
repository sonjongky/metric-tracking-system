1. Clone the repository

## Run the application locally with nodejs

### Prerequisites

- Install `Docker 23.0.5`
- Install `Nodejs 18.17.1`

### Run application

1. Copy [.env.temp](.env.temp) to `.env`
2. Run following command to initialize the database:

```
cd <project dir>
docker compose up -d
```

3. Run following commands to start the application

```
cd <project dir>
yarn install
yarn build
yarn start
```

The application will run on [http://localhost:3000](http://localhost:3000)
