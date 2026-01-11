# has

```ts
function WeakValueMap<K, V>.has(key: K): boolean
```

Returns `true` if an entry with the specified key exists and its value has not been garbage collected, otherwise `false`.

## Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);

console.log(cache.has("user-1")); // true
console.log(cache.has("user-2")); // false
```
