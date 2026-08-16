export class Cpf {
    private readonly _value: string;

    constructor(value: string) {
        const normalized = Cpf.normalize(value);
        if (!Cpf.validate(normalized)) {
            // TODO: replace with a custom domain error (e.g. InvalidCpfError)
            throw new Error("Invalid CPF");
        }
        this._value = normalized;
    }

    public get value(): string {
        return this._value;
    }

    public equals(other: unknown): boolean {
        return other instanceof Cpf && other._value === this._value;
    }

    private static normalize(value: string): string {
        return value.replace(/\D/g, "");
    }

    private static validate(value: string): boolean {
        // TODO: validate check digits and reject repeated-digit sequences
        return value.length === 11;
    }
}
