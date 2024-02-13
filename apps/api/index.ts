import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_ID!,
    secretAccessKey: process.env.ACCESS_KEY!,
  },
});

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
  const outDirPath = path.join(__dirname, "output");

  const p = exec(`cd ${outDirPath} && npm install && npm run build`);

  p.stdout?.on("data", function (data: any) {
    console.log(data.toString());
  });

  p.stdout?.on("error", function (data: any) {
    console.log("Error", data.toString());
  });

  p.on("close", async function () {
    console.log("Build Complete");
    const distFolderPath = path.join(__dirname, "output", "build");
    const distFolderContents = fs.readdirSync(distFolderPath, {
      recursive: true,
    });

    for (const file of distFolderContents) {
      //@ts-ignore
      const filePath = path.join(distFolderPath, file);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log("uploading", filePath);

      const command = new PutObjectCommand({
        Bucket: "perceldeploymentfiles",
        Key: `__outputs/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        //@ts-ignore
        ContentType: mime.lookup(filePath),
      });

      await s3Client.send(command);
    }
  });
}

init();
