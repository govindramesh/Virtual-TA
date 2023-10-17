# Virtual-TA

## Inspiration
Making sense of all the information thrown at the student during online lectures can be difficult, and oftentimes we find ourselves wanting to ask our teachers questions, but having to ask our peers to fill in the gaps of information we missed or look things up on the internet. However, these sources are either not available or not reliable and oftentimes adds to the noise rather than clarify confusion.

## What it does
Enter the Virtual TA. Our application provides an overlay for students to record audio from any source, whether that be a Zoom lecture or youtube video essay, and live transcribes this audio into dynamically updated notes and a knowledge base that the student can ask questions to via an AI chat interface. It is simple and easy to use, with the chatbot and notes being easily accessible through an overlay on the screen.

## How we built it
We developed the application using Electron, React, and Node.js. Transcribed audio with OpenAI Whisper and stored vector embeddings of live content using Pinecone to create a
dynamic knowledge base for Retrieval Augmented Generation for the chatbot, and LangChain to create agents for LLMs. MongoDB was used to store our other information for the application.
