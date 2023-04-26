import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import BookDetail from './BookDetail'

import { getBooksQuery } from '../queries/queries'

export const BookList = () => {
	const [bookId, setBookId] = useState()
	const { loading, error, data } = useQuery(getBooksQuery)
	if (loading) return <div>Loading...</div>
	if (error) return <div>Error! {error.message}</div>
	return (
		<div>
			<ul id='book-list'>
				{data.books.map(book => (
					<li key={book.id} onClick={() => setBookId(book.id)}>{book.name}</li>
				))}
			</ul>
			<BookDetail bookId={ bookId} />
		</div>
	)
}
