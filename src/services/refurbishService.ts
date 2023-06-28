import { RefurbishInterface } from '@src/interfaces/refurbishInterface';
import { RefurbishModel } from '@src/models/refurbish';

export class RefurbishService {
  static async addRefurbish(refurbishData: RefurbishInterface) {
    try {
      const newRefurbish: RefurbishInterface = {
        refurbishName: refurbishData.refurbishName,
        lastName: refurbishData.lastName,
        firstName: refurbishData.firstName,
        email: refurbishData.email,
        date: new Date(),
      };
      const response = await new RefurbishModel(newRefurbish).save();
      if (!response) {
        return new Error("Something is wrong");
      }
      return response;
    } catch (err) {
      return err;
    }
  }

  static async getAll() {
    try {
      const allRefurbish = await RefurbishModel.find();
      return allRefurbish;
    } catch (err) {
      return err;
    }
  }

  static async getRefurbishById(id: string) {
    try {
      const refurbish = await RefurbishModel.findById({ _id: id })
      return refurbish;
    } catch (err) {
      return err;
    }
  }

  static async update(id: string, refurbish: Partial<RefurbishInterface>) {
    try {
      const updateResponse = await RefurbishModel.updateOne(
        { _id: id },
        {...refurbish, date: new Date()}
      )
      return updateResponse;
    } catch (err) {
      return err
    }
  }

  static async delete(id: string) {
    try {
      const deleteReponse = await RefurbishModel.findOneAndDelete({ _id: id });
      return deleteReponse
    } catch (err) {
      return err
    }
  }
}
