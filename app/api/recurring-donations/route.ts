import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data: masters } = await supabase
      .from("donors")
      .select("*")
      .eq("is_recurring_master", true)
      .eq("recurring_active", true)
      .eq("next_charge_date", today);

    if (!masters || masters.length === 0) {
      return NextResponse.json({ status: "ok", generated: 0 });
    }

    for (const master of masters) {
      await supabase.from("donors").insert([{
        name: master.name,
        email: master.email,
        amount: master.amount,
        donation_type: master.donation_type,
        project: master.project,
        payment_method: master.payment_method,
        status: "recurring_due",
        country: master.country,
        parent_donor_id: master.id,
      }]);

      const nextDate = new Date(master.next_charge_date);
      nextDate.setMonth(nextDate.getMonth() + 1);
      await supabase
        .from("donors")
        .update({ next_charge_date: nextDate.toISOString().split("T")[0] })
        .eq("id", master.id);
    }

    return NextResponse.json({ status: "ok", generated: masters.length });
  } catch (_error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}