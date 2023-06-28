import ApiError from '@src/utils/errors/api-error';
import { Response, Request } from 'express';
import logger from '@src/utils/logger';

import * as mock from '@src/mock/refurbishs.json';
import { RefurbishService } from '@src/services/refurbishService';
import { RefurbishInterface } from '@src/interfaces/refurbishInterface';

export class RefurbishController {
  public async create(req: Request, res: Response): Promise<void> {
    logger.info('Request received')
    try {
      const createdRefurbish = await RefurbishService.addRefurbish(req.body);
      res.status(201).send(createdRefurbish);
    } catch (err) {
      logger.error(JSON.stringify(err));
      res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
  }
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const getAllRefurbishs = await RefurbishService.getAll();
      if (!getAllRefurbishs) {
        return res
          .status(400)
          .send(ApiError.format({ code: 400, message: 'Not finded refurbishs!' }));
      }
      logger.info(typeof getAllRefurbishs, getAllRefurbishs);
      return res.status(200).json({ data: getAllRefurbishs });
    } catch (err) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const refurbishSearchedById = req.params.id;
    try {
      const refurbish = await RefurbishService.getRefurbishById(refurbishSearchedById);
      return res.status(200).json({ data: refurbishFinded });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res
        .status(404)
        .send(ApiError.format({ code: 404, message: 'Something went wrong!' }));
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const refurbishId = req.params.id;

    try {
      const refurbish: Partial<RefurbishInterface> = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
      const updateRefurbish = await RefurbishService.update(refurbishId, refurbish);
      if (updateRefurbish.modifiedCount === 0) {
        return res
          .status(400)
          .send(ApiError.format({ code: 400, message: 'Not updated refurbishs!' }));
      }
      return res.status(200).json({ data: updateRefurbish });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }

  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const refurbishId: string = req.params.id;
    try {
      const deleteRefurbish = await RefurbishService.delete(refurbishId);
      return res.status(200).send({ data: deleteRefurbish });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
  }

  public async me(req: Request, res: Response): Promise<Response> {
    const refurbishId = req.body?.refurbishId;

    if (!refurbishId) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
    const refurbish = await mock;
    if (!refurbish) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
    return res.json({ data: refurbish });
  }
}
