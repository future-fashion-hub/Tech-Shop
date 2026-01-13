import { ICard } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IBaseCard extends ICard {
  buttonDisabled?: boolean;
}

export class Card extends Component<IBaseCard> {
  protected _title?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _category?: HTMLElement;
  protected _description?: HTMLElement;
  protected _price?: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _id?: string;

  protected categoryColor:  Record<string, string> = {
		'софт-скил': 'card__category_soft',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'другое': 'card__category_other',
    'кнопка': 'card__category_button',
    'электроника': 'card__category_hard'
  }

  constructor(container: HTMLElement, events: IEvents, protected buttonIsDisabled?: boolean) {
    super(container);
    this._title = ensureElement('.card__title', this.container);
    this._image = this.container.querySelector('.card__image') as HTMLImageElement;
    this._category = this.container.querySelector('.card__category');
    this._description = this.container.querySelector('.card__text');
    this._price = ensureElement('.card__price', this.container);
    this._button = this.container.querySelector('button') as HTMLButtonElement;

    if (this.container.classList.contains('gallery__item')) {
      this.container.addEventListener('click', () => {
        events.emit('card:open', {id: this._id});
      })
    }

    if (this.container.classList.contains('card_full')) {
       this._button.addEventListener('click', () => {
        if (this._price.textContent !== 'Бесценно') {
          events.emit('basket:add', {id: this._id});
          this.setBasketState(true);
        }
      })
    }

    if (this.container.classList.contains('basket__item')) {
       this._button.addEventListener('click', () => {
        events.emit('basket:remove', {id: this._id});
        events.emit('basket:open')
      })
    }
  }
  set title(value: string) {
    this.setText(this._title, value);
  }

  set image(value: string) {
    // Accept absolute paths or data URLs as-is, otherwise prepend CDN_URL
    if (!value) return;
    if (value.startsWith('data:') || value.startsWith('http') || value.startsWith('/')) {
      this.setImage(this._image, value);
    } else {
      this.setImage(this._image, CDN_URL + value);
    }
  }

  set category(value: string) {
    this.setText(this._category, value);
    if (this._category) {
    this.toggleClass(this._category, this.categoryColor[value], true)
    }
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  private setBasketState(isInBasket: boolean) {
    if (this._price.textContent === 'Бесценно') {
      this.setDisabled(this._button, true);
      this.setText(this._button, 'Нельзя купить');
    } else {
      this.setDisabled(this._button, isInBasket);
      this.setText(this._button, isInBasket ? 'Уже в корзине' : 'В корзину');
    }
  }

  set price(value: number | null) {
    if (value == null) {
      this.setText(this._price, 'Бесценно');
      this.setBasketState(false); 
    } else {
      try {
        this.setText(this._price, value.toLocaleString('ru-RU') + ' ₽');
      } catch (e) {
        this.setText(this._price, String(value) + ' ₽');
      }
    }
  }

  set id(value: string) {
    this._id = value;
  }

  set buttonDisabled(value: boolean) {
    this.setBasketState(value);
  }
}