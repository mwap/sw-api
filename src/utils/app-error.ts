export class AppError extends Error {
    constructor(msg: string, public readonly code: number) {
        super(msg);
    }
}
