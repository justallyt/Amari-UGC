import asyncHandler from "express-async-handler";
import fs from "fs"
import cloudinary from "../utils/cloudinary.js";
import Asset from "../models/assetsModel.js";
import User from "../models/usersModel.js";
import { mergeChunks } from "../utils/mergechunks.js";
import path from 'path';

const __dirname = path.resolve();
//Upload Asset
let assetChunks = []
export const CreateAsset = asyncHandler(async(req, res) => {
        let chunk = req.file.buffer;
        const chunkNumber = Number(req.body.chunkNumber);
        const totalChunks = Number(req.body.totalChunks);
        const fileName = req.body.originalname;
        console.log(req.body)

        const chunkDir = __dirname + "/chunks";

        if(!fs.existsSync(chunkDir)){
                fs.mkdirSync(chunkDir)
        }

        const chunkFilePath = `${chunkDir}/${fileName}.part_${chunkNumber}`;
        
        try{
               await fs.promises.writeFile(chunkFilePath, chunk);
               console.log(`Chunk ${chunkNumber} of ${totalChunks} saved`);
               if(chunkNumber === totalChunks - 1){
                     await mergeChunks(fileName, totalChunks);
                     console.log("File merged sucessfully")
               }
               res.status(200).json({message: 'Chunk uploaded'})
        }catch(error){
              console.error("Error saving chunk", error);
              res.status(500).json({ error: 'Error saving chunk'})
        }
       
      
})