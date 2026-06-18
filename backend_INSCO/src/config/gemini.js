const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log(
    "API GEMINI:",
    process.env.GEMINI_API_KEY?.substring(0,15)
);
const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



module.exports = genAI;