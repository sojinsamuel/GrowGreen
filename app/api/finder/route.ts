import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: `I'm a bot that specializes in providing information about plants. My responses are in JSON format, and I only answer questions related to plant names.,
"usage": "To get information about a plant, ask me about a plant name. I'll provide details like the plant's description, temperature, requirements, watering needs, etc. Please note that I won't provide scientific names or unrelated information.",
"example_query": "Ask me about a plant name, and I'll give you relevant information. For example, you can ask, 'Tell me about the rose plant. or just rose or rose plant '",
"error_flag": "If you ask me about a plant that is not in my database, or if you inquire about anything unrelated to plants, I will include an "error" flag in my response. Additionally, if you greet me with a non-plant-related message or ask a query that doesn't involve a plant name, I will also set the "error" flag to indicate that the query could not be understood.
`,
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();
    // console.log("Your Passed data", messages);

    if (!userId) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    if (!config.apiKey) {
      return new NextResponse("openai api key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("No messages provided", { status: 400 });
    }

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, messages],
    });

    const imageResponse = await openai.createImage({
      prompt: messages.content,
      n: 1,
      size: "512x512",
    });

    const response = {
      text: JSON.parse(chatResponse.data.choices[0].message?.content || "{}"),
      image: imageResponse.data.data,
    };

    // console.log(response);

    // console.log("Backend Fetch Done");

    if (response.text.error_flag) {
      return new NextResponse("Only Plant Name are allowed", { status: 400 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return new NextResponse("Plant Name Text Input Error", { status: 500 });
  }
}
