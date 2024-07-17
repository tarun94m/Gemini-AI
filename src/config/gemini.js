//npm install @google/generative-ai

import { GoogleGenerativeAI, 
    HarmBlockThreshold, 
    HarmCategory } from "@google/generative-ai";

const MODEL_NAME="gemini-1.0-pro";
const API_KEY="AIzaSyDZIiIKzfVLwOQhFN0pjhbU1o3aJ9Uv3w8";

async function run(prompt) {
  // For embeddings, use the embedding-001 model
  
  const genAI=new GoogleGenerativeAI(API_KEY);
  const model=genAI.getGenerativeModel({model: MODEL_NAME});

  const generationConfig = {
    maxOutputTokens: 2048,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

  const safetySettings = [
    
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      }
  ];

  const chat=model.startChat({
    generationConfig, 
    safetySettings,
    history:[],
  });

  const result=await chat.sendMessage(prompt);
  const response=result.response;
  console.log(response.text());
  return response.text();
}

export default run;