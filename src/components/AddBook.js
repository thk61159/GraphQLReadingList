import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import Alert from './Alert'
import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'
const AddBook = () => {
	const [name, setName] = useState('')
	const [genre, setGenre] = useState('')
  const [authorId, setAuthorId] = useState('unselect')
	const [alert, setAlert] = useState(false)
	const { refetch } = useQuery(getBooksQuery)
	const { loading, error, data } = useQuery(getAuthorsQuery)
	const [addBook] = useMutation(addBookMutation, {
		onError: error => console.log(`Mutation error: ${error}`),
		onCompleted: data => {
			console.log(`Mutation completed: ${data}`)
			refetch() // refetch getBooksQuery query after book is added
		},
		
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
        setAuthorId('unselect')
		} catch (error) {
			setAlert({ note: error.message, type: 'error' })
      console.log(`Error adding book: ${error.message}`)
    }
	}
	if (loading) return <div>Loading...</div>
	if (error) return <div>Error! {error.message}</div>
	return (
		<>
			{alert && (
				<div onClick={() => setAlert(false)}>
					<Alert alertNote={alert?.note} alertType={alert?.type} />
				</div>
			)}
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
						}}
						value={authorId}>
						<option value='unselect'>Select author</option>

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
		</>
	)
}

export default AddBook
