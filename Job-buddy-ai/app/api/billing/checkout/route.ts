import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
      })
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 },
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",

      customer_email: user.email,

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: "JobBuddy Premium",
              description:
                "Advanced AI-powered job search and application assistance.",
            },

            unit_amount: 49900,

            recurring: {
              interval: "month",
            },
          },

          quantity: 1,
        },
      ],

      metadata: {
        userId: user.id,
        clerkId,
        plan: "premium",
      },

      subscription_data: {
        metadata: {
          userId: user.id,
          clerkId,
          plan: "premium",
        },
      },

      success_url: `${origin}/dashboard/billing?checkout=success`,

      cancel_url: `${origin}/dashboard/billing?checkout=cancelled`,
    });

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: "Unable to create checkout session." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("POST /api/billing/checkout error:", error);

    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}