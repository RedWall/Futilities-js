import { globalVariables } from "../bootstrap/variables";
import { isNullOrWhitespace } from "../utils/stringUtils";

interface WindowSettings {
    maxHeight: number;
    maxWidth: number;
    height: string | number;
    width: string | number;
    position: kendo.ui.WindowPosition;
    currentHeight: number;
}

export class KendoWindowHelper {
    public static openMax(windowSelector: string, title: string | null = null, closeEvent: Function | null = null): kendo.ui.Window {
        const kwin = $(windowSelector).data('kendoWindow');

        kwin.element.addClass('do-not-resize');

        if (!isNullOrWhitespace(title))
            kwin.title(title as string);

        if (closeEvent !== null)
            kwin.bind('close', closeEvent);

        kwin.open().maximize();

        return kwin;
    }

    private static windowSettings: Map<string, WindowSettings> = new Map();

    public static open(window: string, title?: string, closeEvent?: Function): kendo.ui.Window;
    public static open(window: kendo.ui.Window, title?: string, closeEvent?: Function): kendo.ui.Window;
    public static open(window: JQuery<HTMLElement>, title?: string, closeEvent?: Function): kendo.ui.Window;
    public static open(window, title?: string, closeEvent?: Function): kendo.ui.Window {

        let kwin: kendo.ui.Window | null = null;

        if (typeof window === 'string') {
            kwin = $(window as string).data("kendoWindow");
        } else if (window instanceof kendo.ui.Window) {
            kwin = window as kendo.ui.Window;
        } else if (window instanceof jQuery) {
            kwin = (window as JQuery<HTMLElement>).data("kendoWindow");
        } else {
            throw "window must be a selector or kendo.ui.window";
        }

        return KendoWindowHelper.openWindow(kwin, title, closeEvent);
    }

    public static checkAndResetWindowPosition = () => {
        $("[data-role='window']").each((idx, elem) => {
            const kwin = $(elem).data("kendoWindow");

            if (kwin && !kwin.element.is(":hidden") && !kwin.element.is('.do-not-resize')) {
                KendoWindowHelper.setPosition(kwin, false);
            }
        });
    }

    public static closeAllWindows() {

        $("[data-role='window']").each(function () {
            const kwin = $(this).data("kendoWindow");
            if (kwin) {
                kwin.close();
            }
        });
    }

    public static Confirm(message: string, windowTitle: string, okText: string, cancelText: string, dialogClass: string): JQueryPromise<any> {
        return $('<div></div>').addClass(dialogClass).kendoConfirm({
            title: windowTitle,
            content: message,
            messages: {
                okText: okText,
                cancel: cancelText
            }
        }).data('kendoConfirm').open().result;
    };

    private static openWindow(kwin: kendo.ui.Window, title: string | null = null, closeEvent: Function | null = null): kendo.ui.Window {

        if (!isNullOrWhitespace(title))
            kwin.title(title as string);

        if (closeEvent !== null)
            kwin.bind('close', closeEvent);

        KendoWindowHelper.setPosition(kwin, true);

        return kwin;
    };


    private static setPosition(kwin: kendo.ui.Window, openWindow = false) {
        const originalSettings = this.getOrCreateOriginalSettings(kwin);

        let totalWindowHeight = ($(kwin.element[0]).parents('.k-window')?.height() ?? 0) + 40;

        if (kwin.isMaximized()) {
            totalWindowHeight = originalSettings.currentHeight;
        }

        const widthGreaterThanBreakpoint = ((window.innerWidth || document.body.clientWidth) > globalVariables.breakpoints.breakpointMD) && (kwin.element[0].clientWidth < window.innerWidth);
        const heightGreaterThanBreakpoint = ((window.innerHeight || document.body.clientHeight) > totalWindowHeight);

        if (widthGreaterThanBreakpoint && heightGreaterThanBreakpoint) {

            kwin.setOptions(originalSettings);

            if (openWindow) {
                kwin.restore().center().open();
            } else {
                kwin.restore().center();
            }

        } else {

            kwin.setOptions(KendoWindowHelper.maximizedWindowSettings);

            if (openWindow) {
                kwin.open().maximize();
            } else {
                kwin.maximize();
            }
        }
    }

    private static maximizedWindowSettings = {
        maxHeight: '100%', maxWidth: '100%', height: null, width: null, position: { top: null, left: null }
    };

    private static getOrCreateOriginalSettings(kwin: kendo.ui.Window): WindowSettings {
        let opts = KendoWindowHelper.windowSettings.get(kwin.element.attr('id') as string);

        if (!opts) {
            opts = this.saveOriginalSettings(kwin);
        }

        return opts;
    }

    private static saveOriginalSettings(kwin: kendo.ui.Window): WindowSettings {
        const settings = {
            maxHeight: kwin.options.maxHeight,
            maxWidth: kwin.options.maxWidth,
            height: kwin.options.height,
            width: kwin.options.width,
            position: kwin.options.position,
            currentHeight: ($(kwin.element[0]).parents('.k-window')?.height() ?? 0) + 40
        } as WindowSettings;

        KendoWindowHelper.windowSettings.set(
            kwin.element.attr('id') as string,
            settings);

        return settings;
    }
}