export class Phone {
    private readonly _value: string;

    constructor(value: string) {
        const normalized = Phone.normalize(value);
        if (!Phone.validate(normalized)) {
            // TODO: replace with a custom domain error (e.g. InvalidPhoneError)
            throw new Error("Invalid phone");
        }
        this._value = normalized;
    }

    public get value(): string {
        return this._value;
    }

    public equals(other: unknown): boolean {
        return other instanceof Phone && other._value === this._value;
    }

    private static normalize(value: string): string {
        return value.replace(/\D/g, "");
    }

    private static validate(value: string): boolean {
        // Brazilian national format: 2-digit area code + 8 or 9 digits.
        // TODO: decide how to handle country code (+55) on input
        return /^[1-9][0-9]{9,10}$/.test(value);
    }
}
