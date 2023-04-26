import React from 'react'
import { useQuery } from '@apollo/client'
import { getBookQuery } from '../queries/queries'

const BookDetail = ({ bookId }) => {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { id: bookId },
	})

	if (bookId && loading) return <div>Loading...</div>
	if (bookId && error) return <div>Error! {error.message}</div>

	const book = data?.book ||null

	return (
		<div id='book-details'>
			{book ? (
				<div>
					<h2>title: {book.name}</h2>
					<p>genre: {book.genre}</p>
					<p>author: {book.author.name}</p>
					<p>All books by this author:</p>
					<ul className='other-books'>
						{book.author.books.map(item => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>
				</div>
			) : (
				<p>No book selected</p>
			)}
		</div>
	)
}

export default BookDetail
