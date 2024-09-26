<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install

```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# NestJS Class - Complete Guide

## Description

This project repository is designed to explain key concepts and implementation of various NestJS components including Controllers, Providers, Modules, Bootstrapping, Middleware, Guards, Pipes, Interceptors, and Custom Decorators.

## Table of Contents

1. [Controllers](#controllers)
2. [Providers](#providers)
3. [Modules](#modules)
4. [Bootstrapping](#bootstrapping)
5. [Middleware](#middleware)
6. [Guards](#guards)
7. [Pipes](#pipes)
8. [Interceptors](#interceptors)
9. [Custom Decorators](#custom-decorators)

## Controllers

Controllers in NestJS are responsible for handling incoming requests and returning responses to the client. A basic example of a controller is shown below:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return ['John Doe', 'Jane Doe'];
  }
}
```

## Providers

Providers are the backbone of NestJS applications, and they allow you to abstract logic from the controllers. Services, Repositories, and Factories are examples of Providers.

```
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }
}

```

Key Points:

    Providers are decorated with @Injectable().
    Services are typically injected into controllers or other services using Dependency Injection (DI).

# Why use Dependency Injection

The real interest in using Dependency Injection is that the objects will be less
coupled between the dependent and its dependencies. With the framework that
provides the injector system, you can manage your objects without thinking
about the instanciation of them, because that is managed by the injector, which
is there to resolve the dependencies of every dependent object.
This means that it is easier to write tests and mock dependencies, which are
much cleaner and more readable.

```
export class UserService() {

  private users: Array < User > =[{
    id: 1,
    email: 'userService1@email.com',
    password: 'pass'
  ]};

  public findOne({ where }: any): Promise < User > {
    return this.users
      .filter(u => {
        return u.email === where.email &&
          u.password === where.password;
      });
  }
  }
```

```
export class AuthenticationService {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async validateAUser(payload: { email: string; password: string }): Promise<boolean> {
    const user = await this.userService.findOne({
      where: payload
    });
    return !!user;
  }
}
```

# How it works with a manual Dependency Injection

Let’s see now how you can pass dependencies through the constructor using the
previous UserService.

```
// Rewritted AuthenticationService
export class AuthenticationService {
  /*
  Declare at the same time the public
  properties belongs to the class
  */
  constructor(public userService: UserService) { }
}

// Now you can instanciate the AutheticationService like that
const userService = new UserService();
const authenticationService = new AuthenticationService(userService);

```

# Dependency Injection pattern today

Today, to use Dependency Injection, you just have to use the decorator system
provided by Typescript and implemented by the framework that you want to
use.

```
@Injectable()
export class UserService { /*...*/ }

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) { }
}
```

# How does Nest.js create the Dependency injection tree?

Nest.js will then create a container for the entire app, which will contain all of
the module, globalModule, and dynamicModuleMetadata of the entire application.
After it has created the container, it will initialize the app and, during the
initialization, it will instantiate an InstanceLoader and a DependenciesScanner ->
scanner.ts, via which Nest.js will have the possibility to scan every module and
metadata related to it. It does this to resolve all of the dependencies and
generate the instance of all modules and services with their own injections.
If you want to know the details of the engine, we recommend that you go deep
into the two classes: InstanceLoader and DependenciesScanner.

## Modules

Modules are used to organize the application structure. Every application has at least one root module (AppModule), and modules allow for better separation of concerns.

Example:

```
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

```

Key Points:

    Modules are decorated with @Module().
    Modules can import other modules to organize the codebase better.

## Bootstrapping

The entry point of a NestJS application is the main.ts file, where the application is bootstrapped.

Example:

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```

Key Points:

    NestFactory.create() creates the application instance.
    Bootstrapping configures the global pipeline, including middleware, filters, etc.

## Middleware

Middleware is a function that is executed before the route handler. It can modify the request or response objects and is often used for things like logging or request authentication.

Example:

```
import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';



@Injectable()

export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {

    console.log('Request logged:', req.method, req.url);

    next();

  }

}
```

Key Points:

    Middleware can be applied to routes globally or selectively.
    It has access to req, res, and next.

## Guards

Guards determine whether a request will be handled by the route handler. They are typically used for authorization logic.

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization === 'valid_token';
  }
}

```

Key Points:

    Guards implement the CanActivate interface.
    Guards can be applied at the route or controller level using @UseGuards().

## Pipes

Pipes are used to transform or validate the data coming into your application. They can be applied globally, per controller, or per route.

```
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

```

Key Points:

    Pipes are useful for validation and transformation of incoming data.
    You can apply pipes using @UsePipes().

## Interceptors

Interceptors are used for additional logic before or after request handling. They are useful for logging, transforming responses, or timing requests.

Example:

```
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';



@Injectable()

export class LoggingInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log('Before handling request...');

    return next

      .handle()

      .pipe(

        tap(() => console.log('After handling request...'))

      );

  }

}
```

Key Points:

    Interceptors implement the NestInterceptor interface.
    They can be applied globally or per route using @UseInterceptors().

## Custom Decorators

Custom decorators allow for extending the metadata of route handlers or class methods. You can create your own decorators for specific behaviors.

```
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

```

Key Points:

    Custom decorators can be used to inject specific data into your route handlers.
    They are created using createParamDecorator().

```

nestjs-recipes/
├── src/
│ ├── common/
│ │ ├── decorators/
│ │ │ ├── custom.decorator.ts
│ │ ├── interceptors/
│ │ │ ├── logging.interceptor.ts
│ │ ├── middleware/
│ │ │ ├── logger.middleware.ts
│ │ ├── guards/
│ │ │ ├── auth.guard.ts
│ │ ├── pipes/
│ │ │ ├── validation.pipe.ts
│ ├── controllers/
│ │ ├── app.controller.ts
│ ├── modules/
│ │ ├── decorators.module.ts
│ │ ├── middleware.module.ts
│ │ ├── interceptors.module.ts
│ │ ├── guards.module.ts
│ │ ├── pipes.module.ts
│ ├── app.module.ts
│ └── main.ts
│
├── README.md
├── tsconfig.json
├── package.json
└── .gitignore

```
