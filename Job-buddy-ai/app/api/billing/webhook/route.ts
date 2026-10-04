import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is missing.");

    return NextResponse.json(
      { error: "Webhook secret is not configured." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  try {
    const body = await request.text();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const userId = session.metadata?.userId;

        if (!userId) {
          console.error(
            "checkout.session.completed is missing userId metadata.",
          );
          break;
        }

        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (!subscriptionId) {
          console.error(
            "checkout.session.completed is missing subscription ID.",
          );
          break;
        }

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        await db
          .insert(subscriptions)
          .values({
            userId,
            plan: "premium",
            status: subscription.status,
            provider: "stripe",
            providerCustomerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer.id,
            providerSubscriptionId: subscription.id,
            currentPeriodStart: new Date(
              subscription.items.data[0].current_period_start * 1000,
            ),
            currentPeriodEnd: new Date(
              subscription.items.data[0].current_period_end * 1000,
            ),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: subscriptions.userId,
            set: {
              plan: "premium",
              status: subscription.status,
              provider: "stripe",
              providerCustomerId:
                typeof subscription.customer === "string"
                  ? subscription.customer
                  : subscription.customer.id,
              providerSubscriptionId: subscription.id,
              currentPeriodStart: new Date(
                subscription.items.data[0].current_period_start * 1000,
              ),
              currentPeriodEnd: new Date(
                subscription.items.data[0].current_period_end * 1000,
              ),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              updatedAt: new Date(),
            },
          });

        console.log(
          `Premium subscription created for user ${userId}.`,
        );

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;

        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error(
            "customer.subscription.updated is missing userId metadata.",
          );
          break;
        }

        await db
          .insert(subscriptions)
          .values({
            userId,
            plan: subscription.status === "active" ? "premium" : "free",
            status: subscription.status,
            provider: "stripe",
            providerCustomerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer.id,
            providerSubscriptionId: subscription.id,
            currentPeriodStart: new Date(
              subscription.items.data[0].current_period_start * 1000,
            ),
            currentPeriodEnd: new Date(
              subscription.items.data[0].current_period_end * 1000,
            ),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: subscriptions.userId,
            set: {
              plan:
                subscription.status === "active"
                  ? "premium"
                  : "free",
              status: subscription.status,
              provider: "stripe",
              providerCustomerId:
                typeof subscription.customer === "string"
                  ? subscription.customer
                  : subscription.customer.id,
              providerSubscriptionId: subscription.id,
              currentPeriodStart: new Date(
                subscription.items.data[0].current_period_start * 1000,
              ),
              currentPeriodEnd: new Date(
                subscription.items.data[0].current_period_end * 1000,
              ),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              updatedAt: new Date(),
            },
          });

        console.log(
          `Subscription updated for user ${userId}.`,
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error(
            "customer.subscription.deleted is missing userId metadata.",
          );
          break;
        }

        await db
          .update(subscriptions)
          .set({
            plan: "free",
            status: "canceled",
            cancelAtPeriodEnd: false,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.userId, userId));

        console.log(
          `Subscription canceled for user ${userId}.`,
        );

        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      console.error("Invalid Stripe webhook signature.");

      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 },
      );
    }

    console.error("Stripe webhook error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 },
    );
  }
}