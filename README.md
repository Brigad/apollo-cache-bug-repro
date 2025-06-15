# apollo-cache-bug-repro

## How to run

```bash
npm install
npm run dev
```

## How to reproduce

The project highlights a bug in Apollo Client where `useQuery` will return stale data after setting `skip: true`, calling `client.clearStore()` or `client.cache.updateQuery()`, and setting `skip: false`.

This happens in a real-world application where the user is logged out and the query is skipped. When the user logs in again, stale data is returned matching the previous user.

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
