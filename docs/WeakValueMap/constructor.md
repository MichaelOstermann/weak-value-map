# constructor

```ts
function new WeakValueMap<K, V extends WeakKey>(
    entries?: Iterable<readonly [K, V]> | null
): WeakValueMap<K, V>
```

Creates a new WeakValueMap instance, optionally initialized with entries.

## Example

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
