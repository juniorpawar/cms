import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'

const chartData = [
    { day: 'Mon', views: 2400, likes: 240 },
    { day: 'Tue', views: 1398, likes: 221 },
    { day: 'Wed', views: 9800, likes: 229 },
    { day: 'Thu', views: 3908, likes: 200 },
    { day: 'Fri', views: 4800, likes: 218 },
    { day: 'Sat', views: 3800, likes: 250 },
    { day: 'Sun', views: 4300, likes: 260 },
]

export default function ChartDashboard() {

    return <section>
        <h2 className="text-xl font-semibold mb-4">Weekly Engagement</h2>
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="day" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#333' }} />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#00bfff" strokeWidth={2} />
                    <Line type="monotone" dataKey="likes" stroke="#00ff99" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </section>
}