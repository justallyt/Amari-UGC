export const generateOTP = () => {
        //const digits = '0123456789'; 
        const digits = process.env.OTP_STRING;
        const otpLength = 6;
        let otp = '';
        for(let i = 1; i <= otpLength; i++){
               let index = Math.floor(Math.random() * (digits.length));
               otp = otp + digits[index];
        }
        return otp;
} 