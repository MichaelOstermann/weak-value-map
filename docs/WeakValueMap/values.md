# values

```ts
function WeakValueMap<K, V>.values(): IterableIterator<V>
```

Returns an iterator of values for each entry in the map. Only includes values that have not been garbage collected.

## Example

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
