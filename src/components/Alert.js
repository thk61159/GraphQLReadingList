import React from 'react'


import { ReactComponent as Warn } from '../svg/notification_warning.svg'
import { ReactComponent as Error } from '../svg/notification_error.svg'
import { ReactComponent as Suc } from '../svg/notification_success.svg'
const arr = {
	notify: (
		<div className={'note-c-blue'}>
			<Warn className={'svgsvg'} />
		</div>
	),
	warn: (
		<div className={'note-c-yellow'}>
			<Warn className={'svgsvg'} />
		</div>
	),
	error: (
		<div className={'note-c-red'}>
			<Error className={'svgsvg'} />
		</div>
	),
	suc: (
		<div className={'note-c-green'}>
			<Suc className={'svgsvg'} />
		</div>
	),
}

const Alert = ({ alertNote, alertType }) => {
  
	return (	
			<div className={'alert'}>
				<div className={'alert-c'}>
					<p className={'alert-p'}>{alertNote}</p>
					{arr[alertType]}
				</div>
			</div>
		
 	)
 }

export default Alert
