import User from "../models/user.model.js"

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

export const likeProfile = async (req, res) => {
	try {
		const { username } = req.params
		const user = await User.findById(req.user._id.toString())
		console.log(user, "auth user")
		const userToLike = await User.findOne({ username })

		if (!userToLike) {
			return res.status(404).json({ error: "User is not a member" })
		}

		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({ error: "User already liked" })
		}

		userToLike.likedBy.push({
			username: user.username,
			avatarUrl: user.avatarUrl,
			likedDate: Date.now(),
		})
		user.likedProfiles.push(userToLike.username)

		// await userToLike.save()
		// await user.save()
		await Promise.all([userToLike.save(), user.save()])

		res.status(200).json({ message: "User liked" })
	} catch (error) {
		console.log("Error in likeProfile controller", error)
		res.status(500).json({
			success: false,
			message: "server error",
			error: error?.message,
		})
	}
}

export const getLikes = async (req, res) => {
	try {
		const user = await User.findById(req.user._id.toString())
		res.status(200).json({ likedBy: user.likedBy })
	} catch (error) {
		console.log("Error in getLikes controller", error)
		res.status(500).json({
			success: false,
			message: "server error",
			error: error?.message,
		})
	}
}
