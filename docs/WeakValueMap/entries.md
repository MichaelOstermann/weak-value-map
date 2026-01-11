# entries

```ts
function WeakValueMap<K, V>.entries(): IterableIterator<[K, V]>
```

Returns an iterator of `[key, value]` pairs for each entry in the map. Only includes entries whose values have not been garbage collected.

## Example

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
