![Adcash Logo](./adcash-logo.png)

## Starting locally

```shell
# Start the database
cd server && docker-compose up -d
```

```shell
# Start the server
cd server && pnpm i && pnpm run start:dev
```

```shell
# Start the client
cd client && pnpm i && pnpm run dev
```

## Live Preview

https://adcash-client-666200250028.europe-west1.run.app

## Notes

- I did not fix all Typescript errors since there are too many template files.
- Server campaign entity has too many fields since I started adding real campaign fields, but it would add features outside the scope of the assignment.

## Assignment Details

- full-stack-assignment-2024-3ax.pdf

## Time spend

![Timespent](./timespent.png)
