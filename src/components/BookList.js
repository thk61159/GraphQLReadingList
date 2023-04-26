import React from 'react'
import { useQuery } from '@apollo/client'

import { getBooksQuery } from '../queries/queries'

export const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery)
	if (loading) return (<div>Loading...</div>)
	if (error) return <div>Error! {error.message}</div>
  return (
		<div>
			<ul id='book-list'>
				<li>Book name</li>
				{data.books.map(book => (
					<li key={book.id}>{book.name}</li>
				))}
			</ul>
		</div>
	)
}

