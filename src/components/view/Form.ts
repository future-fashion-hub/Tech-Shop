import { IFormState } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";



export class Form extends Component<IFormState> {
    
  protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = this.container.querySelector('button[type="submit"]');
		this._errors = this.container.querySelector('.form__errors');

		this.container.addEventListener('submit', (e) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value; 
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}
	
}
