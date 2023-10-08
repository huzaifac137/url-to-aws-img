
const fs = require('fs') 
const https = require('https');

      const fetch = require("node-fetch-commonjs");
      const path = require("path");
      require("dotenv").config();


const urlToAWS=async(images)=>{

  const AWS = require('aws-sdk'),
      {
        S3Client , PutObjectCommand 
      } = require("@aws-sdk/client-s3");

      const s3 = new S3Client({
        endpoint :`https://${process.env.AWS_ENDPOINT}` ,
        region :process.env.AWS_REGION
      });
    
    let imageArr=[] , fileNames=[] ;
      for(let url of images)
      {
      try {
         let fileName = Math.random()+"unsplash-img.png";

        const response = await fetch(url);
       const buffer = await response.arrayBuffer();
        
        await s3.send(new PutObjectCommand({
            Bucket : process.env.AWS_BUCKET_NAME ,
            Key :fileName ,
            Body : buffer
        }));

        imageArr.push(`https://${process.env.AWS_BUCKET_NAME}.${process.env.AWS_ENDPOINT}/${fileName}`);
       }

       catch (err) {
            const error = new Error(err);
            error.code =500;
            return error;
       }
      };
       
      return imageArr;
   
};



module.exports = urlToAWS;
