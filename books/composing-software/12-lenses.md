# Lenses

A lens is a composable pair of pure getter and setter functions which focus on a particular field inside an object, and obey a set of axioms known as the lens laws. Think of the object as the whole and the field as the part. The getter takes a whole and returns the part of the object that the lens is focused on.

`// view = whole => part`

The setter takes a whole, and a value to set the part to, and returns a new whole with the part updated. Unlike a function which simply sets a value into an object’s member field, Lens setters are pure functions:

`// set = whole => part => whole`

## Why Lenses?

State shape dependencies are a common source of coupling in software. Many components may depend on the shape of some shared state, so if you need to later change the shape of that state, you have to change logic in multiple places.

Lenses allow you to abstract state shape behind getters and setters. Instead of littering your codebase with code that dives deep into the shape of a particular object, import a lens. If you later need to change the state shape, you can do so in the lens, and none of the code that depends on the lens will need to change.

This follows the principle that a small change in requirements should require only a small change in the system.

