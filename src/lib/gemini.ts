import { GoogleGenerativeAI } from '@google/generative-ai';
import  StabilityAI  from 'stability-ai'


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


const stability = new StabilityAI(process.env.STABILITY_API_KEY!);

export async function generateImagePrompt(name: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const messages = [
            {
                role: 'system',
                content: `You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into an AI image API to generate a thumbnail. The description should be minimalistic and flat styled.`
            },
            {
                role: 'user',
                content: `Please generate a thumbnail description for the notebook titled "${name}"`
            }
        ];
        const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        const image_description = await response.text();
        return image_description;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

export async function generateImage(image_description: string) {
    try {
        const response = await fetch(
            'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    text_prompts: [{
                        text: `${image_description}, minimalist flat design`,
                        weight: 1.0
                    }],
                    cfg_scale: 7,
                    height: 256,
                    width: 256,
                    steps: 30,
                    samples: 1
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        if (!data?.artifacts?.[0]?.base64) {
            throw new Error("Invalid response format");
        }
        return `data:image/png;base64,${data.artifacts[0].base64}`;

    } catch (error) {
        console.error("Stability AI Error:", error);
        return 'https://via.placeholder.com/256';
    }
}