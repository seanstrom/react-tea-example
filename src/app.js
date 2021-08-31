import React from 'react'
import { connect } from 'react-redux'
import { combineReducers } from 'redux'
import * as Editor from './editor'
import * as Images from './images'


export const init = {
  editor: Editor.init,
  images: Images.init
}


export const update = combineReducers({
  editor: Editor.update
})


const Header = (props) => (
  <header className='app-header'>
    <nav className='app-header-nav'>
      <a className='app-header-nav-link'>Markdown Editor</a>
      <a className='app-header-nav-link'>Images List</a>
    </nav>
  </header>
)


const view = (props) => {
  const { dispatch } = props

  return (
    <div className='app'>
      <Header />
      <Images.view dispatch={dispatch} { ...props.images } />
    </div>
  )
}


const mapState = (state) => state

export const container = connect(mapState)(view)
