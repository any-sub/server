# AnySub - subscribe to anything

Based on the [Ts.ED](https://tsed.io) framework.

## Getting Started

### Prerequisites

* Node v16+
* Yarn
* [Google Cloud CLI](https://cloud.google.com/sdk/docs/install-sdk)


```bash
# authenticate
yarn auth

# install dependencies
yarn

# generate prisma client and models
yarn prisma:generate

# start worker
yarn start

# run tests
yarn test
```

> Creating or deleting some files may require barrelsby to recreate the index files.
> Starting the server automatically runs barrelsby.