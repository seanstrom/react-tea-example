import React from 'react'
import MarkdownPreview from 'react-markdown'

// Initial State
export const init = {
  content: ''
}


// Actions & Action Creators

export const Actions = {
  Change: { type: Symbol('Editor.Change') }
}

export const change = (value) => {
  return Object.assign({}, Actions.Change, { data: value })
}


// Reducer

export const update = (state = {}, action) => {
  if (action.type === Actions.Change.type) {
    return { content: action.data }
  }

  return state
}


// View

const onChange = (dispatch) => (event) => {
  const action = change(event.target.value)
  dispatch(action)
}

export const view = (props) => {
  const { content } = props
  const { dispatch } = props

  return (
    <div className='editor'>
      <textarea className='editor-content' value={content} onChange={onChange(dispatch)} />
      <MarkdownPreview className='editor-preview' source={content} />
    </div>
  )
}
