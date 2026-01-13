import { ICard } from "../../types";
import { IEvents } from "../base/events";

export class BasketModel {
  protected _items: ICard[] = [];
  protected _total: number;
  protected _itemsId: string[] = []
  
  constructor(protected events: IEvents) {}

  addItems(card: ICard) {
    this._items.push(card);
  }

  removeItem(cardId: string) {
    this._items = this._items.filter(item => item.id !== cardId);
  }

  getItems(): ICard[] {
    return this._items;
  }

  getItemsId(): string[] {
    this._items.forEach((item) => {
      this._itemsId.push(item.id)
    })
    return this._itemsId
  }

  getTotalPrice(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  clearBasket() {
    this._items = [];
    this._itemsId = []
  }

  getTotalEmount(): number {
    return this._items.length
  }
}