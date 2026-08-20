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
   Gemini Retry Configuration
========================================== */

const MAX_RETRIES = 3;

const RETRY_DELAYS = [
  1000,
  2500,
  5000,
];

/* ==========================================
   Wait Helper
========================================== */

const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

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
       Gemini Request Configuration
    ======================================== */

    const url =
      `${API_URL}/${process.env.GEMINI_MODEL}` +
      `:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    /* ========================================
       Retry Loop
    ======================================== */

    let lastError = null;

    for (
      let attempt = 0;
      attempt <= MAX_RETRIES;
      attempt++
    ) {
      try {
        console.log(
          `🤖 Gemini request attempt ${
            attempt + 1
          }/${MAX_RETRIES + 1}`
        );

        const response =
          await axios.post(
            url,
            requestBody,
            {
              timeout: 60000,
            }
          );

        /* ====================================
           Extract Response
        ==================================== */

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

        console.log(
          "✅ Gemini response received"
        );

        return {
          success: true,
          text,
        };
      } catch (err) {
        lastError = err;

        const status =
          err.response?.status;

        const errorData =
          err.response?.data;

        console.error(
          `❌ Gemini attempt ${
            attempt + 1
          } failed:`,
          errorData ||
            err.message
        );

        /* ====================================
           Retry Only Temporary Errors
        ==================================== */

        const shouldRetry =
          status === 503 ||
          status === 429 ||
          status === 500 ||
          status === 502 ||
          status === 504;

        /*
         * Don't retry authentication,
         * invalid request, or other permanent
         * errors.
         */

        if (
          !shouldRetry ||
          attempt === MAX_RETRIES
        ) {
          break;
        }

        const delay =
          RETRY_DELAYS[attempt] ||
          5000;

        console.log(
          `⏳ Gemini temporarily unavailable.` +
          ` Retrying in ${delay / 1000}s...`
        );

        await wait(delay);
      }
    }

    /* ========================================
       Final Error
    ======================================== */

    const finalStatus =
      lastError?.response?.status;

    const finalMessage =
      lastError?.response?.data?.error
        ?.message ||
      lastError?.message ||
      "Gemini request failed.";

    if (finalStatus === 503) {
      return {
        success: false,
        error:
          "Gemini is temporarily overloaded. Please try again in a moment.",
        status: 503,
      };
    }

    if (finalStatus === 429) {
      return {
        success: false,
        error:
          "Gemini request limit reached. Please try again shortly.",
        status: 429,
      };
    }

    return {
      success: false,
      error: finalMessage,
      status: finalStatus,
    };
  } catch (err) {
    console.error(
      "Gemini Service Error:",
      err
    );

    return {
      success: false,
      error:
        err.message ||
        "Failed to generate AI response.",
    };
  }
};

export default generateAIResponse;