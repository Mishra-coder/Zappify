# AWS ECS Deployment Guide

This guide explains how to manually deploy Zappify backend to AWS ECS using AWS Academy account.

## Prerequisites

- AWS Academy Learner Lab account
- ECR repository created: `zappify-backend`
- Docker image pushed to ECR

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Frontend (Vercel)  ←→  Backend (AWS ECS Fargate)      │
│                              ↓                          │
│                         MongoDB Atlas                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Step 1: Create ECS Task Definition

1. Go to **ECS Console** → **Task Definitions** → **Create new task definition**
2. Select **Create new task definition with JSON**
3. Paste this JSON:

```json
{
  "family": "zappify-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::185259096541:role/LabRole",
  "taskRoleArn": "arn:aws:iam::185259096541:role/LabRole",
  "containerDefinitions": [
    {
      "name": "zappify-backend",
      "image": "185259096541.dkr.ecr.us-east-1.amazonaws.com/zappify-backend:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "5000"
        },
        {
          "name": "MONGO_URI",
          "value": "YOUR_MONGODB_URI"
        },
        {
          "name": "JWT_SECRET",
          "value": "YOUR_JWT_SECRET"
        }
      ]
    }
  ]
}
```

4. Click **Create**

## Step 2: Create ECS Cluster

1. Go to **ECS Console** → **Clusters** → **Create cluster**
2. Configuration:
   - **Cluster name**: `zappify-cluster-v3`
   - **Infrastructure**: AWS Fargate (serverless)
3. Click **Create**

## Step 3: Create ECS Service

1. Go to **ECS Console** → **Clusters** → **zappify-cluster-v3**
2. Click **Services** tab → **Create**
3. Configuration:
   - **Launch type**: Fargate
   - **Task definition**: `zappify-backend` (latest revision)
   - **Service name**: `zappify-backend-service`
   - **Desired tasks**: 1
   
4. **Networking**:
   - **VPC**: Default VPC
   - **Subnets**: Select 2 subnets
   - **Security group**: Create new
     - **Inbound rules**: 
       - Type: Custom TCP
       - Port: 5000
       - Source: 0.0.0.0/0
   - **Public IP**: ENABLED (important!)

5. Click **Create**

## Step 4: Get Public IP

1. Go to **ECS Console** → **Clusters** → **zappify-cluster-v3**
2. Click **Tasks** tab
3. Click on running task
4. Copy **Public IP**
5. Test: `http://<PUBLIC_IP>:5000/health`

## Step 5: Update Frontend API URL

Update frontend `.env` file:

```env
VITE_API_URL=http://<PUBLIC_IP>:5000
```

Redeploy frontend on Vercel.

## AWS Academy Limitations

⚠️ **Important Notes:**

1. **Session Tokens Expire**: AWS Academy tokens expire every 3-4 hours
2. **No Persistent Resources**: Resources may be deleted when lab session ends
3. **No Load Balancer**: AWS Academy doesn't allow ALB creation
4. **Public IP Changes**: IP changes on task restart

## Production Deployment

For production, use:
- **Regular AWS Account** (free tier available)
- **Application Load Balancer** for stable endpoint
- **Route 53** for custom domain
- **Secrets Manager** for environment variables
- **CloudWatch** for logging and monitoring

## Troubleshooting

### Task fails to start
- Check CloudWatch logs: `/ecs/zappify-backend`
- Verify IAM role has ECR pull permissions
- Check environment variables

### Cannot access API
- Verify security group allows port 5000
- Ensure public IP is enabled
- Check task is in RUNNING state

### Image pull errors
- Verify ECR repository exists
- Check LabRole has ECR permissions
- Ensure image tag exists

## Manual Docker Build & Push

If you need to manually build and push:

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 185259096541.dkr.ecr.us-east-1.amazonaws.com

# Build image
cd backend
docker build -t zappify-backend .

# Tag image
docker tag zappify-backend:latest 185259096541.dkr.ecr.us-east-1.amazonaws.com/zappify-backend:latest

# Push image
docker push 185259096541.dkr.ecr.us-east-1.amazonaws.com/zappify-backend:latest
```

## Cost Estimation

AWS Academy: **Free** (lab credits)

Regular AWS Account:
- Fargate: ~$10-15/month (256 CPU, 512 MB)
- ECR: ~$1/month (storage)
- Data transfer: ~$1-5/month

**Total**: ~$12-20/month

---

**Need Help?** Check AWS ECS documentation or contact support.
