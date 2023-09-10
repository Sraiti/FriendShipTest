import path from "path";
import { TypegooseMiddleware } from "../middlewares/typegooseMiddlewares";
import { buildSchema } from "type-graphql";
import { QuestionnaireResolver } from "../modules/questionnaires/resolver";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { error } from "console";

export async function setUpGraphQL(app: any) {
  const schema = await buildSchema({
    resolvers: [QuestionnaireResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    // use ObjectId scalar mapping
    // scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });

  // create mocked context

  const server = new ApolloServer({
    schema,
  });

  // Note you must call `start()` on the `ApolloServer`   server.start().then((server)=>return server)  ;

  // instance before passing the instance to `expressMiddleware`

  await server.start();

  // Specify the path where we'd like to mount our server

  app.use(
    "/graphql",

    expressMiddleware(server),
  );
  // Create GraphQL server
}
