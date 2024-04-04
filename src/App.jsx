import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Line } from "@ant-design/plots";
import React from "react";

const App = () => {
    const [dataChart, setDataChart] = React.useState([]);
    const query = useQuery({
        queryKey: ["todos"],
        queryFn: () => getData(),
        refetchInterval: 1 * 1000,
    });

    React.useEffect(() => {
        if (query.data) {
            setDataChart((pre) => {
                const result = [
                    ...pre,
                    {
                        date: query.data.order.datetime,
                        value: query.data.total_usd,
                        condition: "Total USD",
                    },
                ];
                return result;
            });
        }
    }, [query.data]);
    if (!query.data) return <div className="main">Loading....</div>;

    const config = {
        data: dataChart,
        xField: (d) => dayjs(d.date).format("DD-MM-YYYY HH:mm:ss"),
        yField: "value",
        colorField: "condition",
        shapeField: "hvh",
        style: {
            gradient: "x",
            lineWidth: 2,
        },
        scale: {
            y: { nice: true },
            color: {
                domain: ["Total USD"],
                range: ["#aaaaaa"],
            },
        },
    };

    return (
        <div className="main">
            <div className="row">
                <div>
                    <h4>Order</h4>
                    <p>Average Price: {query.data.average_price}</p>
                    <p>Direction: {query.data.direction}</p>
                    <p>Last price: {query.data.last_price}</p>
                    <p>Quantity: {query.data.quantity}</p>
                    <p>Total usd: {query.data.total_usd}</p>
                    <p>Trade price: {query.data.trade_price}</p>
                    <p>Trade size: {query.data.trade_size}</p>
                    <p>Buy/sell: {query.data.log_buy_sell}</p>
                </div>
                <div>
                    <h4>Result Order</h4>
                    <p>Amount: {query.data.order.amount}</p>
                    <p>Average: {query.data.order.average}</p>
                    <p>ClientOrderId: {query.data.order.clientOrderId}</p>
                    <p>Cost: {query.data.order.cost}</p>
                    <p>
                        Date time:
                        {dayjs(query.data.order.datetime).format(
                            "DD-MM-YYYY HH:mm:ss"
                        )}
                    </p>
                    <p>Filled: {query.data.order.filled}</p>
                    <p>Symbol: {query.data.order.symbol}</p>
                    <p>Type: {query.data.order.type}</p>
                    <p>Side: {query.data.order.side}</p>
                    <p>Price: {query.data.order.price}</p>
                    <p>Amount: {query.data.order.amount}</p>
                    <p>Average: {query.data.order.average}</p>
                    <p>Filled: {query.data.order.filled}</p>
                    <p>Remaining: {query.data.order.remaining}</p>
                </div>
            </div>
            <div
                style={{
                    marginTop: "40px",
                }}
            >
                <Line {...config} />
            </div>
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
