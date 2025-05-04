# Simple Serverless Microservices with CI/CD on AWS

This project demonstrates a basic serverless application consisting of two independent microservices deployed on AWS Lambda and exposed via AWS API Gateway. The entire infrastructure (Lambda functions, API Gateway, IAM Roles) is managed as code using the **AWS Serverless Application Model (SAM)**, and deployments are fully automated via a **single CI/CD pipeline** built with **GitHub Actions**.

## Live API Endpoints

You can test the live deployed services here:

* **Service A:** [`https://xq3eoap1mh.execute-api.ca-central-1.amazonaws.com/service-a`](https://xq3eoap1mh.execute-api.ca-central-1.amazonaws.com/service-a)
* **Service B:** [`https://xq3eoap1mh.execute-api.ca-central-1.amazonaws.com/service-b`](https://xq3eoap1mh.execute-api.ca-central-1.amazonaws.com/service-b)

## Overview & Goal

The primary goal of this project was to learn and demonstrate fundamental concepts in modern cloud-native application development, specifically:

* **Serverless Computing:** Building and deploying functions on AWS Lambda.
* **Microservice Architecture:** Structuring the application as small, independent services (Service A and Service B).
* **API Gateway:** Exposing serverless functions via standard HTTP endpoints using AWS API Gateway (HTTP API).
* **Infrastructure as Code (IaC):** Defining and managing all AWS resources (Lambda, API Gateway, IAM Roles) declaratively using AWS SAM (`template.yaml`).
* **DevOps & CI/CD:** Automating the build, packaging, and deployment process for the entire application stack using a single GitHub Actions workflow.
* **Cloud Services:** Gaining hands-on experience with core AWS services (Lambda, API Gateway, IAM, CloudFormation, S3 for artifacts).
* **TypeScript:** Building backend services using TypeScript.

## Features

* Two independent microservices (`service-a`, `service-b`) written in TypeScript.
* Infrastructure (Lambda functions, HTTP API, IAM Roles) defined using AWS SAM (`template.yaml`).
* Services exposed via public HTTP GET endpoints through the SAM-managed AWS API Gateway.
* Automated CI/CD pipeline using a **single GitHub Actions workflow**:
    * Triggered on push to the `main` branch if service code (`service-a/**`, `service-b/**`), the SAM template (`template.yaml`), or the workflow file itself changes.
    * Builds both services sequentially (`npm ci` && `npm run build`).
    * Builds the SAM application (`sam build`).
    * Deploys the entire CloudFormation stack (`sam deploy`) using an S3 bucket for artifacts.
    * Uses concurrency control (`cancel-in-progress: false`) to ensure safe, sequential deployments.
* Secure handling of AWS credentials using GitHub Secrets.

## Technologies Used

* **Language:** TypeScript
* **Runtime:** Node.js (v20.x)
* **Cloud Provider:** Amazon Web Services (AWS)
    * **Compute:** AWS Lambda
    * **API:** AWS API Gateway (HTTP API)
    * **IaC / Deployment:** AWS SAM (Serverless Application Model), AWS CloudFormation
    * **Storage:** AWS S3 (for SAM deployment artifacts)
    * **Identity:** AWS IAM (Identity and Access Management)
    * **Logging:** AWS CloudWatch Logs
* **CI/CD:** GitHub Actions
* **CLI Tools:** AWS SAM CLI, AWS CLI, Git, npm

## Local Development & Testing

1.  Clone the repository.
2.  Ensure you have Node.js, npm, AWS CLI, and AWS SAM CLI installed and configured with appropriate AWS credentials.
3.  Navigate into a service directory (`cd service-a` or `cd service-b`).
4.  Install dependencies: `npm ci`
5.  Compile TypeScript: `npm run build`
6.  (Optional) Invoke locally using SAM (requires Docker for Lambda environment simulation): `sam local invoke ServiceAFunction -t ../template.yaml` (run from service directory, adjust path to template) or use event payloads.

## CI/CD Pipeline (`deploy-stack.yml`)

The deployment process is fully automated using a single GitHub Actions workflow:

1.  **Trigger:** A push to the `main` branch that includes changes in `service-a/**`, `service-b/**`, `template.yaml`, or the workflow file itself.
2.  **Concurrency:** Ensures only one deployment runs at a time per branch (`cancel-in-progress: false`).
3.  **Environment Setup:** Checks out code, sets up Node.js v20, configures AWS credentials via GitHub Secrets.
4.  **Build Services:** Runs `npm ci && npm run build` sequentially for both `service-a` and `service-b`.
5.  **Build SAM App:** Runs `sam build` using `template.yaml` to prepare deployment artifacts.
6.  **Deploy Stack:** Runs `sam deploy` which packages artifacts, uploads them to the designated S3 bucket, and creates/updates the `portfolio-app-stack` CloudFormation stack, deploying infrastructure and code changes.

Workflow file: [`./.github/workflows/deploy-stack.yml`](./.github/workflows/deploy-stack.yml)

## Challenges & Learning

This project involved overcoming several common cloud development hurdles:

* **Initial Setup:** Configuring PowerShell execution policies on Windows for `npm`. Setting up Git identity.
* **CI/CD Dependencies:** Ensuring `package-lock.json` files were committed so `npm ci` could correctly install dev dependencies (like `@types/aws-lambda`) in the workflow environment.
* **CloudFormation States:** Dealing with the `ROLLBACK_COMPLETE` state by deleting the failed stack before retrying deployment. Resolving resource conflicts (`Function already exists`) by deleting manually created resources before the first IaC deployment.
* **Lambda Handler Path:** Debugging `Runtime.ImportModuleError` by correlating the `Handler` setting in `template.yaml` (`dist/index.handler`) with the actual package structure created by `sam build`/`deploy`.
* **Deployment Concurrency:** Initially using two separate workflows led to deployment collisions and inconsistent states (one service breaking when the other deployed). This was resolved by refactoring to a **single workflow** managing the entire stack deployment atomically, using GitHub Actions concurrency control (`cancel-in-progress: false`) for safety.
* **SAM/S3 Requirement:** Understanding that `sam deploy` requires an S3 bucket (`--s3-bucket` or `--resolve-s3`) for storing deployment artifacts before CloudFormation deployment.

## Potential Future Enhancements

* Implement meaningful unit/integration tests (e.g., using Jest) and add an `npm test` stage to the CI/CD pipeline.
* Add a database (e.g., AWS DynamoDB defined within `template.yaml`) and implement service logic to interact with it.
* Refine IAM permissions for the deployment user and Lambda execution roles to follow the principle of least privilege (define specific IAM policies in `template.yaml`).
* Add structured logging and error handling within the Lambda functions.
* Explore advanced API Gateway features defined within the SAM template.
* Set up a custom domain name for the API Gateway endpoint.