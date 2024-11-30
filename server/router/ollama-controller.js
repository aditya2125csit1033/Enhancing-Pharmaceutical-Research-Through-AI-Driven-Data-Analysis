const { HfInference } = require('@huggingface/inference');

const hf = new HfInference('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');

const generateEmbeddings = async(req,res)=> {
    const model = 'sentence-transformers/all-mpnet-base-v2';
    try {
        const response = await hf.embed({
            model: model,
            inputs: req.body.Prompt,
        });
        console.log('Generated Embeddings:', response);
        return response;
    } catch (error) {
        console.error('Error generating embeddings:', error);
    }
}



module.exports=  {generateEmbeddings};


