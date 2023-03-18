import useCommentsForm from '../../hooks/useCommentsForm'

export default function Nav() {
  const { handleSortComments, sortState } = useCommentsForm()

  return (
    <nav className='nav-bar'>
      <button className={`nav-button ${sortState === 'main' && 'nav-button-active'}`} onClick={() => handleSortComments('main')}>
        Main
      </button>
      <button className={`nav-button ${sortState === 'trends' && 'nav-button-active'}`} onClick={() => handleSortComments('trends')}>
        Trends
      </button>
    </nav>
  )
}
