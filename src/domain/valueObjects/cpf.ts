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
        if (!/^\d{11}$/.test(value)) {
            return false;
        }
        if (/^(\d)\1{10}$/.test(value)) {
            return false;
        }
        return (
            Cpf.computeCheckDigit(value, 9) === Number(value.charAt(9)) &&
            Cpf.computeCheckDigit(value, 10) === Number(value.charAt(10))
        );
    }

    private static computeCheckDigit(value: string, length: number): number {
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += Number(value.charAt(i)) * (length + 1 - i);
        }
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    }
}
