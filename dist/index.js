"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const https = require('https');
const nodeFetch = require("node-fetch-commonjs");
const path = require("path");
require("dotenv").config();
const urlToAWS = (images) => __awaiter(void 0, void 0, void 0, function* () {
    const AWS = require('aws-sdk'), { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
    const s3 = new S3Client({
        endpoint: `https://${process.env.AWS_ENDPOINT}`,
        region: process.env.AWS_REGION
    });
    let imageArr = [];
    for (let url of images) {
        try {
            let fileName = Math.random() + "-img.png";
            const response = yield nodeFetch(url);
            const buffer = yield response.arrayBuffer();
            yield s3.send(new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: buffer
            }));
            imageArr.push(`https://${process.env.AWS_BUCKET_NAME}.${process.env.AWS_ENDPOINT}/${fileName}`);
        }
        catch (err) {
            if (err instanceof Error) {
                const error = new Error(err.message);
                error.code = 500;
                return error;
            }
        }
    }
    ;
    return imageArr;
});
module.exports = urlToAWS;
