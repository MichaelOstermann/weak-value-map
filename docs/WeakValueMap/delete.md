# delete

```ts
function WeakValueMap<K, V>.delete(key: K): boolean
```

Removes the entry with the specified key from the map. Returns `true` if an entry was removed, `false` otherwise.

## Example

```ts
type User = { id: string; name: string }

const user1: User = { id: "user-1", name: "Alice" }

const cache = new WeakValueMap<string, User>()
cache.set("user-1", user1)

console.log(cache.delete("user-1")) // true
console.log(cache.delete("user-1")) // false (already deleted)
console.log(cache.has("user-1")) // false
```
