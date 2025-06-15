# apollo-cache-bug-repro

## How to run

```bash
npm install
npm run dev
```

## How to reproduce

### Stale cache after calling `client.clearStore()`

1. Login as user-1
2. Logout
3. Login as user-2

=> The cache is stale and the query returns the wrong user.
Expected: the query returns `undefined`.

### Stale cache after calling `client.cache.updateQuery()`

1. Login as user-1
2. Logout
3. Click "Alter cache"
4. Login as user-2

=> The cache is stale and the query returns the wrong user.
Expected: the query returns `user-3`.
