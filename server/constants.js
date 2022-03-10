const PORT = 5000

const MONGO_DB_URL = 'mongodb+srv://barstool:sports@cluster0.8wjeg.mongodb.net/boxscores?retryWrites=true&w=majority';

const PAGE_META = { 
    "hostname" : "www.barstoolsports.com", 
    "title" : "Barstool BoxScore", 
    "ogTitle" : "Barstool BoxScore",
    "ogUrl" : "https://boxscore.barstoolsports.com/", 
    "ogImage" : "https://www.barstoolsports.com/static/images/logo.png", 
    "path" : "/", 
    "description" : "BoxScore Challenge for the Senior Full-Stack Engineering Position at Barstool Sports"
}

const API_URL = {
    NBA: "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json",
    MLB: "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json"
}

module.exports = { PORT, MONGO_DB_URL, PAGE_META, API_URL }