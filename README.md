<div align="center">

<h1>weak-value-map</h1>

![Minified](https://img.shields.io/badge/Minified-1009_B-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff) ![Minzipped](https://img.shields.io/badge/Minzipped-389_B-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff)

**A map with weakly-held values.**

[Documentation](https://MichaelOstermann.github.io/weak-value-map)

</div>

## Example

```ts
import { WeakValueMap } from "@monstermann/weak-value-map";

type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

// Create a cache that won't prevent garbage collection of user objects
const cache = new WeakValueMap<string, User>();

cache.set("user-1", user1);
cache.set("user-2", user2);

console.log(cache.get("user-1")); // { id: "user-1", name: "Alice" }
console.log(cache.has("user-2")); // true

// When user objects are no longer referenced elsewhere,
// they are garbage collected and automatically removed from the cache
```

## Installation

```sh [npm]
npm install @monstermann/weak-value-map
```

```sh [pnpm]
pnpm add @monstermann/weak-value-map
```

```sh [yarn]
yarn add @monstermann/weak-value-map
```

```sh [bun]
bun add @monstermann/weak-value-map
```

## WeakValueMap

### clear

```ts
function WeakValueMap.clear(): void
```

Removes all entries from the map.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

console.log(cache.size); // 2
cache.clear();
console.log(cache.size); // 0
```

### constructor

```ts
function new WeakValueMap<K, V extends WeakKey>(
    entries?: Iterable<readonly [K, V]> | null
): WeakValueMap<K, V>
```

Creates a new WeakValueMap instance, optionally initialized with entries.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

// Create an empty map
const cache = new WeakValueMap<string, User>();

// Create a map with initial entries
const cache2 = new WeakValueMap<string, User>([
    ["user-1", user1],
    ["user-2", user2],
]);
```

### delete

```ts
function WeakValueMap<K, V>.delete(key: K): boolean
```

Removes the entry with the specified key from the map. Returns `true` if an entry was removed, `false` otherwise.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);

console.log(cache.delete("user-1")); // true
console.log(cache.delete("user-1")); // false (already deleted)
console.log(cache.has("user-1")); // false
```

### entries

```ts
function WeakValueMap<K, V>.entries(): IterableIterator<[K, V]>
```

Returns an iterator of `[key, value]` pairs for each entry in the map. Only includes entries whose values have not been garbage collected.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

for (const [key, value] of cache.entries()) {
    console.log(key, value);
}
// "user-1" { id: "user-1", name: "Alice" }
// "user-2" { id: "user-2", name: "Bob" }
```

### forEach

```ts
function WeakValueMap<K, V>.forEach(
    callback: (value: V, key: K, map: WeakValueMap<K, V>) => void,
    thisArg?: any
): void
```

Executes a provided function once for each entry in the map. Only includes entries whose values have not been garbage collected.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

cache.forEach((value, key) => {
    console.log(key, value.name);
});
// "user-1" "Alice"
// "user-2" "Bob"
```

### get

```ts
function WeakValueMap<K, V>.get(key: K): V | undefined
```

Returns the value associated with the specified key, or `undefined` if the key doesn't exist or the value has been garbage collected.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);

console.log(cache.get("user-1")); // { id: "user-1", name: "Alice" }
console.log(cache.get("user-2")); // undefined
```

### has

```ts
function WeakValueMap<K, V>.has(key: K): boolean
```

Returns `true` if an entry with the specified key exists and its value has not been garbage collected, otherwise `false`.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);

console.log(cache.has("user-1")); // true
console.log(cache.has("user-2")); // false
```

### keys

```ts
function WeakValueMap<K, V>.keys(): IterableIterator<K>
```

Returns an iterator of keys for each entry in the map. Only includes keys whose values have not been garbage collected.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

for (const key of cache.keys()) {
    console.log(key);
}
// "user-1"
// "user-2"
```

### set

```ts
function WeakValueMap<K, V>.set(key: K, value: V): WeakValueMap<K, V>
```

Adds or updates an entry in the map with the specified key and value. Returns the map instance for chaining.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();

cache.set("user-1", user1);
cache.set("user-2", user2);

// Method chaining
cache.set("user-1", user1).set("user-2", user2);
```

### size

```ts
const WeakValueMap.size: number
```

Returns the number of entries in the map. Note that this does not trigger cleanup of garbage-collected values, so the size may include entries whose values have been collected but not yet finalized.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

console.log(cache.size); // 2
```

### Symbol.iterator

```ts
function WeakValueMap[Symbol.iterator]<K, V>(): IterableIterator<[K, V]>
```

Returns an iterator of `[key, value]` pairs for each entry in the map. This makes the map iterable with `for...of` loops. Only includes entries whose values have not been garbage collected.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

for (const [key, value] of cache) {
    console.log(key, value);
}
// "user-1" { id: "user-1", name: "Alice" }
// "user-2" { id: "user-2", name: "Bob" }
```

### values

```ts
function WeakValueMap<K, V>.values(): IterableIterator<V>
```

Returns an iterator of values for each entry in the map. Only includes values that have not been garbage collected.

#### Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

for (const value of cache.values()) {
    console.log(value);
}
// { id: "user-1", name: "Alice" }
// { id: "user-2", name: "Bob" }
```
