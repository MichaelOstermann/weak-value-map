<div align="center">

<h1>weak-value-map</h1>

**A map with weakly-held values.**

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

```sh
bun add @monstermann/weak-value-map
```

## API

`WeakValueMap<K, V>` has the interface of a `Map` whose values are objects: `get`, `set`, `has`, `delete`, `clear`, `size`, `keys`, `values`, `entries`, `forEach` and iteration. Everything is documented with JSDoc, including examples.

An entry disappears once its value has been garbage collected. `size` can still count such an entry for a short while, until its finalizer has run.
