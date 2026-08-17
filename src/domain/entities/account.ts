import type { AccountNumber } from "../valueObjects/accountNumber.js";
import type { Money } from "../valueObjects/money.js";

export type AccountType = "standard" | "premium" | "savings";

export interface AccountProps {
    id: string;
    customerId: string;
    accountNumber: AccountNumber;
    type: AccountType;
    balance: Money;
    overdraftLimit: Money;
    name?: string;
}

export class Account {
    private readonly _id: string;
    private readonly _customerId: string;
    private readonly _accountNumber: AccountNumber;
    private readonly _type: AccountType;
    private readonly _name: string | undefined;
    private readonly _overdraftLimit: Money;
    private _balance: Money;

    constructor(props: AccountProps) {
        this._id = props.id;
        this._customerId = props.customerId;
        this._accountNumber = props.accountNumber;
        this._type = props.type;
        this._name = props.name;
        this._overdraftLimit = props.overdraftLimit;
        this._balance = props.balance;
    }

    public get id(): string {
        return this._id;
    }

    public get customerId(): string {
        return this._customerId;
    }

    public get accountNumber(): AccountNumber {
        return this._accountNumber;
    }

    public get type(): AccountType {
        return this._type;
    }

    public get name(): string | undefined {
        return this._name;
    }

    public get balance(): Money {
        return this._balance;
    }

    public get overdraftLimit(): Money {
        return this._overdraftLimit;
    }

    // Balance is never set directly: it only changes through debit/credit,
    // driven by the processing of a valid Transaction.
    public debit(amount: Money): void {
        if (!amount.isPositive()) {
            // TODO: replace with a custom domain error
            throw new Error("Debit amount must be positive");
        }
        // TODO: (balance + overdraftLimit) >= amount is enforced by the TransferDomainService
        this._balance = this._balance.subtract(amount);
    }

    public credit(amount: Money): void {
        if (!amount.isPositive()) {
            // TODO: replace with a custom domain error
            throw new Error("Credit amount must be positive");
        }
        this._balance = this._balance.add(amount);
    }
}
