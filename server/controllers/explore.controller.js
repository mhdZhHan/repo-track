export const explorePopularRepos = async (req, res) => {
	try {
		const { language } = req.params

		const response = await fetch(
			`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
			{
				headers: {
					authorization: `token ${process.env.GITHUB_API_KEY}`,
				},
			}
		)
		const { items: repos } = await response.json()
		res.status(200).json({ success: true, repos })
	} catch (error) {
		console.log("Error in explorePopularRepos controller", error)
		res.status(500).json({
			success: false,
			message: "server error",
			error: error?.message,
		})
	}
}
