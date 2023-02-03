/**
 * Interface for event model types
 *
 * Only used to enforce a common property name for the type (used to
 * discriminate the type unions)
 */
export interface EventModelWithEventType {
    readonly eventType: string;
}

/**
 * Error to throw from default: statement that should be unreachable
 *
 * The argument should be the switch argument; It will be a type error
 * if it has not been narrowed down to nothnig. And it will be a
 * runtime error if the actual type is different from the declared
 * typescript type.
 */
export class UnreachableCaseError extends Error {
    constructor(val: 'error: Did you forget to handle this type?') {
        super(`Unreachable case: ${JSON.stringify(val)}`);
    }
}