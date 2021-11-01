export default {
  openapi: "3.0.0",
  info: {
    title: "To Do List",
    description: "Documentation from To Do List API",
    version: "1.0.0",
  },
  basePath: "/",
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-access-token",
        description: "Access Token.",
        // bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/users/register": {
      post: {
        tags: ["Users"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  name: "Teste",
                  email: "teste25@teste.com",
                  password: "123456",
                },
              },
            },
          },
        },
        responses: {
          500: {
            description: "Server Error",
          },
          401: {
            description: "Email has already been registered",
          },
          200: {
            description: "User created",
          },
        },
      },
    },
    "/users/login": {
      post: {
        tags: ["Users"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  email: "teste25@teste.com",
                  password: "123456",
                },
              },
            },
          },
        },
        responses: {
          500: {
            description: "Server Internal Error",
          },
          401: {
            description: "Incorrect email or password",
          },
          200: {
            description: "User Logged",
          },
        },
      },
    },
    "/tasks": {
      get: {
        tags: ["Tasks"],
        security: [{ ApiKeyAuth: [] }],
        responses: {
          500: {
            description: "Server Error",
          },
          200: {
            description: "OK",
          },
        },
      },
    },
    "/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
            required: true,
          },
        ],
        responses: {
          500: {
            description: "Server Error",
          },
          401: {
            description: "Unauthorized",
          },
          200: {
            description: "OK",
          },
        },
      },
    },
    "/tasks/search": {
      get: {
        tags: ["Tasks"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "query",
            type: "string",
            required: true,
          },
        ],
        responses: {
          500: {
            description: "Server Error",
          },
          200: {
            description: "OK",
          },
        },
      },
    },
    "/tasks/create": {
      post: {
        tags: ["Tasks"],
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  author: {
                    type: "string",
                    required: true,
                  },
                  done: {
                    type: "boolean",
                    required: true,
                  },
                },
                example: {
                  title: "Teste Swagger",
                  description: "123456",
                  author: "61804e8f0d9b8e6f5e6fa8b8",
                  done: false,
                },
              },
            },
          },
        },
        responses: {
          500: {
            description: "Server Error",
          },
          200: {
            description: "OK",
          },
        },
      },
    },
    "/tasks/update/{id}": {
      put: {
        tags: ["Tasks"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  done: {
                    type: "boolean",
                  },
                },
                example: {
                  title: "Teste Swagger 2",
                  description: "123456",
                  author: "61804e8f0d9b8e6f5e6fa8b8",
                  done: false,
                },
              },
            },
          },
        },
        responses: {
          500: {
            description: "Server Error",
          },
          401: {
            description: "Unauthorized",
          },
          200: {
            description: "OK",
          },
        },
      },
    },
    "/tasks/delete/{id}": {
      delete: {
        tags: ["Tasks"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
            required: true,
          },
        ],
        responses: {
          500: {
            description: "Server Error",
          },
          401: {
            description: "Unauthorized",
          },
          200: {
            description: "OK",
          },
        },
      },
    },
  },
};
