export class Email {
    private readonly _value: string;

    constructor(value: string) {
        const normalized = Email.normalize(value);
        if (!Email.validate(normalized)) {
            // TODO: replace with a custom domain error (e.g. InvalidEmailError)
            throw new Error("Invalid email");
        }
        this._value = normalized;
    }

    public get value(): string {
        return this._value;
    }

    public equals(other: unknown): boolean {
        return other instanceof Email && other._value === this._value;
    }

    private static normalize(value: string): string {
        return value.trim().toLowerCase();
    }

    private static validate(value: string): boolean {
        // TODO: validate email format
        return value.length > 0;
    }
}
