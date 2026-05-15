import Stripe from "stripe";

export const runtime = "nodejs";

const PRICE_ORE = 14900; // 149,00 NOK

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { selskap, saksnummer, epost } = body as {
    selskap?: string;
    saksnummer?: string;
    epost?: string;
  };

  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret) {
    return Response.json({ demo: true });
  }

  const stripe = new Stripe(secret);
  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: epost,
      locale: "nb",
      line_items: [
        {
          price_data: {
            currency: "nok",
            unit_amount: PRICE_ORE,
            product_data: {
              name: "Parkeringsklage — låses opp og er klar til å sende",
              description: selskap
                ? `Klage mot ${selskap}${saksnummer ? ` (saksnr. ${saksnummer})` : ""}`
                : "AI-generert klage på parkeringsgebyr",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/klage?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/klage?cancelled=1`,
      metadata: {
        selskap: selskap ?? "",
        saksnummer: saksnummer ?? "",
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Stripe failed" },
      { status: 500 },
    );
  }
}
