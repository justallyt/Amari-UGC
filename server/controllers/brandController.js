import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import generateToken from "../utils/generateToken.js";

//Login Brand
export const LoginBrand = asyncHandler(async(req, res) => {
      const { email, password } = req.body;

      const brand = await Brand.findOne({email});

      if(brand && (await brand.matchPasswords(password))){
            generateToken(res, brand._id);

            res.status(201).json({
                  message: "Login Successful"
            })
      }else{
           res.status(401);
           throw new Error("Invalid Email or Password");
      }
})

// Register Brand

export const RegisterBrand = asyncHandler(async(req, res) => {
       const { name, email, phone, country, type_of_business, password } = req.body;

       const brandExists = await Brand.findOne({email});

       if(brandExists){
            res.status(400);
            throw new Error("Brand Account already exists");
       }

       const brand = await Brand.create({
              name,
              email,
              phone,
              country,
              type_of_business,
              password
       });

       if(brand){
              generateToken(res, brand._id);

              res.status(201).json({
                     _id: brand._id,
                     name: brand.name,
                     email: brand.email,
                     type_of_business: brand.type_of_business
              })
       }else{
            res.status(400);
            throw new Error("Invalid Brand data. Please try again")
       }
})