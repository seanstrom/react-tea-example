import React from 'react'
import axios from 'axios'
import { lifecycle } from 'recompose'


// Data

const Images = {
  Loading: { type: Symbol('State.Loading') },
  Images: (data) => ({ data, type: Symbol('State.Loading') }),
  Error: (data) => ({ data, type: Symbol('State.Error') })
}


// Initial State

export const init = {
  images: [],
  loading: true,
  error: null
}


// Actions & Action Creators

export const Actions = {
  Fetch: { type: Symbol('Images.Fetch') },
  Success: { type: Symbol('Images.Success') },
  Failure: { type: Symbol('Images.Failure') }
}

const success = (value) => {
  return Object.assign({}, Actions.Success, {
    data: value
  })
}

const failure = (value) => {
  return Object.assign({}, Actions.Failure, {
    data: value
  })
}

export const fetch = (dispatch) => {
  dispatch(Actions.Fetch)

  axios.get('https://picsum.photos/list')
    .then((images) => {
      const action = success(images.data)
      dispatch(action)
    })
    .catch((error) => {
      const action = failure(error)
      dispatch(action)
    })
}


// Reducer

export const update = (state = {}, action) => {
  if (action.type === Actions.Fetch.type) {
    return Object.assign({}, state, {
      loading: true
    })
  }

  if (action.type === Actions.Success.type) {
    return Object.assign({}, state, {
      images: action.data
    })
  }

  if (action.type === Actions.Failure.type) {
    return Object.assign({}, state, {
      error: action.data
    })
  }

  return state
}


// View

// {
//   "format": "jpeg",
//   "width": 5616,
//   "height": 3672,
//   "filename": "0009_ABDTiLqDhJA.jpeg",
//   "id": 9,
//   "author": "Alejandro Escamilla",
//   "author_url": "https://unsplash.com/@alejandroescamilla",
//   "post_url": "https://unsplash.com/photos/ABDTiLqDhJA"
// }

const Image = (props) => {
  console.log(props.height)
  console.log(props.width)
  return (
    <div>
      <img src={`//picsum.photos/${props.filename}`} alt=""/>
    </div>
  )
}

const view = (props) => {
  const { images, loading, error } = props
  const { dispatch } = props

  if (loading) {}
  if (error) {}

  return (
    <div className='images'>
      { images.slice(0, 5).map((image, index) => {
        return (<Image key={index} {...image}/>)
      }) }
    </div>
  )
}

const viewWithData = lifecycle({
  componentDidMount() {
    this.props.dispatch(fetch)
  }
})(view)


export { viewWithData as view }
