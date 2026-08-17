export class Money {
    private readonly _amount: number;
    private readonly _currency: string;

    constructor(amount: number, currency: string = "BRL") {
        const normalizedCurrency = Money.normalizeCurrency(currency);
        if (!Money.validate(amount, normalizedCurrency)) {
            // TODO: replace with a custom domain error (e.g. InvalidMoneyError)
            throw new Error("Invalid money: amount must be an integer number of cents");
        }
        this._amount = amount;
        this._currency = normalizedCurrency;
    }

    public get amount(): number {
        return this._amount;
    }

    public get currency(): string {
        return this._currency;
    }

    public add(other: Money): Money {
        this.assertSameCurrency(other);
        return new Money(this._amount + other._amount, this._currency);
    }

    public subtract(other: Money): Money {
        this.assertSameCurrency(other);
        return new Money(this._amount - other._amount, this._currency);
    }

    public isGreaterThanOrEqual(other: Money): boolean {
        this.assertSameCurrency(other);
        return this._amount >= other._amount;
    }

    public isNegative(): boolean {
        return this._amount < 0;
    }

    public isPositive(): boolean {
        return this._amount > 0;
    }

    public equals(other: unknown): boolean {
        return (
            other instanceof Money &&
            other._amount === this._amount &&
            other._currency === this._currency
        );
    }

    private assertSameCurrency(other: Money): void {
        if (other._currency !== this._currency) {
            // TODO: replace with a custom domain error (e.g. CurrencyMismatchError)
            throw new Error("Currency mismatch");
        }
    }

    private static normalizeCurrency(currency: string): string {
        return currency.trim().toUpperCase();
    }

    private static validate(amount: number, currency: string): boolean {
        return Number.isSafeInteger(amount) && /^[A-Z]{3}$/.test(currency);
    }
}
