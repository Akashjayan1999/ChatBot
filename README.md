# ChatBot

create a .env file in root folder
PORT = 8080
DEV_MODE = development
MONGO_URL = paste mongodb url
JWT_SECRET = 
OPENAI_API_KEY=paste openai key





replace openaiController with below code for gpt-3.5-turbo



import dotenv from 'dotenv'

dotenv.config()

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getReply = async (req,res)=>{
    try {
      const history = [];
        const {text} = req.body
        const user_input = text
        const messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    } 
    messages.push({ role: "user", content: user_input });
    const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: messages,
        });
        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text)
        if (completion_text) { 
            
              return res.status(200).json(completion_text); 
           
          }  
          history.push([user_input, completion_text]);
    } catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error ',
           error 
       }) 
    }
   } 
