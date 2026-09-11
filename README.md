# GeoFire for JavaScript [![Actions Status][gh-actions-badge]][gh-actions]
GeoFire is an open-source library that allows you to store and query a set of keys based on their
geographic location. At its heart, GeoFire simply stores locations with string keys. Its main
benefit, however, is the possibility of retrieving only those keys within a given geographic
area - all in realtime.

GeoFire uses the [Firebase Realtime Database](https://firebase.google.com/docs/database/) for data
storage, allowing query results to be updated in realtime as they change. GeoFire *selectively loads
only the data near certain locations, keeping your applications light and responsive*, even with
extremely large datasets.

GeoFire is designed as a lightweight add-on to Firebase. To keep things simple, GeoFire stores data
in its own format and its own location within your Firebase Realtime Database. This allows your existing data
format and Security Rules to remain unchanged while still providing you with an easy solution for geo
queries.

If you're looking to use this library with **Cloud Firestore**, see the documentation on 
[implementing geoqueries on Firestore](https://firebase.google.com/docs/firestore/solutions/geoqueries).

GeoFire is designed as a lightweight add-on to Firebase. To keep things simple, GeoFire stores data

A compatible GeoFire client is also available for [Objective-C](https://github.com/firebase/geofire-objc)
and [Java](https://github.com/firebase/geofire-java).

## Table of Contents

* [Add GeoFire to your project](#add-geofire-to-your-project)
* [Documentation](#documentation)
* [Examples](#examples)
* [Release Notes](https://github.com/VladasCZE/geofire-js/releases)
* [Migration Guides](#migration-guides)
* [Contributing](#contributing)

## Add GeoFire to your project

Since this package is not published on npm, you can install it directly from GitHub along with the Firebase peer dependency:

```bash
$ npm install github:VladasCZE/geofire-js firebase --save
```

### HTML

Alternatively, you can include GeoFire in your HTML. To do so download a minified or non-minified version of GeoFire from the [releases page of this GitHub repository](https://github.com/VladasCZE/geofire-js/releases). Then, deploy it to Hosting in your Firebase project. 

```html
<!-- Firebase (Compat) -->
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-database-compat.js"></script>

<!-- GeoFire -->
<script src="https://my-firebase-project.web.app/geofire-7.0.0.min.js"></script>
```


## Documentation

* [API Reference](docs/reference.md)

## Examples

You can find a full list of our demos and view the code for each of them in the
[examples directory](examples/) of this repository. The examples cover some of the common use
cases for GeoFire and explain how to protect your data using the
[Firebase Database Security Rules](https://firebase.google.com/docs/database/security/).

### Example Usage

Assume you are building an app to rate bars and you store all information for a bar, e.g. name,
business hours and price range, at `/bars/<bar-id>`. Later, you want to add the possibility for
users to search for bars in their vicinity. This is where GeoFire comes in. You can store the
location for each bar using GeoFire, using the bar IDs as GeoFire keys. GeoFire then allows you to
easily query which bar IDs (the keys) are nearby. To display any additional information about the
bars, you can load the information for each bar returned by the query at `/bars/<bar-id>`.

## Migration Guides

Using an older version of GeoFire and want to upgrade to the latest version? Check out our
[migration guides](docs/migration.md) to find out how!

## Contributing

If you'd like to contribute to GeoFire, please first read through our [contribution
guidelines](.github/CONTRIBUTING.md). Local setup instructions are available [here](.github/CONTRIBUTING.md#local-setup).

[gh-actions]: https://github.com/VladasCZE/geofire-js/actions
[gh-actions-badge]: https://github.com/VladasCZE/geofire-js/workflows/CI%20Tests/badge.svg

## Acknowledgments

This repository is a fork of the original Google [GeoFire for JavaScript](https://github.com/firebase/geofire-js) project.

## License

Licensed under [The MIT License](LICENSE).
