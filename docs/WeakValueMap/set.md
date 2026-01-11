# set

```ts
function WeakValueMap<K, V>.set(key: K, value: V): WeakValueMap<K, V>
```

Adds or updates an entry in the map with the specified key and value. Returns the map instance for chaining.

## Example

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
