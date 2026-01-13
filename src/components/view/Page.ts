
import { IPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";



export class Page extends Component<IPage> {
  protected _pageCatalog: HTMLElement;
  protected _basketCounter: HTMLElement;
  protected _pageWrapper: HTMLElement;
  protected _basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._pageCatalog = ensureElement('.gallery', this.container)
    this._basketCounter = ensureElement('.header__basket-counter', this.container)
    this._pageWrapper = ensureElement('.page__wrapper', this.container) 
    this._basketButton = ensureElement('.header__basket', this.container) as HTMLButtonElement

    this._basketButton.addEventListener('click', () => {
      this.events.emit('basket:open')
    })
  }

  set catalog(items: HTMLElement[]) {
    this._pageCatalog.replaceChildren(...items);
  }

  set counter(value: number) {
    this.setText(this._basketCounter, value)
  }

  set locked(value: boolean) {
    this.toggleClass(this._pageWrapper, 'page__wrapper_locked', value)
  }
}