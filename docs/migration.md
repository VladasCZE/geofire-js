# Migration Guides | GeoFire for JavaScript

Below are instructions for migrating from one version of GeoFire to another. If you are upgrading
several versions at once, make sure you follow the migration instructions for all upgrades.

## `6.x.x` to `7.x.x`

GeoFire `7.0.0` introduces modern JavaScript and TypeScript enhancements. As a result, there are two primary breaking changes you need to be aware of:

### Dropped Support for ES5 Environments
To align with modern web standards and TypeScript 7.0 configurations, the GeoFire library is now compiled to `ES2015` (ES6) instead of `ES5`. 
If you are supporting older browsers (like Internet Explorer 11) or legacy execution environments, you will now need to transpile GeoFire yourself using a build pipeline like Babel, Webpack, or Rollup. Otherwise, you may encounter runtime syntax errors when executing the library.

### Stricter TypeScript Signatures
We have fully enabled Strict Mode (`"strict": true`) across the library's TypeScript configuration, which resulted in a breaking signature change for TypeScript consumers to properly enforce null-checking.

**The `GeoFire.get()` return type:**
The `GeoFire.get(key)` method previously typed its return as a guaranteed `Promise<Geopoint>`. However, at runtime, it correctly returns `null` if the key doesn't exist in the database. The signature has now been corrected to `Promise<Geopoint | null>`. 

If you are using TypeScript with `strictNullChecks` enabled, you will need to update your code to safely handle the potential `null` case:

```ts
// GeoFire 6.x.x (could throw a runtime error if key was missing)
const location = await geoFire.get('some_key');
const latitude = location[0]; 

// GeoFire 7.x.x
const location = await geoFire.get('some_key');
if (location !== null) {
  const latitude = location[0];
} else {
  // Handle the missing key scenario
  console.log('Location not found in database');
}
```

### Externalized Firebase Dependency in Bundles
In previous versions, the pre-compiled UMD distribution (`geofire.min.js`) internally bundled its own copy of the Firebase SDK. This caused issues (such as `RangeError: Maximum call stack size exceeded`) when passing a `DatabaseReference` created from an external modern Firebase Modular SDK into GeoFire, due to object structure mismatches.

Starting in `7.0.0`, Firebase is treated strictly as an external `peerDependency` and is **no longer bundled** in the UMD or ESM distributions.

**For ES Module (Bundler or CDN) Users:**
If you are using the Modular SDK via a bundler (like Webpack, Rollup, Vite) or modern CDNs, GeoFire will now safely share the exact same Firebase instance.

```js
// Make sure to install firebase if using NPM/Yarn: npm install firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { GeoFire } from 'geofire';

const app = initializeApp({ /* config */ });
const dbRef = ref(getDatabase(app));
const geoFire = new GeoFire(dbRef);
```

**For UMD Script Users:**
If you are loading the GeoFire UMD build via a `<script>` tag, you must now ensure that Firebase is loaded *before* GeoFire, as GeoFire expects the global `firebase.database` object to be available.

```html
<!-- 1. Load Firebase Compat via CDN -->
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-database-compat.js"></script>

<!-- 2. Load GeoFire (now much smaller and unbundled) -->
<script src="path/to/geofire.min.js"></script>

<script>
  firebase.initializeApp({ /* config */ });
  var dbRef = firebase.database().ref();
  var geoFire = new geofire.GeoFire(dbRef);
</script>
```

## `5.x.x` to `6.x.x`

With the release of GeoFire `6.0.0`, GeoFire now uses the new
[Firebase Modular SDK](https://firebase.blog/posts/2021/07/introducing-the-new-firebase-js-sdk#introducing-firestore-lite). This new SDK is incompatible with previous versions, so if you're still using an older version of the Firebase SDK or our [compat module](https://firebase.google.com/docs/web/modular-upgrade#update_imports_to_v9_compat), please stick to version `5.x.x` of GeoFire.

This change only affects the way you interact with the Firebase SDK, but not how you interact with GeoFire.

For example, this:
```js
// Initialize the Firebase SDK
firebase.initializeApp({
  // ...
});

// Create a Firebase reference where GeoFire will store its information
var firebaseRef = firebase.database().ref();

// Create a GeoFire index
var geoFire = new GeoFire(firebaseRef);
```

Becomes:
```js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";

// Initialize the Firebase SDK
initializeApp({
  // ...
});

// Create a Firebase reference where GeoFire will store its information
var firebaseRef = ref(getDatabase());

// Create a GeoFire index
var geoFire = new GeoFire(firebaseRef);
```

See [Firebase's upgrade guide](https://firebase.google.com/docs/web/modular-upgrade) for more details.

## `3.x.x` to `4.x.x`

Let's start off with the good news: RSVP is no longer required required at all to run GeoFire! That
means you can remove RSVP entirely if you aren't using it elsewhere in your project.

The slightly bad news is that you may need to upgrade your Firebase dependency because GeoFire now
uses [the new promises functionality found in Firebase `2.4.0`](https://firebase.googleblog.com/2016/01/keeping-our-promises-and-callbacks_76.html).
Thankfully, upgrading should be as easy as upgrading the Firebase version you are using to `2.4.0`
or higher (if it isn't already).

For you folks using GeoFire with npm, there is one more change you may have to make. With this
release `firebase` is now a peer dependency of `geofire` instead of a regular dependency. As such,
you will need to make sure `firebase` is listed as a regular dependency alongside `geofire` in your
`package.json` (if it isn't already):

```js
// package.json with GeoFire 3.x.x
{
  // ...
  "dependencies": {
    "geofire": "^3.0.0"
  },
  // ...
}

// package.json with GeoFire 4.x.x
{
  // ...
  "dependencies": {
    "firebase": "^2.4.0",
    "geofire": "^4.0.0"
  },
  // ...
}
```


## `3.0.x` to `3.1.x`

With the release of GeoFire `3.1.0`, GeoFire now uses [the new query functionality found in Firebase
`2.0.0`](https://firebase.googleblog.com/2014/11/firebase-now-with-more-querying.html). As a
result, you will need to upgrade to Firebase `2.x.x` and add a new `.indexOn` rule to your Security
and Firebase Rules to get the best performance. You can view [the updated rules here](../examples/securityRules/rules.json)
and [read our docs for more information about indexing your data](https://firebase.google.com/docs/database/security/indexing-data).


## `2.x.x` to `3.x.x`

GeoFire `3.x.x` has the same API as `2.x.x` but uses a different underlying data structure to store
its location data. If you are currently using `2.x.x` and want to upgrade to `3.x.x`, you must run
the [GeoFire 3.x.x migration script](migration/migrateToV3.js) on your Firebase database. This Node.js script
only needs to be run one time and should take only a few seconds to minutes depending on the size of
your data. To run the script, copy the files in the [`migration/`](migration) folder to your machine and
run the following commands:

```bash
$ npm install              # install needed dependencies
$ node migrateToV3.js      # display usage instructions
```

