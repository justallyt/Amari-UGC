import axios from "axios"

export const uploadAssetToBackend = async (data, chunks) => {
      let uploadPromises = [];

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      chunks.forEach(async(chunk, index) => {
              formData.append('assetChunk', chunk, `chunk-${index}`)

              const chunkPromise = await axios.post(
                     import.meta.env.VITE_API_URL, 
                     formData,
                     {
                         withCredentials: true,
                         headers: { "Content-Type": 'multipart/form-data'},
                    }
              )

              uploadPromises.push(chunkPromise);
      });

      Promise.all(uploadPromises).then(responses => {
              if(responses){
                    return responses;
              }
      }).catch(error => {
           return error
      })
}