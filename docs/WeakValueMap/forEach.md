# forEach

```ts
function WeakValueMap<K, V>.forEach(
    callback: (value: V, key: K, map: WeakValueMap<K, V>) => void,
    thisArg?: any
): void
```

Executes a provided function once for each entry in the map. Only includes entries whose values have not been garbage collected.

## Example

```ts
type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

const cache = new WeakValueMap<string, User>();
cache.set("user-1", user1);
cache.set("user-2", user2);

cache.forEach((value, key) => {
    console.log(key, value.name);
});
// "user-1" "Alice"
// "user-2" "Bob"
```
