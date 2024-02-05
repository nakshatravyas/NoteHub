import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
export default function NoteItem({ note }) {
    const formatter = buildFormatter(englishStrings)
    return (
        
        <Link to={`editnote/${note._id}`} className='note'>
            <h4>{note.title.length > 40 ? (note.title.substr(0, 40)) + '...' : note.title}</h4>
            <h4>{note.content.length > 40 ? (note.content.substr(0, 80)) + '...' : note.content}</h4>
            <p><TimeAgo date={note.date} formatter={formatter} /></p>
        </Link>
        
        
    )
}