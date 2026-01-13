import { IBasket } from "../../types";
import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Basket extends Component<IBasket> {
  protected _basketItems: HTMLElement;
  protected _totalPrice: HTMLElement;
  protected _orderButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)

    this._basketItems = ensureElement('.basket__list', this.container)
    this._totalPrice = this.container.querySelector('.basket__price')
    this._orderButton = this.container.querySelector('.basket__button');

    this._orderButton.addEventListener('click', () => {
        this.events.emit('order:start')
    })

  }

  set basketItems(items: HTMLElement[]) {
    if (items.length) {
      items.forEach((item, index) => {
          const indexItem = item.querySelector('.basket__item-index');
          indexItem.textContent = String(index + 1)
      })
      this._basketItems.replaceChildren(...items);
    } else {
      this._basketItems.replaceChildren(createElement<HTMLParagraphElement>('p', {
      textContent: 'Корзина пуста'
      }));
    }
  }


  set totalPrice(price: number) {
    try {
      this.setText(this._totalPrice, price.toLocaleString('ru-RU') + ' ₽')
    } catch (e) {
      this.setText(this._totalPrice, String(price) + ' ₽')
    }
    if (price <= 0) {
        this.setDisabled(this._orderButton, true)
    } else {
      this.setDisabled(this._orderButton, false)
    }
  }
}