# setup aws deployer user

## user group roles:

- AWSCodeDeployRoleForLambda
- AWSLambda_FullAccess
- IAMFullAccess
- AmazonAPIGatewayAdministrator

# setup pulumi

https://www.pulumi.com/registry/packages/aws/installation-configuration/?_ga=2.150505974.1183758388.1648405236-861045303.1648405236

```bash
brew install pulumi
brew install awscli
aws configure
```

# Serverless App Using API Gateways and Lambda

https://www.pulumi.com/registry/packages/aws/how-to-guides/rest-api/

## create pulumi project

```
# templates: https://github.com/pulumi/templates
pulumi new aws-typescript --name infrastructure-as-code --dir infrastructure-as-code
```

## create lambda function

https://www.pulumi.com/docs/guides/crosswalk/aws/lambda/#register-an-event-handler-by-creating-a-lambda-function-resource
