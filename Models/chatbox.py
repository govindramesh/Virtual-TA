from typing import Any

import uvicorn
from fastapi import FastAPI, Body
from pydantic import BaseModel

from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.llms import OpenAI
import pinecone
from langchain.vectorstores import Pinecone

app = FastAPI()

# initialize the agent (we need to do this for the callbacks)
embed = HuggingFaceEmbeddings(model_name="all-mpnet-base-v2")

YOUR_API_KEY = "278cc733-9151-48dc-8a00-21f445f8f38f"
YOUR_ENV = "gcp-starter"

index_name = 'virtual-ta'
pinecone.init(
    api_key=YOUR_API_KEY,
    environment=YOUR_ENV
)

index = pinecone.Index(index_name)
vectorstore = Pinecone(
    index, embed.embed_query, "text"
)


prompt_template = """Use the following pieces of context to answer the question at the end.

{context}

Question: {question}?
"""
PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)

chain_type_kwargs = {"prompt": PROMPT}

qa = RetrievalQA.from_chain_type(
    llm=OpenAI(openai_api_key="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"),
    chain_type="stuff",
    chain_type_kwargs = chain_type_kwargs,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 2})
)

# request input format
class Query(BaseModel):
    text: str


@app.post("/chat")
async def chat(
    query: Query = Body(...),
):
    response = qa.run(query.text)
    return response

@app.get("/health")
async def health():
    """Check the api is running"""
    return {"status": "🤙"}
    

if __name__ == "__main__":
    uvicorn.run(
        "chatbox:app",
        host="localhost",
        port=8000,
        reload=True
    )