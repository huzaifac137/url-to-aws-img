import { errorException } from "./errorException";

const fs = require('fs') 
const https = require('https');

      const nodeFetch = require("node-fetch-commonjs");
      const path = require("path");
      require("dotenv").config();


const urlToAWS=async(images: string[]) : Promise<errorException | string[]>=>{

  const AWS = require('aws-sdk'),
      {
        S3Client , PutObjectCommand 
      } = require("@aws-sdk/client-s3");

      const s3 = new S3Client({
        endpoint :`https://${process.env.AWS_ENDPOINT}` ,
        region :process.env.AWS_REGION
      });
    
    let imageArr : string[]=[] ;
      for(let url of images)
      {
      try {
         let fileName = Math.random()+"-img.png";

        const response = await nodeFetch(url);
       const buffer = await response.arrayBuffer();
        
        await s3.send(new PutObjectCommand({
            Bucket : process.env.AWS_BUCKET_NAME ,
            Key :fileName ,
            Body : buffer
        }));

        imageArr.push(`https://${process.env.AWS_BUCKET_NAME}.${process.env.AWS_ENDPOINT}/${fileName}`);
       }

       catch (err) {
          if(err instanceof Error)
          {
            const error = new Error(err.message) as errorException;
            error.code =500;
            return error;
          }
       }
      };
       
      return imageArr;
   
};



module.exports = urlToAWS;
