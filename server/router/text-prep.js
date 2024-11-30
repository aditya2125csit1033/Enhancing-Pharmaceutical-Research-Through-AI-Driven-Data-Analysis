const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');
const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const stopword = require('stopword');
const nlp = winkNLP(model);
const comp = require('compromise');
const natural = require('natural');
const { ChromaClient } = require('chromadb');
const { HfInference } = require('@huggingface/inference');
const corpusEmbeddings = [];
const hf = new HfInference('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');
const chroma = new ChromaClient({ path: "http://localhost:8000" });


const promptResponse = async (req, res) => {
    const { Prompt } = req.body; 
    console.log("Prompt:", Prompt);

    
    let ogresp = '';
    let preptext = preprocessText(Prompt);
    let model1 = 'sentence-transformers/all-MiniLM-L6-v2';
    let respprom;

    try {
     
        const response1 = await hf.featureExtraction({
            model: model1,
            inputs: preptext[0],
        });


        
        respprom = response1;
        console.log("Model generated embeddings for prompt:", response1);
        
    } catch (error) {
        console.error('Error generating embeddings for the corpus:', error);
        return res.status(500).json({ error: 'Error generating embeddings.' });
    }

    try {
       
        let collectedQ = await chroma.getCollection({
            name: "document_embeddin",
        });

        const response = await collectedQ.query({
            queryEmbeddings: respprom,
            nResults: 5,
            include: ['embeddings', 'documents', 'distances']
        });

        console.log("Response of query:", response);

        let contextArray = response.documents; 
        let context = '';
        
        for (let i = 0; i < contextArray.length; i++) {
            context += contextArray[i] + " "; 
        }

        let combinedInput = `Respond to the prompt: ${Prompt}. Provide a direct answer unless context is explicitly required. Only consider context below if directly relevant. Like dont you dare to use the context if the prompt can be responded without using context.\\n\\n--- Context ---\\n\\n${context}`;
        console.log("combinedInput:", combinedInput);

let apiendllama = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: "llama3.2",
        prompt: combinedInput,
        stream: false
    })
});

if (!apiendllama.ok) {
    throw new Error("Failed to call Llama model");
}


const resp = await apiendllama.json();

console.log("Llama response:", resp);
res.json({ response: resp.response });
    } catch (error) {
        console.error('Error querying the collection or calling Llama model:', error);
        return res.status(500).json({ error: 'Error querying the collection or calling Llama model.' });
    }
};


   

async function storeDocumentEmbeddings(corpus, corpusEmbeddings) {
    if (!Array.isArray(corpus)) {
        console.error('Corpus is not an array:', corpus);
        return;
    }

    if (!Array.isArray(corpusEmbeddings)) {
        console.error('Embeddings is not an array:', corpusEmbeddings);
        return;
    }

    if (corpus.length !== corpusEmbeddings.length) {
        console.error('Length mismatch - Corpus length:', corpus.length, 'Embeddings length:', corpusEmbeddings.length);
        return;
    }

    let collection;
    try {
      
        collection = await chroma.getCollection({ name: "document_embeddin" });
        console.log("Collection retrieved successfully.");
    } catch (error) {
        console.error('Collection retrieval error:', error);
       
        collection = await chroma.createCollection({ name: "document_embeddin" });
        console.log("Collection created successfully.");
    }

    try {
        for (let i = 0; i < corpus.length; i++) {
            let doc = corpus[i].text;
            let docId = corpus[i].fileName.replace('.pdf', '').replace('.docx', '');
            docId = docId + '_' + i; 
            let embedding = corpusEmbeddings[i];

            if (!corpus[i].fileName) {
                console.error(`File name is missing or undefined for document at index ${i}`, doc);
                continue; 
            }

            console.log(`Storing document: ${corpus[i].fileName} with embedding:`, embedding);

            await collection.add({
                ids: [docId],
                embeddings: [embedding],
                documents: [doc]
            });
        }

        console.log('Successfully stored all embeddings in ChromaDB');
    } catch (error) {
        console.error('Error storing embeddings:', error);
    }
}

let corpus = [];

const englishS = stopword.eng;

async function generateCorpusEmbeddings(corpus) {
    let model = 'sentence-transformers/all-MiniLM-L6-v2';

    try {
        for (const document of corpus) {
            const response = await hf.featureExtraction({
                model: model,
                inputs: document.text,
            });
            corpusEmbeddings.push(response);
            console.log(`Generated embeddings for document: ${document.fileName}`);
        }

        console.log('Corpus Embeddings:', corpusEmbeddings);
    } catch (error) {
        console.error('Error generating embeddings for the corpus:', error);
    }
}

function preprocessText(text) {
    const regex = /[a-zA-Z0-9]+/g;
    const tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(text);

    let filteredTokens = tokens
        .filter(token => regex.test(token) && !englishS.includes(token.toLowerCase()));

    let lemmatizedTokens = filteredTokens.map(token => comp(token).out('lemma'));
    return lemmatizedTokens.join(' ');
}


async function conversion() {
    console.log("Conversion started");
    const dirPath = '../server/disk';
    try {

        const files = await fs.readdir(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const ext = path.extname(filePath).toLowerCase();

            if (ext === '.pdf') {
                try {
                    const dataBuffer = await fs.readFile(filePath);
                    const pdfData = await pdf(dataBuffer);
                    const preprocessedText = preprocessText(pdfData.text);
                    corpus.push({ fileName: file, text: preprocessedText });
                } catch (err) {
                    console.error(`Error processing PDF file ${file}:`, err);
                }
            } else if (ext === '.docx') {
                try {
                    const dataBuffer = await fs.readFile(filePath);
                    const { value: text } = await mammoth.extractRawText({ buffer: dataBuffer });
                    const preprocessedText = preprocessText(text);
                    corpus.push({ fileName: file, text: preprocessedText });
                } catch (err) {
                    console.error(`Error processing DOCX file ${file}:`, err);
                }
            } else {
                console.log(`Unsupported file type: ${ext}`);
            }
        }

        console.log("Conversion is done");
        console.log('Corpus successfully processed and preprocessed:', corpus);

        await generateCorpusEmbeddings(corpus);
        await storeDocumentEmbeddings(corpus, corpusEmbeddings);
        console.log("Successfully stored the data in Chroma DB");

        
        let collection1;
        try {
            collection1 = await chroma.getCollection({ name: "document_embeddin" });
            if (!collection1) {
                console.error("Collection not found or is undefined");
                return;
            }

            
            const results = await collection1.get({ include: ['embeddings'] });
            console.log("Retrieved documents with embeddings:");

            console.log(results);

            console.log("Collection retrieved successfully");
        } catch (error) {
            console.error('Error fetching collection:', error);
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

const logout = async(req,res)=>{
    let col = await chroma.getCollection({name:"document_embeddin"});
    try {
        await chroma.deleteCollection(col); 
        let Path = '../server/disk'
        let filing = await fs.readdir(Path);
        for (let file of filing) {
            const filePath = path.join(Path, file);
            await fs.unlink(filePath);
        }
        res.status(200).json({ msg: "done" });
    } catch (error) {
        res.status(400).json({ msg: "oops not deleted", error: error.message });
    }

    
}
module.exports = { conversion , promptResponse, logout};
