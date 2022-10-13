interface Breakpoints {
    breakpointXS: number;
    breakpointSM: number;
    breakpointMD: number;
    breakpointLG: number;
    breakpointXL: number;
}

class Variables {
    breakpoints: Breakpoints;

    constructor() {
        this.init();
    }

    private init(): void {
        this.setBreakpoints();
    }

    private setBreakpoints(): void {
        this.breakpoints = {
            breakpointXS: parseInt($(':root').css('--breakpoint-xs'), 10),
            breakpointSM: parseInt($(':root').css('--breakpoint-sm'), 10),
            breakpointMD: parseInt($(':root').css('--breakpoint-md'), 10),
            breakpointLG: parseInt($(':root').css('--breakpoint-lg'), 10),
            breakpointXL: parseInt($(':root').css('--breakpoint-xl'), 10)
        };
    }
}

export const globalVariables = new Variables();