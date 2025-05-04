import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateImagePrompt(name: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Convert OpenAI-style messages to Gemini format
        const messages = [
            {
                role: 'system',
                content: `You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALL-E API to generate a thumbnail. The description should be minimalistic and flat styled`
            },
            {
                role: 'user',
                content: `Please generate a thumbnail description for the notebook titled ${name}`
            }
        ];

        // Combine messages into a single prompt (similar to how OpenAI handles it)
        const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        const image_description = response.text();
        return image_description;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

export async function generateImage() {
    // Implementation remains the same
}