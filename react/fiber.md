# React Fiber Architecture

A primary goal of Fiber is to enable React to take advantage of scheduling. Specifically, we need to be able to:

* pause work and come back to it later.
* assign priority to different types of work.
* reuse previously completed work.
* abort work if it's no longer needed.

In order to do any of this, we first need a way to break work down into units. In one sense, that's what a fiber is. A fiber represents a **unit of work**.

Fiber is re-implementation of the stack, specialized for React components. You can think of a single fiber as a **virtual stack frame**.

So how does React implement the algorithm to walk the tree without recursion? It uses a singly linked list tree traversal algorithm. It makes it possible to pause the traversal and stop the stack from growing.