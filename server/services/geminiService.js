import axios from "axios";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

/* ==========================================
   System Prompt
========================================== */

const SYSTEM_PROMPT = `
You are BlogGPT, a professional AI blog writing assistant.

Your job is to write high-quality blogs exactly according to the user's request.

Rules:

- Never change the topic.
- Never guess another topic.
- If the user asks about AI, Artificial Intelligence, React, JavaScript, Python, etc., answer exactly that topic.
- Do not autocorrect words into company or product names.
- If the prompt is short, expand it into a complete professional blog.
- Return the response in Markdown.
- Use:
  - A catchy title
  - Introduction
  - Proper headings
  - Bullet points
  - Examples
  - Conclusion
`;

/* ==========================================
   Generate AI Response
========================================== */

const generateAIResponse = async (
  messages = [],
  settings = {}
) => {
  try {
    if (!messages.length) {
      return {
        success: false,
        error: "No messages provided.",
      };
    }

    const latestMessage =
      messages[messages.length - 1];

    const latestPrompt =
      latestMessage?.content || "";

    if (!latestPrompt.trim()) {
      return {
        success: false,
        error: "Message is empty.",
      };
    }

    /* ========================================
       Generation Settings
    ======================================== */

    const {
      category = "Technology",
      tone = "Professional",
      length = "1000 Words",
      language = "English",
    } = settings;

    /* ========================================
       Language Instruction
    ======================================== */

    const languageInstruction = `
IMPORTANT LANGUAGE REQUIREMENT:

Write the entire blog in ${language}.

The title, introduction, headings,
subheadings, explanations, examples,
bullet points, and conclusion must all
be written in ${language}.

Do not write the blog in English unless
the selected language is English.

Do not translate only the title.
The complete generated blog must use
${language}.
`;

    /* ========================================
       Blog Length
    ======================================== */

    const lengthInstruction = `
BLOG LENGTH:

Target approximately ${length}.

Follow the selected length as closely
as possible while maintaining quality,
readability, and completeness.
`;

    /* ========================================
       Complete Prompt
    ======================================== */

    const prompt = `
${SYSTEM_PROMPT}

${languageInstruction}

${lengthInstruction}

GENERATION SETTINGS:

Category:
${category}

Tone:
${tone}

Selected Language:
${language}

USER REQUEST:

"${latestPrompt}"

REQUIREMENTS:

- Write a complete professional blog.
- Follow the requested topic exactly.
- Do not change or reinterpret the topic.
- Use Markdown.
- Include a catchy title.
- Include an introduction.
- Use clear headings and subheadings.
- Include bullet points where appropriate.
- Include useful examples where appropriate.
- Maintain the selected ${tone} tone.
- Keep the content related to the ${category} category.
- End with a conclusion.
- The entire response must be written in ${language}.
`;

    /* ========================================
       Gemini Request
    ======================================== */

    const response =
      await axios.post(
        `${API_URL}/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

    /* ========================================
       Extract Response
    ======================================== */

    const text =
      response.data
        ?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text;

    if (!text) {
      return {
        success: false,
        error:
          "Gemini returned an empty response.",
      };
    }

    return {
      success: true,
      text,
    };
  } catch (err) {
    console.error(
      "Gemini REST Error:",
      err.response?.data ||
        err.message
    );

    return {
      success: false,
      error:
        err.response?.data?.error
          ?.message ||
        err.message,
    };
  }
};

export default generateAIResponse;