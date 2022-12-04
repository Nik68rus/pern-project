import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { Device, DeviceInfo } from '../models/models';
import { handleError } from '../helpers/controllers';

interface IDeviceInfo {
  title: string;
  description: string;
}

interface ExtendedPostRequest extends Request {
  body: {
    name: string;
    price: number;
    brandId: number;
    typeId: number;
    info: string;
  };
}

interface ExtendedGetAllRequest extends Request {
  query: {
    brandId?: string;
    typeId?: string;
    limit?: string;
    page?: string;
  };
}

interface ExtendedGetOneRequest extends Request {
  params: {
    deviceId: string;
  };
}

class DeviceController {
  async getAllDevices(
    req: ExtendedGetAllRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { brandId, typeId, limit, page } = req.query;

      const currentPage = (page && +page) || 1;
      const currentLimit = (limit && +limit) || 9;

      if (isNaN(currentPage) || isNaN(currentLimit)) {
        return next(ApiError.badRequest('Page or/and limit value is wrong'));
      }

      const offset = currentLimit * (currentPage - 1);

      let devices: { count: number; rows: Device[] } = { count: 0, rows: [] };
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit: currentLimit, offset });
      }

      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit: currentLimit,
          offset,
        });
      }

      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit: currentLimit,
          offset,
        });
      }

      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit: currentLimit,
          offset,
        });
      }

      return res.status(200).json({ message: 'Success!', payload: devices });
    } catch (error) {
      handleError(error, next);
    }
  }

  async getDevice(
    req: ExtendedGetOneRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { deviceId } = req.params;

      const device = await Device.findByPk<Device>(deviceId, {
        include: [{ model: DeviceInfo, as: 'info' }],
      });

      if (!device) {
        return next(ApiError.notFound('Device not found!'));
      }

      return res.status(200).json({ message: 'Success', payload: device });
    } catch (error) {
      handleError(error, next);
    }
  }

  async postDevice(
    req: ExtendedPostRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, price, brandId, typeId, info } = req.body;

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

      if (info) {
        const currentInfo: IDeviceInfo[] = JSON.parse(info);
        currentInfo.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res
        .status(201)
        .json({ message: 'Device created!', payload: device });
    } catch (error) {
      handleError(error, next);
    }
  }
}

export default new DeviceController();
