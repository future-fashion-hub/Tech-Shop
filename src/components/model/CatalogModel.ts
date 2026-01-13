import { ICard } from "../../types"
import { IEvents } from "../base/events";

export class CatalogModel {
  protected _catalog: ICard[];
 
  constructor(protected events: IEvents){}
  
  getCatalog(): ICard[] {
    return this._catalog;
  }

  setCatalog(catalog: ICard[]) {
    this._catalog = catalog;
    this.events.emit('catalog:changed')
  }

  getCard(id: string): ICard {
    return this._catalog.find((card) => card.id === id);
  }
}