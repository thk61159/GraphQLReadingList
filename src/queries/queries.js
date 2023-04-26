import { gql } from '@apollo/client'

const getAuthorsQuery = gql`
	{
		authors {
			id
			name
			age
		}
	}
`

const getBooksQuery = gql`
	{
		books {
			id
			name
			genre
		}
	}
`

const addBookMutation = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
		}
	}
`
export { getAuthorsQuery, getBooksQuery, addBookMutation }