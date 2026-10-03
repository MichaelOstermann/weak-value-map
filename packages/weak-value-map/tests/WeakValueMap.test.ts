import { describe, expect, it } from "bun:test"
import { WeakValueMap } from "../src"

interface User { name: string }

async function collect(done: () => boolean): Promise<void> {
    for (let i = 0; i < 50 && !done(); i++) {
        Bun.gc(true)
        await new Promise(resolve => setTimeout(resolve, 10))
    }
}

describe("WeakValueMap", () => {
    it("should be empty by default", () => {
        const map = new WeakValueMap<string, User>()
        expect(map.size).toBe(0)
        expect(map.get("a")).toBe(undefined)
        expect(map.has("a")).toBe(false)
    })

    it("should take initial entries", () => {
        const a = { name: "a" }
        const b = { name: "b" }
        const map = new WeakValueMap([["a", a], ["b", b]])
        expect(map.size).toBe(2)
        expect(map.get("a")).toBe(a)
        expect(map.get("b")).toBe(b)
    })

    it("should set, get and replace values", () => {
        const a = { name: "a" }
        const b = { name: "b" }
        const map = new WeakValueMap<string, User>()
        expect(map.set("a", a)).toBe(map)
        expect(map.get("a")).toBe(a)
        expect(map.has("a")).toBe(true)

        map.set("a", b)
        expect(map.get("a")).toBe(b)
        expect(map.size).toBe(1)
    })

    it("should delete entries", () => {
        const a = { name: "a" }
        const map = new WeakValueMap([["a", a]])
        expect(map.delete("a")).toBe(true)
        expect(map.delete("a")).toBe(false)
        expect(map.has("a")).toBe(false)
        expect(map.size).toBe(0)
    })

    it("should clear all entries", () => {
        const a = { name: "a" }
        const b = { name: "b" }
        const map = new WeakValueMap([["a", a], ["b", b]])
        map.clear()
        expect(map.size).toBe(0)
        expect(map.get("a")).toBe(undefined)
    })

    it("should iterate in insertion order", () => {
        const a = { name: "a" }
        const b = { name: "b" }
        const map = new WeakValueMap([["a", a], ["b", b]])
        expect([...map.keys()]).toEqual(["a", "b"])
        expect([...map.values()]).toEqual([a, b])
        expect([...map.entries()]).toEqual([["a", a], ["b", b]])
        expect([...map]).toEqual([["a", a], ["b", b]])

        const seen: [User, string, unknown][] = []
        map.forEach((value, key, self) => seen.push([value, key, self]))
        expect(seen).toEqual([[a, "a", map], [b, "b", map]])
    })

    it("should call forEach with the given this", () => {
        const a = { name: "a" }
        const map = new WeakValueMap([["a", a]])
        const self = {}
        const received: unknown[] = []
        map.forEach(function (this: unknown) {
            received.push(this)
        }, self)
        expect(received[0]).toBe(self)
    })

    it("should drop entries whose values were collected", async () => {
        const kept = { name: "kept" }
        const map = new WeakValueMap<string, User>([["kept", kept]])
        ;(() => {
            map.set("dropped", { name: "dropped" })
        })()

        await collect(() => map.size === 1)

        expect(map.has("dropped")).toBe(false)
        expect(map.get("dropped")).toBe(undefined)
        expect([...map.keys()]).toEqual(["kept"])
        expect(map.size).toBe(1)
        expect(map.get("kept")).toBe(kept)
    })

    it("should keep a replaced entry when the old value is collected", async () => {
        const map = new WeakValueMap<string, User>()
        const replacement = { name: "new" }
        ;(() => {
            map.set("a", { name: "old" })
        })()
        map.set("a", replacement)

        await collect(() => false)

        expect(map.get("a")).toBe(replacement)
        expect(map.size).toBe(1)
    })
})
