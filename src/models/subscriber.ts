export interface Subscriber {
  _id: string;
  email: string;
  name: string;
  is_active: boolean;
  plan_id: "free" | "standard" | "premium";
  subscribed_at: string; // ISO date string from MongoDB
  unsubscribed_at: string | null; // ISO date string or null
}
