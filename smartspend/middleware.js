// import arcjet, { createMiddleware, detectBot, shield } from '@arcjet/next';
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",
//   "/account(.*)",
//   "/transaction(.*)",
// ])

// const aj = arcjet({
//   key : process.env.ARCJET_KEY,
//   rules:[
//     shield({
//       mode: "LIVE"
//     }),
//     detectBot({
//       mode:"LIVE",
//       allow:[
//         "CATEGORY:SEARCH_ENGINE" , 
//         "GO_HTTP"
//       ]
//     })
//   ]
// })

// const clerk = clerkMiddleware(async (auth , req) => {
//   const { userId } = await auth();

//   if(!userId && isProtectedRoute(req)) {
//     const { redirectToSignIn } = await auth();

//     return redirectToSignIn();
//   }
// });

// export default createMiddleware(aj , clerk)

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Only import Arcjet if needed
const getArcjetMiddleware = async () => {
  if (process.env.NODE_ENV === 'development') {
    // Skip Arcjet in development to reduce bundle size
    return null;
  }
  
  const { default: arcjet, createMiddleware, detectBot, shield } = await import('@arcjet/next');
  
  const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"]
      })
    ]
  });
  
  return createMiddleware(aj);
};

const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

export default async function middleware(request) {
  // Apply Clerk middleware first
  const clerkResponse = await clerk(request);
  if (clerkResponse) return clerkResponse;

  // Only apply Arcjet in production
  if (process.env.NODE_ENV === 'production') {
    const arcjetMiddleware = await getArcjetMiddleware();
    if (arcjetMiddleware) {
      return arcjetMiddleware(request);
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};