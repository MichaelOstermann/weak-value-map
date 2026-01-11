# size

```ts
const WeakValueMap.size: number
```

Returns the number of entries in the map. Note that this does not trigger cleanup of garbage-collected values, so the size may include entries whose values have been collected but not yet finalized.

## Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

console.log(cache.size); // 2
```
