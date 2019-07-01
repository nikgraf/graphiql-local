import * as React from 'react';
import GraphiQLLocal from '../.';
import 'graphiql/graphiql.css';
import { find, filter } from 'lodash';

const typeDefs = `
  type Author {
    id: ID!
    name: String
  }

  type Query {
    author(id: ID!): Author
  }
`;

const authors = [
  { id: 'xxx', name: 'Nik Graf' },
  { id: 'yyy', name: 'Max Stoiber' },
];

const resolvers = {
  Query: {
    author: (_, { id }) => find(authors, { id }),
  },
};

const queryWithVariable = `query($id: ID!) {
  author(id: $id) {
    name
  }
}
`;

export default function VariablesExample() {
  return (
    <div style={{ height: 400, maxWidth: 640 }}>
      <GraphiQLLocal
        query={queryWithVariable}
        resolvers={resolvers}
        typeDefs={typeDefs}
        variables={JSON.stringify(
          {
            id: 'xxx',
          },
          null,
          2
        )}
      />
    </div>
  );
}
