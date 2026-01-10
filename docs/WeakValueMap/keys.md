# keys

```ts
function WeakValueMap<K, V>.keys(): IterableIterator<K>
```

Returns an iterator of keys for each entry in the map. Only includes keys whose values have not been garbage collected.

## Example

```ts
type User = { id: string; name: string }

const user1: User = { id: "user-1", name: "Alice" }
const user2: User = { id: "user-2", name: "Bob" }

const cache = new WeakValueMap<string, User>()
cache.set("user-1", user1)
cache.set("user-2", user2)

for (const key of cache.keys()) {
    console.log(key)
}
// "user-1"
// "user-2"
```
