export class Transaction {
  constructor(
    id: string,
    amount: number,
    country: string,
    partner: string,
    date: string
  ) {
    this.id = id;
    this.amount = amount;
    this.country = country;
    this.partner = partner;
    this.date = date;
  }
  id!: string;
  amount!: number;
  country!: string;
  partner!: string;
  date!: string;
}
