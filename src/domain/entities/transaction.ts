import type { Money } from "../valueObjects/money.js";

export type TransactionType = "deposit" | "withdrawal" | "transfer";

export type TransactionStatus = "pending" | "completed" | "refused";

export interface TransactionProps {
    id: string;
    type: TransactionType;
    value: Money;
    fee: Money;
    occurredAt: Date;
    status: TransactionStatus;
    originAccountId?: string;
    destinationAccountId?: string;
}

export class Transaction {
    private readonly _id: string;
    private readonly _type: TransactionType;
    private readonly _value: Money;
    private readonly _fee: Money;
    private readonly _originAccountId: string | undefined;
    private readonly _destinationAccountId: string | undefined;
    private readonly _occurredAt: Date;
    private _status: TransactionStatus;

    constructor(props: TransactionProps) {
        this._id = props.id;
        this._type = props.type;
        this._value = props.value;
        this._fee = props.fee;
        this._originAccountId = props.originAccountId;
        this._destinationAccountId = props.destinationAccountId;
        this._occurredAt = props.occurredAt;
        this._status = props.status;
    }

    public get id(): string {
        return this._id;
    }

    public get type(): TransactionType {
        return this._type;
    }

    public get value(): Money {
        return this._value;
    }

    public get fee(): Money {
        return this._fee;
    }

    public get total(): Money {
        return this._value.add(this._fee);
    }

    public get originAccountId(): string | undefined {
        return this._originAccountId;
    }

    public get destinationAccountId(): string | undefined {
        return this._destinationAccountId;
    }

    public get occurredAt(): Date {
        return this._occurredAt;
    }

    public get status(): TransactionStatus {
        return this._status;
    }

    // TODO: state transitions (pending → completed/refused) when the transfer flow is implemented
}
