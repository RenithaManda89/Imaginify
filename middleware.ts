import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'



const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}





// import { authMiddleware } from "@clerk/nextjs";
// 

// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const publicRoutes = ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'];

// export default clerkMiddleware((req) => {
//   const url = new URL(req.request.url);  // Accessing the actual request object
//   const { pathname } = url;

//   // Allow public routes to bypass authentication
//   if (publicRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // For all other routes, Clerk will enforce authentication
//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
