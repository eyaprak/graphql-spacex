const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const dotenv = require('dotenv')
const schema = require('./schema');
const cors = require('cors')
const path = require('path')

app.use(cors())

dotenv.config()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));