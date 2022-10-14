declare namespace kendo {
    namespace data {
        interface ObservableArray {
            findIndex: (predicate: (value: any, index: number, obj: any[]) => boolean) => number;
            flatMap: <T>(predicate: (currentValue: any, index: number, array: any[]) => T) => T[];
        }
    }
}