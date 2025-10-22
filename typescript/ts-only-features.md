# TypeScript only Features

## Class Parameters Properties

...

## Enums

String enums are unique in TypeScript because they're compared nominally. All other types in TypeScript are compared structurally, meaning that two types are considered the same if they have the same structure. But string enums are compared based on their name (nominally), not their structure.

```ts
enum AlbumStatus {
  NewRelease = 0,
  OnSale = 1,
  StaffPick = 2,
}

function logStatus(genre: AlbumStatus) {
  console.log(genre);
}

logStatus(AlbumStatus.NewRelease); // Ok

logStatus(0); // Ok
```


```ts
enum AlbumStatus {
  NewRelease = "NEW_RELEASE",
  OnSale = "ON_SALE",
  StaffPick = "STAFF_PICK",
}

function logStatus(genre: AlbumStatus) {
  console.log(genre);
}

logStatus(AlbumStatus.NewRelease);
logStatus("NEW_RELEASE"); // Error
> Argument of type '"NEW_RELEASE"' is not assignable to parameter of type 'AlbumStatus'.
```

This also means that two string enums with the same members are considered different types if they have different names.

## Namespaces

...


