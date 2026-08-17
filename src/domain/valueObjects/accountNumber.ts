export class AccountNumber {
    private readonly _number: string;
    private readonly _checkDigit: string;
    private readonly _branchNumber: string;

    constructor(number: string, checkDigit: string, branchNumber: string) {
        const normalizedNumber = AccountNumber.normalize(number);
        const normalizedCheckDigit = AccountNumber.normalize(checkDigit);
        const normalizedBranchNumber = AccountNumber.normalize(branchNumber);
        if (
            !AccountNumber.validate(normalizedNumber, normalizedCheckDigit, normalizedBranchNumber)
        ) {
            // TODO: replace with a custom domain error (e.g. InvalidAccountNumberError)
            throw new Error("Invalid account number");
        }
        this._number = normalizedNumber;
        this._checkDigit = normalizedCheckDigit;
        this._branchNumber = normalizedBranchNumber;
    }

    public get number(): string {
        return this._number;
    }

    public get checkDigit(): string {
        return this._checkDigit;
    }

    public get branchNumber(): string {
        return this._branchNumber;
    }

    public equals(other: unknown): boolean {
        return (
            other instanceof AccountNumber &&
            other._number === this._number &&
            other._checkDigit === this._checkDigit &&
            other._branchNumber === this._branchNumber
        );
    }

    private static normalize(value: string): string {
        return value.trim();
    }

    private static validate(number: string, checkDigit: string, branchNumber: string): boolean {
        // TODO: check digit algorithm is bank-specific; only format is validated here
        return (
            /^\d{1,12}$/.test(number) && /^\d$/.test(checkDigit) && /^\d{1,5}$/.test(branchNumber)
        );
    }
}
