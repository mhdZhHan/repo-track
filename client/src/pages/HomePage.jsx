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

	const [sortType, setSortType] = useState("recent")

	const getUserProfileAndRepos = useCallback(
		async (username = "mhdZhHan") => {
			setLoading(true)
			try {
				const userResponse = await fetch(
					`https://api.github.com/users/${username}`
				)
				const userProfile = await userResponse.json()
				setUserProfile(userProfile)

				const userRepos = await fetch(userProfile.repos_url)
				const repos = await userRepos.json()

				repos.sort(
					(a, b) => new Date(b.created_at) - new Date(a.created_at)
				) //descending, recent first
				setRepos(repos)

				return { userProfile, repos }
			} catch (error) {
				toast.error(error.message || "Something went wrong.")
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	const onSearch = async (evt, username) => {
		evt.preventDefault()

		setLoading(true)
		setUserProfile(null)
		setRepos([])

		const { userProfile, repos } = await getUserProfileAndRepos(username)
		setUserProfile(userProfile)
		setRepos(repos)

		setLoading(false)
		setSortType("recent")
	}

	const onSort = (sortType) => {
		if (sortType === "recent") {
			repos.sort(
				(a, b) => new Date(b.created_at) - new Date(a.created_at)
			) //descending, recent first
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count) //descending, most stars first
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count) //descending, most forks first
		}
		setSortType(sortType)
		setRepos([...repos])
	}

	useEffect(() => {
		getUserProfileAndRepos()
	}, [getUserProfileAndRepos])

	return (
		<div className="m-4">
			<Search onSearch={onSearch} />
			{repos.length > 0 && (
				<SortRepos sortType={sortType} onSort={onSort} />
			)}
			<div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
				{userProfile && !loading && (
					<ProfileInfo userProfile={userProfile} />
				)}

				{!loading && <Repos repos={repos} />}

				{loading && <Spinner />}
			</div>
		</div>
	)
}
export default HomePage
