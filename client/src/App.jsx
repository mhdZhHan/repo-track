import { Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"

// pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ExplorePage from "./pages/ExplorePage"
import LikesPage from "./pages/LikesPage"

export default function App() {
	return (
		<div className="flex text-white">
			<Sidebar />

			<div className="max-w-5xl my-5 text-white mx-auto transition-all duration-500 flex-1">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/explore" element={<ExplorePage />} />
					<Route path="/likes" element={<LikesPage />} />
				</Routes>
			</div>
		</div>
	)
}
