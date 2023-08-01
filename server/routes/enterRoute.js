import express from 'express'

const main_router = express.Router()

main_router.get('/', (req, res) => {
       res.status(200).json("Yay Server is up and running")
})

export default main_router