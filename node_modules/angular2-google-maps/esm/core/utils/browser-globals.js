export class WindowRef {
    getNativeWindow() { return window; }
}
export class DocumentRef {
    getNativeDocument() { return document; }
}
export const BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
//# sourceMappingURL=browser-globals.js.map