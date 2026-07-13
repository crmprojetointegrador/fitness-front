import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="w-full bg-linear-to-r from-[#C9EED9] to-[#FFFFFF] flex-col items-center px-8 py-4 shadow-md">
            <div className="w-full flex justify-between items-center">
                <Link to='/home' className="text-3xl font-bold text-gray-800">
                    🏋️ PowerPlace 🏋️
                </Link>

                <div className='flex gap-6 items-center text-gray-700'>
                    <Link to='/home' className='hover:text-green-700 transition'>Home</Link>
                    <Link to='/categorias' className='hover:text-green-700 transition'>Categorias</Link>
                    <Link to='/imc' className='hover:text-green-700 transition'>Calcule seu IMC</Link>
                </div>
            </div>
        </div>
    );
}


export default Navbar;