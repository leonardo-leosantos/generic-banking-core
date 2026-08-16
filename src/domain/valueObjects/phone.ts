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
        // TODO: validate phone format (DDD + number length)
        return value.length > 0;
    }
}
