import * as React from 'react';
import GraphiQLLocal from '../.';
import 'graphiql/graphiql.css';
import { find, filter } from 'lodash';

const typeDefs = `
  type Author {
    id: ID!
    name: String
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String
    author: Author
  }

  type Query {
    posts: [Post]
    author(id: ID!): Author
  }

  type Mutation {
    createPost (
      title: String!
      authorId: ID!
    ): Post
  }
`;

const authors = [
  { id: 'xxx', name: 'Nik Graf' },
  { id: 'yyy', name: 'Max Stoiber' },
];

const posts = [
  { id: 'aaa', title: 'Advanced GraphQL Concepts', authorId: 'xxx' },
  { id: 'bbb', title: 'Why I Write CSS in JavaScript', authorId: 'yyy' },
];

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id }),
  },

  Mutation: {
    createPost: (_, { title, authorId }) => {
      const post = {
        id: Math.random()
          .toString(36)
          .substring(3),
        title,
        authorId,
      };
      posts.push(post);
      return post;
    },
  },

  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },

  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
};

const mutation = `mutation ($title: String!, $authorId: ID!) {
  createPost(title: $title, authorId: $authorId) {
    id,
  }
}
`;

export default function MutationExample() {
  return (
    <div style={{ height: 400, maxWidth: 640 }}>
      <GraphiQLLocal
        query={mutation}
        resolvers={resolvers}
        typeDefs={typeDefs}
        variables={JSON.stringify(
          {
            title: 'Hello World!',
            authorId: 'xxx',
          },
          null,
          2
        )}
      />
    </div>
  );
}
