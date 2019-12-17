# Serverless Boilerplate 🏎️

### Setup 🏁

1. Install your node dependencies, run `npm install`.
1. Start up your development server by running `npm run dev`.
1. Start up webpack watch process in another terminal by running `npm run watch`.
1. Navigate to `http://localhost:5000/` and you should see the frontend React components rendering successfully.

### Test Suite ✅

1. To kick off the test suite run `npm run test`.

### Deploy Process 🕹️

This repository leverages the [Serverless Framework](https://github.com/serverless/serverless). You can deploy this application to a live endpoint with this simple command `sls deploy`. You may need to first enter your platform credentials for this to deploy successfully.

The `sls deploy` command will use the specified `serverless.yml` configuration file to build the infrastructure for all of your lambda functions and specified API Gateway endpoints.

Here we utilize AWS exclusively, but you can switch these AWS Lambda functions out or mix and match with any FAAS platform including Azure Functions, Google CloudFunctions and more.

View more [Serverless commands here](https://serverless.com/framework/docs/providers/aws/cli-reference/deploy/).

### Deploy To AWS ☁️

1. Run `sls deploy`.
1. Enter your AWS Credentials if you are prompted to do so.
1. Serverless will then deploy your app to AWS and will output a live URL you can navigate to and view your app.

### Architecture 🏘️

#### Frontend

The frontend for this application is pretty straighforward. We build our React application using Webpack, which bundles our script into a single file. This file is then hosted on AWS's S3 storage system and delivered to the client through AWS's API Gateway. This is a lightweight Single-Page Application.

#### Backend

The backend of this application is documented in our `serverless.yml` file. This file is our "architecture as code". We specify everything in it included the url's we want our individual lambda functions to live, the environment variables we need, the services we need permissions for and more.

The Serverless Framework uses this file to hoist all of our infrastructure to support our lambda functions.

All of our Lambda functions live in the root `/functions` folder.

The functions supplied within this boilerplate cover all of the neccessary abilities needed for the initial rendering of our frontend React App on a live endpoint.

#### Globals 🌎

This boilerplate has a `/global-variables` file where you can store the base url endpoint for AWS API Gateway.

This allows you to easily move the project and endpoints to another location by defining the base path and other important endpoints in one place.

This means you can get the baseURL anywhere within the frontend React code like this `utils.baseAPI`.

### Advantages 📈

There are many advantages of using an architecture like this.

Cost.

Since Lambdas never run unless they are being used, you will never pay for server uptime you aren't actively using. This is very different from traditional applications that always have a server running regardless of usage and provides you with significant cost savings, especially at scale.

Scalability.

AWS handles the scalability of Lambdas out of the box. You could see sudden spikes in traffic and never encounter any server downtime or latency. As a matter of fact, your lambdas will actually become more performant the more frequently they are used.

Flexibility.

This architecture is inherently flexible. You can decouple the frontend and backend very easily and even spin up a completely new staging environment to test out a new endpoint. The Serverless Framework has some very handy commands that make this possible by leveraging AWS's sprawling ecosystem of products.

### CORS Troubleshooting With Lambdas 🏹

I'm documenting cors here because someone... somewhere will run into this issue again.

We are going to start on the client that makes the request and go all the way through the API Gateway => Lambda function => Response flow.

We are inside React here and making the request from the browser fetch API.

```javascript
const response = await fetch(awsPaymentEndpointHere, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
  },
  body: JSON.stringify({
    message: "We did it!"
  })
});

const paymentResponse = await response.json();
```

In your lambda function response:

```javascript
module.exports.handler = async function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Successful Payment"
    })
  });
};
```

Simple enough.

Now onto the API Gateway configuration. You may not need to do this manually as Serverless should handle this configuration. However, if your endpoints are returning CORS errors, you may need to manually follow the steps below.

In the API gateway dashboard, navigate to your API and click on "Resources".

1.  Find your API Resources List.
1.  Go into `OPTIONS` for the endpoint you are working with; for this example it's `/payment-processing`.
1.  Click `Method Request` in the execution view.
1.  Dropdown in `Request Body`: `Content type` : `application/json` and `Model name` : `Empty`.
1.  Now click "<- Method Execution" and go back to main view.
1.  Click "Integration Request"
1.  Change `Request body passthrough` : `When no template matches the request Content-Type header`.
1.  Add Mapping template of `Content-Type` of `application/json`.
1.  Now click "<- Method Execution" and go back to main view.  
    Click "Integration Response" (if you are in `POST` instead of `OPTIONS` skip these steps).
1.  Set `Content handling` to `Convert to text (if needed)`.
1.  Set Header Mappings to:

`Access-Control-Allow-Headers` : `'Access-Control-Allow-Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'`

`Access-Control-Allow-Origin` : `'*'`

`Access-Control-Allow-Credentials` : `'false'`

`Access-Control-Allow-Methods` : `'OPTIONS,POST'`

1. Set Mapping Templates `Content-Type` to `"application/json"`.
1. Set `Method Response` to return 200 in `HTTP Status` field. Then add
   `Access-Control-Allow-Headers`
   `Access-Control-Allow-Origin`
   `Access-Control-Allow-Origin`
   `Access-Control-Allow-Credentials`
   `Access-Control-Allow-Methods`

That's it!
