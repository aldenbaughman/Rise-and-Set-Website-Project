import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 8888

//NEED TO SETUP MONGO DB
//const mongourl = process.env.MONGO_URL
//const mongoclient = new MongoClient(mongourl, {})

const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
                        When asked to name a city and give a description, list the name of the city followed by the country it
                        belongs to, then place a | character bettween the name and a 50 word description of the town
                       `
})


//"Please tell me the name of the city at the following latitude longitude coordinates as well as a short description of the city: 42.361145, -71.057083"   
app.post('/chat', async (req, res) => {
    const userInput = req.body.userInput
    console.log("[BACKEND] userInput: " + userInput)
    let responseMessage
    try {
        //const result = await model.generateContent(userInput)
        const result = await model.generateContent(userInput)
        responseMessage = result.response.text()
    } catch(e){
        console.log(e)
        responseMessage = 'Something went wrong!'
    }
    res.json({
        message: responseMessage
    })
    
    console.log("[BACKEND] responseMessage: " + responseMessage)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})  