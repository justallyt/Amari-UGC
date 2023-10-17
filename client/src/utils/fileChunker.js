export const chunkerize = (file) => {
     const chunkSize = 5 * 1024 * 1024;

     const chunks = [];

     const fileSize = file.size;

     let start = 0, end = chunkSize;

     while(start < fileSize){
            chunks.push(file.slice(start, end));
            start = end;
            end = start + chunkSize;
     }

     return chunks
}