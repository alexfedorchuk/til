# Next.js

## Rendering Strategies

`App Router`

There are three subsets of server rendering: Static, Dynamic, and Streaming.

* **Static rendering (default)** - data fetching and rendering happens on the server at build time (when you deploy)
* **Dynamic rendering** - content is rendered on the server for each user at **request time** (when the user visits the page)
* **Streaming** - is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready
  
  There are two ways you implement streaming in Next.js:
  * At the page level, with the `loading.tsx` file (which creates `<Suspense>` for you).
  * At the component level, with `<Suspense>` for more granular control.

Wrapping a component in `Suspense` doesn't make the component itself dynamic, but rather Suspense is used as a boundary between your static and dynamic code.

`Pages Routes`

* **Client-side Rendering (CSR)** - In Client-Side Rendering (CSR) with React, the browser downloads a minimal HTML page and the JavaScript needed for the page. The JavaScript is then used to update the DOM and render the page. When the application is first loaded, the user may notice a slight delay before they can see the full page, this is because the page isn't fully rendered until all the JavaScript is downloaded, parsed, and executed.

  In Next.js, there are two ways you can implement client-side rendering:

  1. Using React's `useEffect()` hook inside your pages instead of the server-side rendering methods (getStaticProps and getServerSideProps).
  2. Using a data fetching library like `SWR` or `TanStack Query` to fetch data on the client (recommended).
* **Server-side Rendering (SSR)** - If a page uses Server-side Rendering, the page HTML is generated on each request.

  To use Server-side Rendering for a page, you need to export an async function called `getServerSideProps`. This function will be called by the server on every request.
* **Static Site Generation (SSG)** - If a page uses Static Generation, the page HTML is generated at `build time`.
  
  Some pages require fetching external data for pre-rendering. There are two scenarios, and one or both might apply. In each case, you can use these functions that Next.js provides:

  Your page content depends on external data: Use `getStaticProps`.
  Your page paths depend on external data: Use `getStaticPaths` (usually in addition to `getStaticProps`).

## Incremental Static Regeneration (ISR)

Incremental Static Regeneration (ISR) enables you to:

* Update static content without rebuilding the entire site
* Reduce server load by serving prerendered, static pages for most requests
* Ensure proper `cache-control` headers are automatically added to pages
* Handle large amounts of content pages without long `next build` times

Types:
* **Time-based revalidation** - `export const revalidate = 3600 // invalidate every hour
* On-demand revalidation with `revalidatePath`
* On-demand revalidation with `revalidateTag`

## Partial Prerendering (PRR)

Partial Prerendering (PPR) is a rendering strategy that allows you to combine static and dynamic content in the same route.

When a user visits a page, the fast static shell is served from the end-user’s nearest Region, allowing the user to start consuming the page, and the client and server to work in parallel. The client can start parsing scripts, stylesheets, fonts, and static markup while the server renders dynamic chunks using [React’s new streaming architecture](https://vercel.com/blog/understanding-react-server-components).

To reduce network overhead, the full response—including static HTML and streamed dynamic parts—is sent in a `single HTTP request`. This avoids extra roundtrips and improves both initial load and overall performance.

> With streaming/suspense, you render the entire page on > request. Suspense lets you fetch data in parallel, and > streaming lets you replace the suspense component with the > fully rendered bits as each of them finish. But everything > is done on request time.

> With PPR, you render part of the page at build time and > part of it at request. Anything that can be rendered at > build time, is rendered at build time. Everything else > should be wrapped in Suspense (with a fallback to prevent > jarring CSS behavior).

* https://github.com/vercel/next.js/discussions/58322 - best explanation of PPR

## Routing:
* **Partial rendering** - only the route segments that change on navigation re-render on the client, and any shared segments are preserved (implemented by layout.js).

## Actions

### React Server Actions

React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.

Security is a top priority for web applications, as they can be vulnerable to various threats. This is where Server Actions come in. They include features like encrypted closures, strict input checks, error message hashing, host restrictions, and more — all working together to significantly enhance your application security.