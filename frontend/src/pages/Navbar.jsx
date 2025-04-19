import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Wild-Play</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/bookings" className="text-gray-700 hover:text-blue-500">Bookings</Link>
      </div>
    </nav>
  )
}

export default Navbar
