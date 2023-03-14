import './App.css'

import CommentsList from './components/Comments/CommentsList'
import CommentsForm from './components/Comments/CommentsForm'
import Nav from './components/Nav/Nav'
import useComments from './hooks/useComments'
import Layout from './components/Layout'

function App() {
  // useComments()

  return (
    <div className='App'>
      <div className='container'>
        <Layout />
        <div className='content'>
          <CommentsForm />
          <Nav />
          <CommentsList />
        </div>
      </div>
    </div>
  )
}

export default App
