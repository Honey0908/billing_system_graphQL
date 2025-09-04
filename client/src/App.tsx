import { useQuery } from '@tanstack/react-query';
import { graphql } from './graphql';
import { execute } from './graphql/execute';

const meQuery = graphql(`
  query meQuery {
    me {
      name
    }
  }
`);
const App = () => {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => execute(meQuery),
  });

  console.log(data?.me?.name);

  return <div className="text-red-200">hello world</div>;
};

export default App;
