import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
    key : process.env.ARCJET_KEY,
    characteristics: ["userId"], //track based on clerk userId
    rules:[
        tokenBucket({
            mode:"LIVE",
            refillRate:10,
            interval:3600,
            capacity:10
        })
    ]

});

export default aj;

// lib/arcjet.js - UPDATED
// import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next";

// const aj = arcjet({
//     key: process.env.ARCJET_KEY,
//     characteristics: ["userId"], // track based on clerk userId
//     rules: [
//         tokenBucket({
//             mode: "LIVE",
//             refillRate: 10,
//             interval: 3600,
//             capacity: 10
//         }),
//         shield({
//             mode: "LIVE"
//         }),
//         detectBot({
//             mode: "LIVE",
//             allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"]
//         })
//     ]
// });

// // Helper function for API routes
// export async function withArcjet(request, userId) {
//     const decision = await aj.protect(request, { 
//         userId,
//         requested: 1 
//     });
    
//     if (decision.isDenied()) {
//         if (decision.reason.isRateLimit()) {
//             return Response.json(
//                 { error: "Too many requests. Please try again later." },
//                 { status: 429 }
//             );
//         }
        
//         if (decision.reason.isBot()) {
//             return Response.json(
//                 { error: "Bot detected" },
//                 { status: 403 }
//             );
//         }
        
//         if (decision.reason.isShield()) {
//             return Response.json(
//                 { error: "Security shield triggered" },
//                 { status: 403 }
//             );
//         }
        
//         return Response.json(
//             { error: "Forbidden" },
//             { status: 403 }
//         );
//     }
    
//     return null; // Request allowed
// }

// export default aj;