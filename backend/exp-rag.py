#!/usr/bin/env python
# coding: utf-8

# In[1]:



# In[2]:


# -0.2.11


# In[3]:


# 0.2.10


# In[4]:


# 0.0.3


# In[5]:


# In[ ]:





# In[6]:


import numpy as np
import matplotlib.pyplot as plt
import torch
from transformers import pipeline
import json
import pandas as pd


# In[7]:


from langchain.docstore.document import Document
from langchain_huggingface import HuggingFaceEmbeddings
from pinecone import Pinecone, ServerlessSpec
from transformers import AutoModelForCausalLM, AutoTokenizer
from langchain import PromptTemplate, LLMChain
from langchain.chains import RetrievalQA
from langchain.vectorstores import Pinecone as PineconeVectorStore
from transformers import pipeline
from langchain.llms.base import LLM


# In[8]:


from langchain.memory import ConversationBufferMemory


# In[9]:


from langchain.vectorstores.base import VectorStoreRetriever
from langchain.schema import Document
from pydantic import Field
from typing import List


# In[10]:


from nltk.tokenize import sent_tokenize
from langchain.docstore.document import Document


# In[ ]:





# In[12]:


text = """The rapid advancements in artificial intelligence (AI) bring benefits and problems to user interface (UI) design. Human-Computer Interaction(HCI) concept has been a fundamental part of human and AI interaction for more than two decades given the advancement of AI and its growing applications in human-centric fields. The consolidation of AI with HCI design and Human-Centered Artificial Intelligence (HCAI) offers improved User experience (UX) interactions. This thesis research discusses issues in implementing HCI in the development of AI interfaces, including algorithmic decision-making, and addressing automation bias, which occurs when people over trust and blindly embrace computer-based assistance. The thesis also presents an assessment of the current state of human-centered AI difficulties encountered by Pakistani developers and proposes solutions to improve UX. Modern AI development tends to be technology-driven, therefore UX is not attended optimally. HCAI has recently emerged as a trend though there is still a need for the further gap between them to be closed. HCAI has lately surfaced as a trend however, there is still work to be done to reduce the remaining gap which is only possible by its widespread acceptance.The objective of the research was to identify and understand the nature of AI interfaces in practice by conducting interviews and surveys. The findings of the paper investigate collaborative intelligence and ways for Pakistani enterprises to capitalize on AI capabilities, with a focus on incorporating the HCI concept into the development of AI-driven applications.Keywords: Human-Computer Interaction, Artificial Intelligence, User Interface, User Experience, AI-driven Interfaces, Human-centered AI, Users, Pakistan"""


# # Documents

# In[13]:


sentences = sent_tokenize(text)

# Function to create chunks of sentences with overlap
def create_sentence_chunks(sentences, chunk_size, chunk_overlap):
    chunks = []
    
    # Create chunks with overlap
    for i in range(0, len(sentences), chunk_size - chunk_overlap):
        chunk = ' '.join(sentences[i:i + chunk_size])
        chunks.append(chunk)
        # Stop if we reach the end
        if i + chunk_size >= len(sentences):
            break
    
    return chunks

chunk_size = 3  
chunk_overlap = 1  

# chunks of sentences
sentence_chunks = create_sentence_chunks(sentences, chunk_size, chunk_overlap)

documents = [Document(page_content=chunk) for chunk in sentence_chunks]


# In[14]:


for i, doc in enumerate(documents):
    print(f"Document {i+1}:\n{doc.page_content}\n")


# In[ ]:





# # Text Embeddings 

# In[15]:


embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


# In[16]:


def pad_embedding(embedding, target_dim=512):
    # Convert to numpy array if it's not already
    if not isinstance(embedding, np.ndarray):
        embedding = np.array(embedding)
    
    # Calculate the padding needed
    current_dim = embedding.shape[-1]
    if current_dim < target_dim:
        padding = np.zeros(target_dim - current_dim)
        padded_embedding = np.concatenate([embedding, padding])
    else:
        padded_embedding = embedding
    
    return padded_embedding


# In[17]:


def extract_embeddings(df):
    all_embeddings = []
    for text in df:
        # Extract the embedding
        embedding = embeddings.embed_query(text)
        # Pad the embedding to the desired length (512)
        padded_embedding = pad_embedding(embedding, target_dim=512)
        all_embeddings.append(padded_embedding)
    
    return all_embeddings


# In[18]:


document_contents = [doc.page_content for doc in documents]
x = extract_embeddings(document_contents)


# In[19]:


x


# In[ ]:





# # Inserting into VDB

# In[20]:


import pinecone
from pinecone import Pinecone, ServerlessSpec


# In[21]:


pc_api_key = "9bf699ce-092d-48a9-8526-a219a8e3d509"
pc = Pinecone(api_key=pc_api_key)


# In[327]:


# pc.create_index(
#     name="rag-embeddings-dot",
#     dimension=len(df_chunks.iloc[0]['image_embedding']),  
#     metric="dotproduct", 
#     spec=ServerlessSpec(
#         cloud="aws",
#         region="us-east-1"
#     )
# )
pc.create_index(
    name="fyp-txt-embed",
    dimension=384,  
    metric="dotproduct", 
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)


# In[22]:


index = pc.Index(name="fyp-txt-embed")


# In[23]:


index


# In[24]:


# Get embeddings for each document
document_contents = [doc.page_content for doc in documents]
embeddings_list = [embeddings.embed_query(text) for text in document_contents]

# Prepare data for upsert: List of tuples (id, vector, metadata)
values = [
    (str(i), emb, {"text": document_contents[i]})  # Convert embedding to list format
    for i, emb in enumerate(embeddings_list)
]


# In[25]:


index.upsert(vectors=values)


# In[26]:


index.describe_index_stats()


# In[ ]:





# # Query

# ## txt - sparse

# In[27]:


# Define your query text
query_text = "AI development challenges in human-computer interaction"

# Generate the embedding for the query
query_embedding = embeddings.embed_query(query_text)

# Perform the query on the Pinecone index
response = index.query(
    vector=query_embedding,
    top_k=5,  # Number of closest vectors to return
    include_values=True,  # Include the vectors themselves
    include_metadata=True  # Include the metadata (like original text)
)

# Display the results
for match in response["matches"]:
    print(f"ID: {match['id']}")
    print(f"Score: {match['score']}")
    print(f"Metadata: {match['metadata']}\n")


# # LLM - GROQ

# In[28]:


from groq import Groq
from langchain_groq import ChatGroq


# In[29]:


groq_api_key = "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"


# In[30]:


llm = ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key= groq_api_key,
)
print("GROQ LLM loaded")


# In[ ]:





# # QA Chain
