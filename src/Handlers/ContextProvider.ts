
export interface ContextProvider<T> {
    context: T;
    execute(): Promise<void>;
}

export function isContextProviderHandler<T>(obj: any): obj is ContextProvider<T> {
    return 'context' in obj && 'execute' in obj && typeof obj.execute === 'function';
}