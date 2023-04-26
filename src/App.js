import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} from '@apollo/client'

import { BookList } from './components/BookList'
import AddBook from './components/AddBook'

// setup apollo client
const client = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQL_API,
	cache: new InMemoryCache(),
})
function App() {
  return (
		<ApolloProvider client={client}>
			<div id='main'>
				<h1>Reading List</h1>
				<BookList />
				<AddBook/>
			</div>
		</ApolloProvider>
	)
}

export default App;
