import { IEvents } from "../base/events";
import { Form } from "./Form";


export class Contacts extends Form {

    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events)

        
        this._email = this.container.querySelector('input[name="email"]'); 
        this._phone = this.container.querySelector('input[name="phone"]');

        this._email.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            this.events.emit('email:input', {email: target.value})
            if (!target.value) {
                this.errors = "Введите email"
            } else {
                this.errors = ""
            }
        })

        this._phone.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            this.events.emit('phone:input', {phone: target.value})
            if (!target.value) {
                this.errors = "Введите телефон"
            } else {
                this.errors = ""
            }
        })

    }

    set email(value: string) {
        this.setText(this._email, value)
    }

    set phone(value: string) {
        this.setText(this._phone, value)
    }

    clearContacts() {
        this._email.value = ''
        this._phone.value = ''
        this.valid = false
    }
}