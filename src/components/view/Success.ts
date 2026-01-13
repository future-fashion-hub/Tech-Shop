import { ISuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


export class Success extends Component<ISuccess> {

    protected _total: HTMLElement;
    protected _close: HTMLButtonElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)

        this._total = ensureElement('.order-success__description', this.container)
        this._close = ensureElement('.order-success__close', this.container) as HTMLButtonElement

        this._close.addEventListener('click' , () => {
            this.events.emit('success:submit')
        })
    }

    set total(value: number) {
        try {
            this.setText(this._total, `Списано ${value.toLocaleString('ru-RU')} ₽`);
        } catch (e) {
            this.setText(this._total, `Списано ${String(value)} ₽`);
        }
    }

}