import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import RenderRoutes from "./Routes";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_SERVER_URL + '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <RenderRoutes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
