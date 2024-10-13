import { Link } from "react-router-dom"
import { Home, Heart, Telescope, LogIn, UserRoundPlus } from "lucide-react"

import Logout from "./Logout"

const Sidebar = () => {
	const authUser = true
	return (
		<aside
			className="flex flex-col items-center min-w-12 sm:w-16 h-screen sticky top-0 left-0 py-8 overflow-y-auto border-r bg-glass"
		>
			<nav className="h-full flex flex-col gap-3">
				<Link to="/" className="flex justify-center">
					<img className="h-8" src="/github.svg" alt="Github logo" />
				</Link>

				<Link
					to="/"
					className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
				>
					<Home size={25} />
				</Link>

				{authUser && (
					<Link
						to="/likes"
						className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
					>
						<Heart size={25} />
					</Link>
				)}

				{authUser && (
					<Link
						to="/explore"
						className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
					>
						<Telescope size={25} />
					</Link>
				)}

				{!authUser && (
					<>
						<Link
							to="/login"
							className="p-1.5 flex justify-center focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-800"
						>
							<LogIn size={25} />
						</Link>

						<Link
							to="/signup"
							className="p-1.5 flex justify-center focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-800"
						>
							<UserRoundPlus size={25} />
						</Link>
					</>
				)}

				{authUser && (
					<div className="flex flex-col gap-2 mt-auto">
						<Logout />
					</div>
				)}
			</nav>
		</aside>
	)
}
export default Sidebar
