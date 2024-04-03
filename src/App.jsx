import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const App = () => {
    const query = useQuery({
        queryKey: ["todos"],
        queryFn: () => getData(),
        refetchInterval: 1 * 1000,
    });
    if (!query.data) return <div className="main">Loading....</div>;
    return (
        <div className="main">
            <h4>Order</h4>
            <p>average_price: {query.data.average_price}</p>
            <p>direction: {query.data.direction}</p>
            <p>last_price: {query.data.last_price}</p>
            <p>quantity: {query.data.quantity}</p>
            <p>total_usd: {query.data.total_usd}</p>
            <p>trade_price: {query.data.trade_price}</p>
            <p>trade_size: {query.data.trade_size}</p>
            <h4>Result Order</h4>
            <p>amount: {query.data.order.amount}</p>
            <p>average: {query.data.order.average}</p>
            <p>clientOrderId: {query.data.order.clientOrderId}</p>
            <p>cost: {query.data.order.cost}</p>
            <p>
                datetime:
                {dayjs(query.data.order.datetime).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
                timestamp:
                {dayjs(query.data.order.timestamp).format(
                    "YYYY-MM-DD HH:mm:ss"
                )}
            </p>
            <p>filled: {query.data.order.filled}</p>
            <p>symbol: {query.data.order.symbol}</p>
            <p>type: {query.data.order.type}</p>
            <p>side: {query.data.order.side}</p>
            <p>price: {query.data.order.price}</p>
            <p>amount: {query.data.order.amount}</p>
            <p>average: {query.data.order.average}</p>
            <p>filled: {query.data.order.filled}</p>
            <p>remaining: {query.data.order.remaining}</p>
        </div>
    );
};

export default App;

async function getData() {
    const res = await fetch("https://api-bot-trading.vercel.app/api/BTC_USDT");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
