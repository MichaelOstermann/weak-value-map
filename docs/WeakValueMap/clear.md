# clear

```ts
function WeakValueMap.clear(): void
```

Removes all entries from the map.

## Example

```ts
type User = { id: string; name: string }

const user1: User = { id: "user-1", name: "Alice" }
const user2: User = { id: "user-2", name: "Bob" }

const cache = new WeakValueMap<string, User>()
cache.set("user-1", user1)
cache.set("user-2", user2)

console.log(cache.size) // 2
cache.clear()
console.log(cache.size) // 0
```
