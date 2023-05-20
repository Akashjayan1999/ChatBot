import dotenv from 'dotenv'

dotenv.config()

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getReply = async (req,res)=>{
    try {
        const {text} = req.body
        console.log(text)
        const {data} = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            
        })
        console.log(data)
        if (data) { 
            if (data.choices[0].text) {
              return res.status(200).json(data.choices[0].text);
            }    
          }  
    } catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error ',
           error 
       }) 
    }
   } 

