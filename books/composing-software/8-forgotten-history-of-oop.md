# The Forgotten History of OOP

> “I’m sorry that I long ago coined the term ‘objects’ for > this topic because it gets many people to focus on the > lesser idea. The big idea is messaging.” ~ Alan Kay

> OOP to me means only messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things.” > ~ Alan Kay

In other words, according to Alan Kay, the essential ingredients of OOP are:

* Message passing
* Encapsulation
* Dynamic binding

The combination of message passing and encapsulation serve some important purposes:

* **Encapsulating state** by isolating other objects from local state changes. The only way to affect another object’s state is to ask (not command) that object to change it by sending a message. State changes are controlled at a local, cellular level rather than exposed to shared access.
  
* **Decoupling objects from each other** — the message sender is only loosely coupled to the message receiver, through the messaging API.
  
* **Runtime adaptability** via late binding. Runtime adaptability provides many great benefits that Alan Kay considered essential to OOP.

## What OOP Doesn’t Mean

What is essential to OOP?

* Encapsulation
* Message passing
* Dynamic binding (the ability for the program to evolveadapt * at runtime)

What is non-essential?

* Classes
* Class inheritance
* Special treatment for objects/functions/data
* The new keyword
* Polymorphism
* Static types
* Recognizing a class as a "type"

Most type systems have been too restrictive to allow for free expression of dynamic and functional ideas, such as function composition, free object composition, runtime object extension, combinators, lenses, etc. In other words, static types frequently make it harder to write composable software.

If your type system is too restrictive (e.g., TypeScript, Java), you’re forced to write more convoluted code to accomplish the same goals. That doesn’t mean static types are a bad idea, or that all static type implementations are equally restrictive. I have encountered far fewer problems with Haskell’s type system.

If you’re a fan of static types and you don’t mind the restrictions, more power to you, but if you find some of the advice in this text difficult because it’s hard to type composed functions and composite algebraic structures, blame the type system, not the ideas. People love the comfort of their SUVs, but nobody complains that they don’t let you fly. For that, you need a vehicle with more degrees of freedom.

If restrictions make your code simpler, great! But if restrictions force you to write more complicated code, perhaps the restrictions are wrong.