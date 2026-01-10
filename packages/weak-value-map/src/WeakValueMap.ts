export class WeakValueMap<K, V extends WeakKey> {
    /**
     * Returns the number of entries in the map. Note that this does not trigger cleanup of garbage-collected values, so the size may include entries whose values have been collected but not yet finalized.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * console.log(cache.size) // 2
     * ```
     */
    get size(): number {
        return this.data.size
    }

    private data = new Map<K, WeakRef<V>>()

    private registry = new FinalizationRegistry<{ key: K, ref: WeakRef<V> }>(
        ({ key, ref }) => {
            if (this.data.get(key) === ref) {
                this.data.delete(key)
            }
        },
    )

    /**
     * Creates a new WeakValueMap instance, optionally initialized with entries.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * // Create an empty map
     * const cache = new WeakValueMap<string, User>()
     *
     * // Create a map with initial entries
     * const cache2 = new WeakValueMap<string, User>([
     *     ["user-1", user1],
     *     ["user-2", user2],
     * ])
     * ```
     */
    constructor(entries?: Iterable<readonly [K, V]> | null) {
        if (entries != null) {
            for (const [key, value] of entries) {
                this.set(key, value)
            }
        }
    }

    /**
     * Removes all entries from the map.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * console.log(cache.size) // 2
     * cache.clear()
     * console.log(cache.size) // 0
     * ```
     */
    clear(): void {
        for (const ref of this.data.values()) {
            this.registry.unregister(ref)
        }
        this.data.clear()
    }

    /**
     * Removes the entry with the specified key from the map. Returns `true` if an entry was removed, `false` otherwise.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     *
     * console.log(cache.delete("user-1")) // true
     * console.log(cache.delete("user-1")) // false (already deleted)
     * console.log(cache.has("user-1")) // false
     * ```
     */
    delete(key: K): boolean {
        const ref = this.data.get(key)
        if (ref) this.registry.unregister(ref)
        return this.data.delete(key)
    }

    /**
     * Returns an iterator of `[key, value]` pairs for each entry in the map. Only includes entries whose values have not been garbage collected.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * for (const [key, value] of cache.entries()) {
     *     console.log(key, value)
     * }
     * // "user-1" { id: "user-1", name: "Alice" }
     * // "user-2" { id: "user-2", name: "Bob" }
     * ```
     */
    * entries(): IterableIterator<[K, V]> {
        for (const [key, ref] of this.data.entries()) {
            const value = ref.deref()
            if (value !== undefined) {
                yield [key, value]
            }
        }
    }

    /**
     * Executes a provided function once for each entry in the map. Only includes entries whose values have not been garbage collected.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * cache.forEach((value, key) => {
     *     console.log(key, value.name)
     * })
     * // "user-1" "Alice"
     * // "user-2" "Bob"
     * ```
     */
    forEach(
        callback: (value: V, key: K, map: WeakValueMap<K, V>) => void,
        thisArg?: any,
    ): void {
        for (const [key, value] of this.entries()) {
            callback.call(thisArg, value, key, this)
        }
    }

    /**
     * Returns the value associated with the specified key, or `undefined` if the key doesn't exist or the value has been garbage collected.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     *
     * console.log(cache.get("user-1")) // { id: "user-1", name: "Alice" }
     * console.log(cache.get("user-2")) // undefined
     * ```
     */
    get(key: K): V | undefined {
        return this.data.get(key)?.deref()
    }

    /**
     * Returns `true` if an entry with the specified key exists and its value has not been garbage collected, otherwise `false`.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     *
     * console.log(cache.has("user-1")) // true
     * console.log(cache.has("user-2")) // false
     * ```
     */
    has(key: K): boolean {
        return this.data.get(key)?.deref() !== undefined
    }

    /**
     * Returns an iterator of keys for each entry in the map. Only includes keys whose values have not been garbage collected.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * for (const key of cache.keys()) {
     *     console.log(key)
     * }
     * // "user-1"
     * // "user-2"
     * ```
     */
    * keys(): IterableIterator<K> {
        for (const [key, ref] of this.data.entries()) {
            if (ref.deref() !== undefined) {
                yield key
            }
        }
    }

    /**
     * Adds or updates an entry in the map with the specified key and value. Returns the map instance for chaining.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     *
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * // Method chaining
     * cache.set("user-1", user1).set("user-2", user2)
     * ```
     */
    set(key: K, value: V): this {
        const oldRef = this.data.get(key)
        if (oldRef) this.registry.unregister(oldRef)
        const ref = new WeakRef(value)
        this.data.set(key, ref)
        this.registry.register(value, { key, ref }, ref)
        return this
    }

    /**
     * Returns an iterator of `[key, value]` pairs for each entry in the map. This makes the map iterable with `for...of` loops. Only includes entries whose values have not been garbage collected.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * for (const [key, value] of cache) {
     *     console.log(key, value)
     * }
     * // "user-1" { id: "user-1", name: "Alice" }
     * // "user-2" { id: "user-2", name: "Bob" }
     * ```
     */
    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries()
    }

    /**
     * Returns an iterator of values for each entry in the map. Only includes values that have not been garbage collected.
     *
     * ## Example
     *
     * ```ts
     * type User = { id: string; name: string }
     *
     * const user1: User = { id: "user-1", name: "Alice" }
     * const user2: User = { id: "user-2", name: "Bob" }
     *
     * const cache = new WeakValueMap<string, User>()
     * cache.set("user-1", user1)
     * cache.set("user-2", user2)
     *
     * for (const value of cache.values()) {
     *     console.log(value)
     * }
     * // { id: "user-1", name: "Alice" }
     * // { id: "user-2", name: "Bob" }
     * ```
     */
    * values(): IterableIterator<V> {
        for (const ref of this.data.values()) {
            const value = ref.deref()
            if (value !== undefined) {
                yield value
            }
        }
    }
}
