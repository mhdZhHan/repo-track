import { LogOut } from "lucide-react"
import { useAuthContext } from "../contexts/AuthContext"
import toast from "react-hot-toast"

const Logout = () => {
	const { authUser, setAuthUser } = useAuthContext()

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/auth/logout", {
				credentials: "include",
			})
			const data = await response.json()

			console.log(data)
			setAuthUser(null)
		} catch (error) {
			toast.error(error?.message || "Something went wrong")
		}
	}
	return (
		<>
			<img
				src={authUser?.avatarUrl}
				className="w-10 h-10 rounded-full border border-gray-800"
			/>

			<div
				className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800"
				onClick={handleLogout}
			>
				<LogOut size={25} />
			</div>
		</>
	)
}
export default Logout
