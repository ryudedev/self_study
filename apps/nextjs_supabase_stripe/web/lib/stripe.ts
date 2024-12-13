import initStripe, { Stripe } from 'stripe';

export type Plan = {
    id: string;
    billingCycle: string;
    name: string;
    price: string | null;
    interval: Stripe.Price.Recurring.Interval | null;
    currency: string;
}

export const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

export const getAllPlans = async (): Promise<Plan[]> => {
    const { data: plansList } = await stripe.plans.list();
    const plans = await Promise.all(
        plansList.map(async (plan) => {
            const product = await stripe.products.retrieve(plan.product as string);
            return {
                id: plan.id,
                billingCycle: product.name === 'Month' ? '月額制' : '年額制',
                name: product.name,
                price: plan.amount_decimal,
                interval: plan.interval,
                currency: plan.currency
            }
        })
    );
    const sortedPlans = plans.sort((a, b) => parseInt(a.price!) - parseInt(b.price!));
    return sortedPlans;
}
