import jwt from "jsonwebtoken";
import { v4 as uuidv4} from 'uuid'

const generateToken = (res, userId) => {
       const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
       const mimic_token = uuidv4();
       res.cookie('jwt', token, {
           httpOnly: true,
           secure: false, //process.env.NODE_ENV === 'development',
           sameSite: 'strict',
           maxAge: 12 * 60 * 60 * 1000
       })

       //For automatic logout
       res.cookie('mimic', mimic_token, {
              httpOnly: false,
              maxAge: 12 * 60 * 60 * 1000,
       })
}

export default generateToken;