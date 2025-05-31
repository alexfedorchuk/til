# What's new in React

## 19

## 18 (Concurrent rendering)

### Cocurrent React

* A key property of Concurrent React is that rendering is interruptible
* Coordinate multiple update at different priorities 
* React can prepare new screens in the background without blocking the main thread

### New Feature: Automatic Batching

Until React 18, we only batched updates during the React event handlers. Updates inside of promises, setTimeout, native event handlers, or any other event were not batched in React by default.

Starting in React 18 with [createRoot](https://github.com/reactwg/react-18/discussions/5), all updates will be automatically batched, no matter where they originate from.

This means that updates inside of timeouts, promises, native event handlers or any other event will batch the same way as updates inside of React events. We expect this to result in less work rendering, and therefore better performance in your applications.

#### What if I don’t want to batch?

Usually, batching is safe, but some code may depend on reading something from the DOM immediately after a state change. For those use cases, you can use `ReactDOM.flushSync()` to opt out of batching.

### New Feature: Transitions

A transition is a new concept in React to distinguish between urgent and non-urgent updates.

* `Urgent updates` reflect direct interaction, like typing, clicking, pressing, and so on.
* `Transition updates` transition the UI from one view to another.

```jsx
import { startTransition } from 'react';

// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```

Updates wrapped in `startTransition` are handled as non-urgent and will be interrupted if more urgent updates like clicks or key presses come in.

* `useTransition`: a Hook to start transitions, including a value to track the pending state.
* `startTransition`: a method to start transitions when the Hook cannot be used.

Transitions will opt in to concurrent rendering, which allows the update to be interrupted. If the content re-suspends, transitions also tell React to continue showing the current content while rendering the transition content in the background.

### New Suspense Features

From React 16.8, Suspence the only supported use case was code splitting with React.lazy, and it wasn’t supported at all when rendering on the server.

#### New feature: Server-side rendering support with streaming

React 18 offers two major features for SSR:

* `Streaming HTML` lets you start emitting HTML as early as you’d like, streaming HTML for additional content together with the `<script>` tags that put them in the right places.
* `Selective Hydration` lets you start hydrating your app as early as possible, before the rest of the HTML and the JavaScript code are fully downloaded. It also prioritizes hydrating the parts the user is interacting with, creating an illusion of instant hydration.

Server-side rendering (abbreviated to “SSR” in this post) lets you generate HTML from React components on the server, and send that HTML to your users. SSR lets your users see the page’s content before your JavaScript bundle loads and runs.

SSR in React always happens in several steps:

* On the server, fetch data for the entire app.
* Then, on the server, render the entire app to HTML and send it in the response.
* Then, on the client, load the JavaScript code for the entire app.
* Then, on the client, connect the JavaScript logic to the server-generated HTML for the entire app (this is “hydration”).

The key part is that `each step had to finish for the entire app at once before the next step could start`. This is not efficient if some parts of your app are slower than others, as is the case in pretty much every non-trivial app.

React 18 lets you use `<Suspense>` to `break down your app into smaller independent units` which will go through these steps independently from each other and won’t block the rest of the app. As a result, your app’s users will see the content sooner and be able to start interacting with it much faster. The slowest part of your app won’t drag down the parts that are fast. These improvements are automatic, and you don’t need to write any special coordination code for them to work.

For more, [New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37).

#### New feature: Using transitions to avoid hiding existing content

Suspense in React 18 works best when combined with the transition API. If you suspend during a transition, React will prevent already-visible content from being replaced by a fallback. Instead, React will delay the render until enough data has loaded to prevent a bad loading state.

```jsx
const [isPending, startTransition] = useTransition();

function handleClick() {
  startTransition(() => {
    setTab('comments');
  });
}

<Suspense fallback={<Spinner />}>
  <div style={{ opacity: isPending ? 0.8 : 1 }}>
    {tab === 'photos' ? <Photos /> : <Comments />}
  </div>
</Suspense>
```

### New Hooks

* `useId` - for generating unique IDs on both the client and server, while avoiding hydration mismatches. `useId` is not for generating keys in a list.
* `useTransition` and `startTransition` - let you mark some state updates as not urgent. Other state updates are considered urgent by default.
* `useDeferredValue` - lets you defer re-rendering a non-urgent part of the tree. It is similar to debouncing, but has a few advantages compared to it. There is no fixed time delay, so React will attempt the deferred render right after the first render is reflected on the screen. The deferred render is interruptible and doesn’t block user input.
* `useSyncExternalStore` - is a new Hook that allows external stores to support concurrent reads by forcing updates to the store to be synchronous. It removes the need for useEffect when implementing subscriptions to external data sources, and is recommended for any library that integrates with state external to React.
  
  When possible, we recommend using built-in React state with `useState` and `useReducer` instead. The `useSyncExternalStore` API is mostly useful if you need to integrate with existing non-React code.
* `useInsertionEffect` - is a new Hook that allows CSS-in-JS libraries to address performance issues of injecting styles in render. `useInsertionEffect` is intended to be used by libraries, not application code.

### New Client and Server Rendering APIs

react-dom/client:

* `createRoot`: New method to create a root to render or unmount. Use it instead of ReactDOM.render. New features in React 18 don’t work without it.
* `hydrateRoot`: New method to hydrate a server rendered application. Use it instead of ReactDOM.hydrate in conjunction with the new React DOM Server APIs. New features in React 18 don’t work without it.

react-dom/server

* `renderToPipeableStream`: for streaming in Node environments.
* `renderToReadableStream`: for modern edge runtime environments, such as Deno and Cloudflare workers.

## 17 (No New Features)

* Gradual upgrades
* New JSX Transform
* Changes to Event Delegation - in React 17, React will no longer attach event handlers at the document level under the hood. Instead, it will attach them to the root DOM container into which your React tree is rendered
  <img src="./img/react_17_delegation.png" loading="lazy"
   />

## 16 (Fiber Rewrite)

* New render return types: fragments and strings
* Portals
* Error Boundaries. Better error handling inside EB subtree.
* Better SSR
  * Streaming support
  * [Improved performance](https://medium.com/hackernoon/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67)
* [**New core architecture - Fiber**](./fiber.md) - fiber doesn't change React API, but gives fundament for amazing features - error boundaries, hooks, lazy, suspense | *in future* concurrent mode, react server components and more

### 16.6

* React.lazy
* React.Suspense
* React.memo()

With the initial release in React 16.6.0, Suspense only supported a single use case: [code splitting on the client with `React.lazy`](https://github.com/reactjs/rfcs/pull/64). So even though you could add `<Suspense>` boundaries in your component trees, they were not being used by React for any other purposes. Moreover, you couldn't use them with server rendering. This made their usefulness very limited.

### 16.8

* Hooooks - `useState`, `useEffect` and more


References:
* [React v18.0](https://react.dev/blog/2022/03/29/react-v18)
* [React v17.0](https://legacy.reactjs.org/blog/2020/10/20/react-v17.html)
* [React v16.0](https://legacy.reactjs.org/blog/2017/09/26/react-v16.0.html)
* [Suspense in React 18](https://github.com/reactjs/rfcs/blob/main/text/0213-suspense-in-react-18.md)
* [New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37)
