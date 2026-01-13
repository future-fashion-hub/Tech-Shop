import { IForm, IFormUserData } from '../../types';
import { IEvents } from "../base/events";

export class UserDataModel {
  protected orderData: IFormUserData = {
    payment: '',
    address: '',
    email: '',
    phone: '',
  };

  constructor(protected events: IEvents) {}

  setOrderData(data: Partial<IForm>) {
    Object.assign(this.orderData, data);
  }

  getOrderData(): IFormUserData {
    return this.orderData;
  }

  resetOrder() {
    this.orderData = {
        payment: '',
        address: '',
        email: '',
        phone: '',
    };
  }

  validate(fields: (keyof IFormUserData)[]): boolean {
    return fields.every(field => !!this.orderData[field]);
  }

}