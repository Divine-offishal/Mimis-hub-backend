declare namespace Express {
  interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  }

  interface Request {
    file?: MulterFile;
    files?: MulterFile[];
  }
}
