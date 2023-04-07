# `useClock`

```sh
$ npm i -D @cprecioso/react-use-clock       # if you use npm
$ yarn add --dev @cprecioso/react-use-clock # if you use yarn
```

## `useCurrentTime`

```ts
export const useCurrentTime: (ms?: number) => Date | null;
```

Returns the current time as a `Date` (or a `null` until effects fire).

Accepts an optional parameter, configuring how often you want the returned
`Date` to update. Due to how browsers function, it is not a guaranteed target,
but a best-effort one. The default value is `1000` (each second).

Calls to this hook with the same `ms` parameter will all update at the same time
throughout your app, firing off the same timer. This allows you to use it freely
and not have to worry about e.g. timestamps in different elements updating at
different times.
