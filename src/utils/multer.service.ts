import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileUploadService {
  async uploadFile(
    dataBuffer: Buffer,
    fileName: string,
    type: string,
  ): Promise<unknown> {
    const s3 = new S3();
    const key = `${uuid()}-${fileName}`;
    await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: dataBuffer,
        Key: key,
        ACL: 'public-read',
        ContentType: type,
      })
      .promise();

    const url = `${process.env.AWS_STATIC_URL}/${key}`;
    return { url, key };
  }
}
