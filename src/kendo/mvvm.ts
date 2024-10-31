export class RegisterKendoExtensions {
    public static register() {
        if (!window["kendoExtensionsLoaded"]) {
            window["kendoExtensionsLoaded"] = true;
            
            kendo.data.ObservableArray.prototype.findIndex = function (predicate: (value: any, index: number, obj: any[]) => boolean): number {
                return this.toJSON().findIndex(predicate);
            }

            kendo.data.ObservableArray.prototype.flatMap = function<T> (predicate: (currentValue: any, index?: number, array?: any[]) => T): T[] { 
                return this.toJSON().flatMap(predicate);
            }
        }
    }
}

export class KendoViewModel<TViewModel> extends kendo.data.ObservableObject {
    get: <Key extends string & keyof TViewModel>(name: Key) => any;
    set: <Key extends string & keyof TViewModel>(name: Key, value: any) => void;

    getAny = (name: string) => {
        return (this as any).get(name);
    };

    setAny = (name: string, value: any) => {
        (this as any).set(name, value);
    };

    protected initSuper(value?: any) {
        super.init(value);
     }
}