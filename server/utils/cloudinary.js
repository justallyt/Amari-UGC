import { v2 as cloudinary} from 'cloudinary'
import asyncHandler from 'express-async-handler'

cloudinary.config({ 
       cloud_name: 'dfwrvpy2t', 
       api_key: '728155653648152', 
       api_secret: 'r2tWARxJoJODNh7FH8n-Ul78gTo' 
     });

export default cloudinary