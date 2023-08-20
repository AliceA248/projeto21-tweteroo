import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const tweets = [] 
const users = []    

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if (!username || typeof username !== "string" || !avatar || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    users.push({ username, avatar })
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const { tweet } = req.body
    const { user } = req.headers

    if (!user || typeof user !== "string" || !tweet || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }


    const userExists = users.find((u) => u.username === user)

    if (!userExists) return res.status(401).send("UNAUTHORIZED")

    tweets.push({ username: user, tweet })
    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {
    const page = Number(req.query.page)

    if (req.query.page && (isNaN(page) || page < 1)) {
        return res.status(400).send("Informe uma página válida!")
    }

    const completeTweets = tweets.map((tweet) => {
        const user = users.find((u) => u.username === tweet.username)
        return { ...tweet, avatar: user.avatar }
    })

    if (page) {
        const limit = 10
        const start = (page - 1) * limit
        const end = page * limit

        return res.send(completeTweets.slice(start, end))
    }

    res.send(completeTweets.slice(-10))
})

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params

    const filteredTweets = tweets
        .filter((tweet) => tweet.username === username)
        .map((tweet) => {
            const user = users.find((u) => u.username === tweet.username)
            return { ...tweet, avatar: user.avatar }
        })

    res.send(filteredTweets)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Rodando servidor na porta ${PORT}`))