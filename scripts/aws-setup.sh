#!/bin/bash
# AWS Infrastructure Setup Script for Zappify
# This script creates the necessary AWS resources for ECR and ECS deployment.

set -e

REGION="us-east-1"
BACKEND_REPO="zappify-backend"
FRONTEND_REPO="zappify-frontend"
CLUSTER_NAME="zappify-cluster-v2"

echo "🚀 Starting AWS Infrastructure Setup..."

# 1. Create ECR Repositories
echo "📦 Creating ECR repositories..."
aws ecr create-repository --repository-name $BACKEND_REPO --region $REGION || echo "⚠️ Backend repo already exists"
aws ecr create-repository --repository-name $FRONTEND_REPO --region $REGION || echo "⚠️ Frontend repo already exists"

# 2. Create ECS Cluster
echo "🏗️ Creating ECS cluster..."
aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $REGION || echo "⚠️ Cluster already exists"

# 3. Create CloudWatch Log Groups
echo "📝 Creating CloudWatch log groups..."
aws logs create-log-group --log-group-name "/ecs/$BACKEND_REPO" --region $REGION || echo "⚠️ Backend log group already exists"
aws logs create-log-group --log-group-name "/ecs/$FRONTEND_REPO" --region $REGION || echo "⚠️ Frontend log group already exists"

# 4. Check for Execution Role (AWS Academy LabRole)
echo "🛡️ Checking for LabRole..."
aws iam get-role --role-name LabRole > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ LabRole found (Standard for AWS Academy)"
else
    echo "❌ LabRole not found. If not using AWS Academy, ensure you have an ecsTaskExecutionRole."
fi

echo "✅ Infrastructure setup complete!"
echo "Next steps:"
1. Update your GitHub Repository Secrets with AWS credentials.
2. Push your code to the 'main' branch to trigger the deployment.
