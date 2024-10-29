export function OpenPopup(opts: { url: string, title: string, width?: number, height?: number }): Window {
    const win = window;

    opts.width = opts.width ?? win.top.outerWidth;
    opts.height = opts.height ?? win.top.outerHeight;

    const y = win.top.outerHeight / 2 + win.top.screenY - (opts.height / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (opts.width / 2);

    const newWindow = window.open(opts.url, opts.title,
        `
      resizable=yes,
      scrollbars=yes,
      status=yes,
      width=${opts.width},
      height=${opts.height},
      top=${y},
      left=${x}
      `
    )

    if (window.focus) {
        newWindow.focus();
    }

    return newWindow;
}