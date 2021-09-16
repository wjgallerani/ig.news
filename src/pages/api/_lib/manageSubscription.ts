import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";
import subscribe from "../subscribe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false
) {

    //Buscar Usuário com ID. (customerId)
    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    );

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id
    }

    //Salvar dados da subscription do Usuário
    if (createAction) {
        await fauna.query(
            q.Create(
                q.Collection('subscription'),
                { data: subscriptionData }
            )
        );
    } else {
        await fauna.query(
            q.Replace(
                q.Select(
                    "ref",
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                            subscriptionId
                        )
                    )
                ),
                { data: subscriptionData }
            )
        );
    }
}