import Stripe from "stripe";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return Response.json({ paid: false, reason: "missing_session_id" }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json({ paid: true, demo: true });
  }

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid";
    return Response.json({
      paid,
      status: session.payment_status,
      amount: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    return Response.json(
      {
        paid: false,
        error: err instanceof Error ? err.message : "Stripe verification failed",
      },
      { status: 500 },
    );
  }
}
