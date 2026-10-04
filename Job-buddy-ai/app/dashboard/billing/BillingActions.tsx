"use client";

import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

type BillingActionsProps = {
  isPremium: boolean;
};

export default function BillingActions({
  isPremium,
}: BillingActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpgrade() {
    if (isPremium || loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to start checkout.",
        );
      }

      if (!data.url) {
        throw new Error("Checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to start checkout.",
      );

      setLoading(false);
    }
  }

  if (isPremium) {
    return (
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-center text-sm text-emerald-300">
        You already have Premium access.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleUpgrade}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Opening secure checkout...
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Upgrade to Premium
          </>
        )}
      </button>

      {error && (
        <p className="text-center text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}