import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export const multerOptions: MulterOptions = {
  storage: multer.memoryStorage(),
};