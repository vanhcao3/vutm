export function joinHls(base: string, path: string, jwt: string) {
    const stripEnd = (s: string) => s.replace(/\/+$/, "");
    const ensureStart = (s: string) => (s.startsWith("/") ? s: `/${s}`);
    return `${stripEnd(base)}${ensureStart(path)}/?jwt=${encodeURIComponent(jwt)}`;
}