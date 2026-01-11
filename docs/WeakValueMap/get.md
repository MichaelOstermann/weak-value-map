# get

```ts
function WeakValueMap<K, V>.get(key: K): V | undefined
```

Returns the value associated with the specified key, or `undefined` if the key doesn't exist or the value has been garbage collected.

## Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);

console.log(cache.get("user-1")); // { id: "user-1", name: "Alice" }
console.log(cache.get("user-2")); // undefined
```
