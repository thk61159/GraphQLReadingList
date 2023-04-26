import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { getAuthorsQuery, addBookMutation } from '../queries/queries'
const AddBook = () => {
	const [name, setName] = useState('')
	const [genre, setGenre] = useState('')
	const [authorId, setAuthorId] = useState('unselect')
	const {
		loading,
		error,
		data,
	} = useQuery(getAuthorsQuery)
	const [addBook, { data: bookData, loading: bookLoading, error: bookError }] =
		useMutation(addBookMutation, {
			onError: bookError => console.log(`Mutation error: ${bookError}`),
			onCompleted: bookData => console.log(`Mutation completed: ${bookData}`),
		})

	const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      if (!name) throw new Error('book must has name')
      if (!genre) throw new Error('book must has genre')
      if (authorId === 'unselect') throw new Error('book must has author')
        await addBook({ variables: { name, genre, authorId } })
        setName('')
        setGenre('')
        setAuthorId('')
    } catch (error) {
        console.log(`Error adding book: ${error.message}`)
    }
	}
	if (loading) return <div>Loading...</div>
	if (error)
		return <div>Error! {error.message}</div>
	return (
		<form id='add-book' onSubmit={handleAddBook}>
			<div className='field'>
				<label>Book name:</label>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</div>
			<div className='field'>
				<label>Genre:</label>
				<input
					type='text'
					value={genre}
					onChange={e => setGenre(e.target.value)}
				/>
			</div>
			<div className='field'>
				<label>Author:</label>
				<select
					onChange={e => {
						setAuthorId(e.target.value)
					}}>
					<option>select author</option>
					{data.authors.map(author => (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					))}
				</select>
			</div>
			{/* when the form is in a loading state to prevent the user from clicking the button multiple times */}
			<button disabled={loading}>+</button>
		</form>
	)
}

export default AddBook
