import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { Device } from '../models/models';
import { DeviceInstance } from '../types';

interface ExtendedPostRequest extends Request {
  body: {
    name: string;
    price: number;
    brandId: number;
    typeId: number;
  };
}

interface ExtendedGetRequest extends Request {
  query: {
    brandId?: string;
    typeId?: string;
  };
}

class DeviceController {
  async getAllDevices(req: ExtendedGetRequest, res: Response) {
    const { brandId, typeId } = req.query;
    let devices: any;
    if (!brandId && !typeId) {
      devices = await Device.findAll();
    }

    if (brandId && !typeId) {
    }

    if (!brandId && typeId) {
    }

    if (brandId && typeId) {
    }

    return res.status(200).json({ message: 'Success!', devices });
  }

  async getDevice(req: Request, res: Response) {
    res.status(200).json({ ...req.query, ...req.params });
  }

  async postDevice(
    req: ExtendedPostRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, price, brandId, typeId } = req.body;

      if (!name || !price || !brandId || !typeId) {
        throw new Error('Required data not provided!');
      }

      if (!req.files || !req.files.img) {
        throw new Error('Image not provided!');
      }

      const img = req.files.img as UploadedFile;

      let fileName = uuidv4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({
        name,
        price,
        img: fileName,
        brandId,
        typeId,
      });

      return res.status(201).json({ message: 'Device created!', device });
    } catch (error) {
      if (error instanceof Error) {
        next(ApiError.badRequest(error.message));
      } else {
        next(ApiError.internal('Something went wrong!'));
      }
    }
  }
}

export default new DeviceController();
