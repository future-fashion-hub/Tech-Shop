export interface ICard {
  id: string,
  description: string;
  image: string,
  title: string,
  category: string,
  price: number,
}

export interface IForm {
  payment: string,
  address: string,
  email: string,
  phone: string,
  total: number,
  items: string[]
}

export interface IFormUserData {
  payment: string,
  address: string,
  email: string,
  phone: string,
}

export interface IFormState {
  valid: boolean
  submit: HTMLButtonElement,
  errors: HTMLElement
}

export interface IPage {
  catalog: HTMLElement[];
  counter: number;
}

export interface IPopup {
  closeButton?: HTMLButtonElement;
  content: HTMLElement;
}

export interface ISuccess {
  total: HTMLElement,
  close: HTMLButtonElement
}

export interface IBasket {
  basketItems: HTMLElement[], 
  totalPrice: number,
  orderButton: HTMLButtonElement 
}

export type TPaymentMethod = 'card' | 'cash'