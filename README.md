# Microservice notifications job

This micro-service is a cron that runs every day and can notify a user by a condition.

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### TODO: Locally

In order to test the hello function locally, run the following commands:
  
**Create onboarding status**

- `npx sls invoke local -f create-onboarding-status --path src/Onboarding/OnboardingStatus/presentation/create-onboarding-status/mock.json`

**Onboarding status job**

- `npx sls invoke local -f onboarding-status-job`

To test cron functions:

- `serverless offline start`

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.
## Project Architecture

This project implements a simplify mode of [**Clean Architecture**](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

![Clean Architecture](https://github.com/G33N/serverless-clean-arquitecture/blob/main/architecture-diagram.jpg?raw=true)

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `bounded-context` - containing code base and configuration for your lambda functions
- `shared` - containing shared code base between your lambdas

```
.
├── tests				         # Unit tests
├── src
│   ├── bounded-context          # Lambda configuration and source code folder
│   │   ├── presentation
│   │   │   ├── handler.ts
│   │   │   ├── index.ts
│   │   │   └── schema.ts
│   │   ├── application         # Application business logic (Use cases).      
│   │   │   └── UseCase.ts
│   │   ├── domain              # Enterprise business logic.
│   │   │   ├── Entity
│   │   │   ├── Failures
│   │   │   └── ValueObjects
│   │   └── infrastructure      # Interface to communicate with other contexts. (Local and remote resources), repositories.
│   │
│   └── shared                  # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
