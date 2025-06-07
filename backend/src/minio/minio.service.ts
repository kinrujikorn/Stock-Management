import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });
  }

  async uploadFile(file: Buffer, filename: string): Promise<string> {
    const bucketName = 'products';

    // Sanitize filename: replace spaces and special characters
    const sanitizedFilename = filename
      .replace(/[^a-zA-Z0-9.-]/g, '-')
      .toLowerCase();

    try {
      // Ensure bucket exists
      const bucketExists = await this.minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await this.minioClient.makeBucket(bucketName);
      }

      // Upload file with sanitized name
      await this.minioClient.putObject(bucketName, sanitizedFilename, file);

      // Return file URL with encoded filename
      return `http://localhost:9000/${bucketName}/${encodeURIComponent(sanitizedFilename)}`;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
}
