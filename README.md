# url-to-aws-img

Converts Image Urls provided into images stored in your AWS s3 bucket and returns the s3 urls of the images that can be used to display image or download  by making direct request to it.

# Usage

```js
 const urlToAWS = require("url-to-aws-img");

 // your custom function to use this package

 const Convert=async()=>{
    const urls = ["https://www.shutterstock.com/shutterstock/photos/687455338/display_1500/stock-photo-calming-serene-ocean-abstract-687455338.jpg" , "https://www.shutterstock.com/shutterstock/photos/687455338/display_1500/stock-photo-calming-serene-ocean-abstract-687455338.jpg"];

    const awsUrls=  await urlToAWS(urls);
    return awsUrls;
 };

 Convert();

```

# environemt variables

```env
AWS_ACCESS_KEY_ID= .....
AWS_SECRET_ACCESS_KEY= ......
AWS_ENDPOINT= .......
AWS_REGION= ......
AWS_BUCKET_NAME= .....
```