---
aside: true
---

# weak-value-map

<Badge type="info" class="size">
    <span>Minified</span>
    <span>1009 B</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>389 B</span>
</Badge>

**A map with weakly-held values.**

## Example

```ts
import { WeakValueMap } from "@monstermann/weak-value-map";

type User = { id: string; name: string };

const user1: User = { id: "user-1", name: "Alice" };
const user2: User = { id: "user-2", name: "Bob" };

// Create a cache that won't prevent garbage collection of user objects
const cache = new WeakValueMap<string, User>();

cache.set("user-1", user1);
cache.set("user-2", user2);

console.log(cache.get("user-1")); // { id: "user-1", name: "Alice" }
console.log(cache.has("user-2")); // true

// When user objects are no longer referenced elsewhere,
// they are garbage collected and automatically removed from the cache
```

## Installation

::: code-group

```sh [npm]
npm install @monstermann/weak-value-map
```

```sh [pnpm]
pnpm add @monstermann/weak-value-map
```

```sh [yarn]
yarn add @monstermann/weak-value-map
```

```sh [bun]
bun add @monstermann/weak-value-map
```

:::
