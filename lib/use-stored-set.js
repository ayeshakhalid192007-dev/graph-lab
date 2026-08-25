"use client";
import { useCallback, useMemo, useSyncExternalStore } from "react";
/**
 * A set of strings persisted to localStorage, read as an external store.
 *
 * Two surfaces need this — reading progress across the 17 steps, and the seven
 * Graph Ready criteria — and both are C6 features: the reader's own machine, no
 * account, nothing sent anywhere.
 *
 * Read with useSyncExternalStore rather than the read-on-mount effect the plan
 * sketches. The effect version works, but it sets state synchronously in the
 * effect body, which is the `react-hooks/set-state-in-effect` error Loop 2 already
 * repaired once as R2. This is the same fix: React reads the server snapshot
 * during hydration and the real value straight after, with no cascading render,
 * and the subscription makes two open tabs agree for free.
 *
 * The snapshot is the raw JSON *string*, not a parsed Set: getSnapshot is compared
 * with Object.is on every render, so returning a fresh object would loop forever.
 */
const SERVER_SNAPSHOT = "[]";
function subscribe(key) {
    return (onChange) => {
        const handler = (event) => {
            if (event.type === "storage" && event.key !== key)
                return;
            onChange();
        };
        window.addEventListener("storage", handler);
        window.addEventListener(`graph-lab:store:${key}`, handler);
        return () => {
            window.removeEventListener("storage", handler);
            window.removeEventListener(`graph-lab:store:${key}`, handler);
        };
    };
}
export function useStoredSet(key) {
    const raw = useSyncExternalStore(useMemo(() => subscribe(key), [key]), useCallback(() => {
        try {
            return localStorage.getItem(key) ?? SERVER_SNAPSHOT;
        }
        catch {
            return SERVER_SNAPSHOT; // storage disabled — behave as if nothing is stored
        }
    }, [key]), () => SERVER_SNAPSHOT);
    const values = useMemo(() => {
        try {
            const parsed = JSON.parse(raw);
            return new Set(Array.isArray(parsed) ? parsed.map(String) : []);
        }
        catch {
            return new Set(); // corrupt value — start clean rather than throwing
        }
    }, [raw]);
    const write = useCallback((next) => {
        try {
            localStorage.setItem(key, JSON.stringify([...next]));
        }
        catch {
            // Storage full or blocked. The UI still updates for this render pass; it
            // just will not survive a reload, which beats throwing on a checkbox.
        }
        window.dispatchEvent(new Event(`graph-lab:store:${key}`));
    }, [key]);
    const toggle = useCallback((value) => {
        const next = new Set(values);
        if (next.has(value))
            next.delete(value);
        else
            next.add(value);
        write(next);
    }, [values, write]);
    const clear = useCallback(() => write(new Set()), [write]);
    return { values, toggle, clear };
}
