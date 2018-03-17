
## NEX Chrome Extension Facial Recognition Verification

This project uses Amazon's Rekognition services (specifically face search) to verify a user when starting a transaction on the NEX chrome extension. In `import.js` you can find code for loading a local folder of face images into an AWS image collection. `index.js` starts the application.


## Requirements

Need to install NEX chrome extension. Additional dependencies (including the AWS SDK for Node.js) can be installed with:

    npm install

## Basic Configuration

You need to set up your AWS security credentials before the sample code is able
to connect to AWS. You can do this by creating a file named "credentials" at ~/.aws/ 
(C:\Users\USER_NAME\.aws\ for Windows users) and saving the following lines in the file:

    [default]
    aws_access_key_id = <your access key id>
    aws_secret_access_key = <your secret key>

See the [Security Credentials](http://aws.amazon.com/security-credentials) page.
It's also possible to configure your credentials via a configuration file or
directly in source. See the AWS SDK for Node.js [Developer Guide](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)
for more information.

Update the `config.js` file with your settings

    module.exports.collectionName = "YourCollectionName";
    module.exports.region = "us-east-2";

## Running the sample

You'll need to have some images in `faces`. Run this to import them to AWS:

    node import.js

Then to start after:

    node index.js

If you go to http://localhost:5555/ in your browser you'll see a simple form for uploading an image. Upon hitting submit you should see the raw result from AWS. If it successfuly matched the face, then you'll see that there was a successful match.

