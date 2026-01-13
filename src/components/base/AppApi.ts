import { Api, ApiListResponse } from './api'; 
import { ICard} from '../../types/index';
import { IForm } from '../../types/index';



export class AppApi extends Api {

  getCards(): Promise<ApiListResponse<ICard>> {
    return this.get<ApiListResponse<ICard>>('/product/')
  }

  getCard(id: string): Promise<ICard> {
    return this.get<ICard> ('/product/' + id)
  }

  sendOrder(orderInfo: IForm): Promise<IForm> {
    return this.post<IForm> ('/order/', orderInfo)
  }
}