import { IEvents } from "../base/events";
import { Form } from "./Form";

export class Payment extends Form {

    protected _paymentCard: HTMLButtonElement;
    protected _paymentCash: HTMLButtonElement
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events)

        this._address = container.querySelector('input[name="address"]') as HTMLInputElement
        this._paymentCard = container.querySelector('button[name="card"]');
        this._paymentCash = container.querySelector('button[name="cash"]')

        this._paymentCard.addEventListener('click', () => {
            // visually switch locally first
            this.switchPayment(this._paymentCard);
            this._paymentCard.setAttribute('aria-pressed', 'true');
            this._paymentCash.setAttribute('aria-pressed', 'false');
            this.events.emit('order:change', {
                payment: this._paymentCard.name,
                button: this._paymentCard
            })
        })

        this._paymentCash.addEventListener('click', () => {
            this.switchPayment(this._paymentCash);
            this._paymentCash.setAttribute('aria-pressed', 'true');
            this._paymentCard.setAttribute('aria-pressed', 'false');
            this.events.emit('order:change', {
                payment: this._paymentCash.name,
                button: this._paymentCash

            })
        })

        // initialize default payment: card/online selected
        this.switchPayment(this._paymentCard);
        this._paymentCard.setAttribute('aria-pressed', 'true');
        this._paymentCash.setAttribute('aria-pressed', 'false');

        this._address.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            this.events.emit('address:input', {address: target.value});
            if (!target.value) {
                this.errors = 'Введите адрес доставки'
            } else {
                this.errors = ''
            }
        });
    }

    set address(value: string) {
        this.setText(this._address, value)
    }

    switchPayment(value: HTMLElement) {
        this.resetPayment()
        this.toggleClass(value, 'button_alt-active', true)
    }

    resetPayment() {
        this.toggleClass(this._paymentCard, 'button_alt-active', false);
        this.toggleClass(this._paymentCash, 'button_alt-active', false)
        this._paymentCard.setAttribute('aria-pressed', 'false');
        this._paymentCash.setAttribute('aria-pressed', 'false');
    }

    clearPayment() {
        this._address.value = ''
        this.resetPayment()
        this.valid = false
    }
}