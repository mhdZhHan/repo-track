import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"

import Search from "../components/Search"
import SortRepos from "../components/SortRepos"
import ProfileInfo from "../components/ProfileInfo"
import Repos from "../components/Repos"
import Spinner from "../components/Spinner"

const HomePage = () => {
	const [userProfile, setUserProfile] = useState(null)
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)

	const [sortType, setSortType] = useState("fork")

	const getUserProfileAndRepos = useCallback(async () => {
		setLoading(true)
		try {
			const userResponse = await fetch(
				`https://api.github.com/users/mhdZhHan`
			)
			const userProfile = await userResponse.json()
			setUserProfile(userProfile)

			const userRepos = await fetch(userProfile.repos_url)
			const repos = await userRepos.json()
			setRepos(repos)

			console.log(userProfile)
			console.log(repos)
		} catch (error) {
			toast.error(error.message || "Something went wrong.")
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		getUserProfileAndRepos()
	}, [getUserProfileAndRepos])

	return (
		<div className="m-4">
			<Search />
			<SortRepos />
			<div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
				{userProfile && !loading && (
					<ProfileInfo userProfile={userProfile} />
				)}

				{repos.length > 0 && !loading && <Repos repos={repos} />}

				{loading && <Spinner />}
			</div>
		</div>
	)
}
export default HomePage
