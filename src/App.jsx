import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <>
    <div className='flex justify-between flex-col lg:flex-row max-w-7xl mx-auto lg:p-4 md:p-3 p-1'>
      <div className='flex gap-3 items-center justify-center'>
        <img className='w-16' src="/img/logo.png" alt="Logo zootique" />
        <span className='font-medium'>Zootique</span>
      </div>
      <nav className='flex gap-4 justify-center items-center'>
        <Link to="/" className="font-medium border-b-2 border-b-transparent hover:border-amber-300 transition-all duration-200 flex justify-center">Home</Link>
        <Link to="/login" className="font-medium border-b-2 border-b-transparent hover:border-amber-300 transition-all duration-200 flex justify-center">Login</Link>
        <Link to="/register" className="font-medium border-b-2 border-b-transparent hover:border-amber-300 transition-all duration-200 flex justify-center">Register</Link>
      </nav>
    </div>

      {}
      <Outlet />
    </>
    
  )
}

export default App