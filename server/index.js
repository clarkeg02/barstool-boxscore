const express = require('express')
const cors = require('cors')
const { PORT, MONGO_DB_URL, PAGE_META, API_URL } = require('./constants')
const mongoose = require('mongoose')
mongoose.pluralize(null)
const NBABoxScore = require('./model/nbaBoxScore')
const MLBBoxScore = require('./model/mlbBoxScore')
const NBAService = require('./service/nbaService')
const MLBService = require('./service/mlbService')
const axios = require('axios')
const { queryParams } = require('./common')

const service = {
    nba: NBAService,
    mlb: MLBService
}

console.log(`${MONGO_DB_URL} - Connecting`)

mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true }, async () => {
    console.log(`${MONGO_DB_URL} - Connection Successful`)
    
    const app = express()
    app.use(cors())

    app.get('/meta/index', (req, res) => {
        console.log('GET /meta/index')
        res.json({
            page: PAGE_META
        })
    })

    app.get('/boxscore/:league/:id', async ({ params, query }, res) => {
        const { league, id } = params
        const refresh = query.refresh ? parseInt(query.refresh) : null
        console.log(`GET /boxscore/${league}/${id}${queryParams(query)}`)
        if (service[league]) {
            let data = await service[league].get(id)
            if (data) {
                if (refresh) {
                    let time = new Date()
                    time.setMilliseconds(time.getMilliseconds() - refresh)
                    if (data.updated < time) {
                        let updated = await service[league].refresh(data._id)
                        data = updated ? updated : data
                    }
                }
                res.json(data)
            }
            else {
                res.sendStatus(404)
            }
        }
        else {
            res.sendStatus(404);
        }
    })

    service.nba.refresh()
    service.mlb.refresh()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})