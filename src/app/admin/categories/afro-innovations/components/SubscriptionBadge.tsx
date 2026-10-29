interface SubscriptionBadgeProps {
  /** The API's `payingUser` flag: true = Pro Plan, false = Free Plan. */
  payingUser?: boolean;
}

/** Shows which listing plan a submission was made on. */
export default function SubscriptionBadge({ payingUser }: SubscriptionBadgeProps) {
  const paid = payingUser === true;
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
        paid ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-bg-light text-neutral-gray-dark'
      }`}
    >
      {paid ? 'Pro Plan' : 'Free Plan'}
    </span>
  );
}
