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
const getBookQuery = gql`
	query($id:ID!){
		book(id:$id) {
			id
			name
			genre
			author{
				id
				name
				age
				books{
					id
					name
				}
			}
		}
	}
`

const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
		}
	}
`
export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery }