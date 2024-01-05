// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { PrismaClient } from '@prisma/client';
import { createSchema, createYoga } from 'graphql-yoga'
const prisma = new PrismaClient();
const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Movies{
          Id:                Int!,
          Release_Date:      String!,
          Title:             String!,
          Overview:          String!,
          Popularity:        Float!,
          Vote_Count:        Int!,
          Vote_Average:      Float!,
          Original_Language: String!,
          Genre:             String!,
          Poster_Url:        String!,
      }
      type Query {
        movies(take: Int!, skip: Int!): [Movies]
        movie(id: Int!): Movies
        featured: Movies
      }
    `,
    resolvers: {
      Query: {
        movies: (_, args) => { return prisma.movies.findMany({ skip: args.skip, take: args.take }); },
        movie: (_, args) => { return prisma.movies.findUniqueOrThrow({ where: { Id: Number(args.id), } }) },
        featured: () => { return prisma.movies.findFirst({ orderBy: { Id: 'desc' } }) }
      }
    }
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }