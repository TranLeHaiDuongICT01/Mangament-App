const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/connectDB')

const app = express()

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
})

