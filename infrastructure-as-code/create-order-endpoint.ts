import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

const functionName = 'createOrder';
const compiledAppPath = '../src/backend/create-order-lambda/dist';
const projectTag = { Project: 'aws-solution-test-1' };

const lambdaRole = new aws.iam.Role(`${functionName}LambdaRole`, {
  assumeRolePolicy: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Principal: {
          Service: 'lambda.amazonaws.com',
        },
        Effect: 'Allow',
        Sid: '',
      },
    ],
  },
  tags: projectTag,
});

new aws.iam.RolePolicyAttachment(`${functionName}RolePolicyAttachment`, {
  role: lambdaRole,
  policyArn: aws.iam.ManagedPolicy.AWSLambdaExecute,
});

const lambdaFunction = new aws.lambda.Function(`${functionName}Lambda`, {
  architectures: ['arm64'],
  runtime: 'nodejs14.x',
  role: lambdaRole.arn,
  handler: 'main.handler',
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive(compiledAppPath),
  }),
  tags: projectTag,
});

const apiGateway = new aws.apigatewayv2.Api(`${functionName}ApiGateway`, {
  protocolType: 'HTTP',
  corsConfiguration: {
    allowMethods: ['*'],
    allowOrigins: ['*'],
  },
  target: lambdaFunction.arn,
  tags: projectTag,
});

// https://stackoverflow.com/a/64089186/410224
new aws.lambda.Permission(`${functionName}ApiGatewayInvokeLambdaPermission`, {
  action: 'lambda:InvokeFunction',
  function: lambdaFunction.arn,
  principal: 'apigateway.amazonaws.com',
  sourceArn: apiGateway.executionArn.apply((v) => `${v}/*/*`),
});

export const apiGatewayUrl = apiGateway.apiEndpoint;
