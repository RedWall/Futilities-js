declare namespace kendo {
    namespace data {
        interface ObservableArray {
            findIndex: (predicate: (value: any, index: number, obj: any[]) => boolean) => number;
        }
    }
}