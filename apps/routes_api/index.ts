import express from 'express'
import {ECSClient, RunTaskCommand} from '@aws-sdk/client-ecs'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'
require('dotenv').config()
app.use(cors())
const ecsClient = new ECSClient({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.ACCESS_ID!,
      secretAccessKey: process.env.ACCESS_KEY!,
    },
})

const config = {
    CLUSTER: 'arn:aws:ecs:us-east-1:471112678646:cluster/percel-cluster',
    TASK: 'arn:aws:ecs:us-east-1:471112678646:task-definition/percel-task:1'
}

app.use(express.json())

app.post('/deploy', async (req, res) => {
    const { gitURL, projectName } = req.body
    const command = new RunTaskCommand({
        cluster: config.CLUSTER,
        taskDefinition: config.TASK,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: 'ENABLED',
                subnets: ['subnet-00b0ffdf32b81ce8d', 'subnet-063f05bcbd81d483e', 'subnet-0d0918283021056b0', 'subnet-043c90c929a0b0732', 'subnet-03cc153e4814c2d64', 'subnet-03e59e97c9541997f'],
                securityGroups: ['sg-0b16e335966941d33']
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: 'perceldeploy',
                    environment: [
                        { name: 'GIT_REPOSITORY__URL', value: gitURL },
                        { name: 'PROJECT_ID', value: projectName }
                    ]
                }
            ]
        }
    })

    await ecsClient.send(command);

    return res.json({  url: `http://${projectName}.percelapp`  })
})

app.get("/", (req, res) => {
    res.send("hello world!")
})



app.listen(3001, () => {
    console.log('server running on 3001.')
})