export const getUserProfileAndRepos = async (req, res) => {
	try {
		const { username } = req.params

		const userResponse = await fetch(
			`https://api.github.com/users/${username}`,
			{
				headers: {
					authorization: `token ${process.env.GITHUB_API_KEY}`,
				},
			}
		)
		const userProfile = await userResponse.json()

		const userRepos = await fetch(userProfile.repos_url, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		})
		const repos = await userRepos.json()

		res.status(200).json({ success: true, userProfile, repos })
	} catch (error) {
		console.log("Error in getUserProfileAndRepos controller", error)
		res.status(500).json({
			success: false,
			message: "server error",
			error: error?.message,
		})
	}
}
