# Simple Serverless Microservices with CI/CD on AWS

This project demonstrates a basic serverless application consisting of two independent microservices deployed on AWS Lambda and exposed via AWS API Gateway. It features automated deployment using CI/CD pipelines built with GitHub Actions.

This project serves as a practical exercise combining concepts from **Project 5 (Serverless Microservices Application)** and **Project 8 (DevOps CI/CD Pipeline)** described in the "Strategic Portfolio Projects for Aspiring Software Developers in Canada (2025)" guide.

## Live API Endpoints

You can test the live deployed services here:

* **Service A:** [`https://xqk9p35gtl.execute-api.ca-central-1.amazonaws.com/service-a`](https://xqk9p35gtl.execute-api.ca-central-1.amazonaws.com/service-a)
* **Service B:** [`https://xqk9p35gtl.execute-api.ca-central-1.amazonaws.com/service-b`](https://xqk9p35gtl.execute-api.ca-central-1.amazonaws.com/service-b)

## Overview & Goal

The primary goal of this project was to learn and demonstrate fundamental concepts in modern cloud-native application development, specifically:

* **Serverless Computing:** Building and deploying functions on AWS Lambda without managing underlying servers.
* **Microservice Architecture:** Structuring the application as small, independent services (Service A and Service B).
* **API Gateway:** Exposing serverless functions via standard HTTP endpoints using AWS API Gateway (HTTP API).
* **DevOps & CI/CD:** Automating the build, packaging, and deployment process using GitHub Actions.
* **Cloud Services:** Gaining hands-on experience with core AWS services (Lambda, API Gateway, IAM).
* **TypeScript:** Building backend services using TypeScript for improved code quality and maintainability.

## Features

* Two independent microservices (`service-a`, `service-b`) written in TypeScript.
* Each service deployed as a separate AWS Lambda function.
* Services exposed via public HTTP GET endpoints through AWS API Gateway.
* Automated CI/CD pipeline using GitHub Actions for each service:
    * Triggered on push to the `main` branch if relevant service files are changed.
    * Installs dependencies (`npm ci`).
    * Compiles TypeScript (`npm run build`).
    * Packages deployment artifact (`.zip`).
    * Deploys updated code to the corresponding AWS Lambda function using AWS CLI (`aws lambda update-function-code`).
* Secure handling of AWS credentials using GitHub Secrets.

## Technologies Used

* **Language:** TypeScript
* **Runtime:** Node.js (v20.x recommended)
* **Cloud Provider:** Amazon Web Services (AWS)
    * **Compute:** AWS Lambda
    * **API:** AWS API Gateway (HTTP API)
    * **Identity:** AWS IAM (Identity and Access Management)
* **CI/CD:** GitHub Actions
* **Version Control:** Git & GitHub
* **Package Manager:** npm

## Local Development

1.  Clone the repository.
2.  Navigate into the respective service directory (`cd service-a` or `cd service-b`).
3.  Install dependencies: `npm install` (or `npm ci`)
4.  Compile TypeScript: `npm run build`
5.  Run the compiled code (for basic console output): `npm run start` (or `node dist/index.js`)

*(Note: Running locally does not simulate the full Lambda/API Gateway environment.)*

## CI/CD Pipeline

The deployment process is fully automated using GitHub Actions:

1.  **Trigger:** A push to the `main` branch that includes changes within a specific service's directory (`service-a/**` or `service-b/**`) or its corresponding workflow file triggers the respective workflow.
2.  **Environment Setup:** The workflow runs on an `ubuntu-latest` runner, checks out the code, sets up Node.js v20, and configures AWS credentials securely using secrets stored in GitHub repository settings (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`).
3.  **Build & Test:** Dependencies are installed using `npm ci`, and the TypeScript code is compiled using `npm run build`. Placeholder test steps are included.
4.  **Package:** The compiled JavaScript code in the `dist` directory is packaged into a `.zip` file.
5.  **Deploy:** The AWS CLI command `aws lambda update-function-code` is used to upload the `.zip` package and update the code of the target Lambda function (`service-a-portfolio` or `service-b-portfolio`).

Workflow files:
* [`./.github/workflows/deploy-service-a.yml`](./.github/workflows/deploy-service-a.yml)
* [`./.github/workflows/deploy-service-b.yml`](./.github/workflows/deploy-service-b.yml)

## Challenges & Learning

* **PowerShell Execution Policy:** Encountered initial issues running `npm` commands on Windows due to PowerShell security policies. Resolved by running `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` in an administrative PowerShell.
* **CI/CD Dependency Issues:** Workflow builds initially failed with TypeScript errors (`TS2307 Cannot find module 'aws-lambda'`). This was due to forgetting to commit the `package-lock.json` files after installing the `@types/aws-lambda` dev dependency locally. Resolved by ensuring `package.json` and `package-lock.json` were always committed for each service after dependency changes.
* **API Gateway Configuration:** Navigating the AWS Console UI for API Gateway required adapting the setup flow (creating integrations before routes).
* **IAM & Security:** Learned the importance of using IAM users and access keys for programmatic access instead of root credentials, and storing sensitive keys securely using GitHub Secrets.

## Potential Future Enhancements

* Implement meaningful unit/integration tests and run them in the CI/CD pipeline.
* Add a database (e.g., AWS DynamoDB) and have services interact with it.
* Define AWS resources (Lambda, API Gateway, IAM Roles) using Infrastructure as Code (IaC) like AWS SAM, AWS CDK, or Terraform.
* Refine IAM permissions for the deployment user and Lambda execution roles to follow the principle of least privilege.
* Add error handling and more robust logging within the Lambda functions.
* Explore advanced API Gateway features (e.g., request validation, custom authorizers).
* Set up a custom domain name for the API Gateway endpoint.
