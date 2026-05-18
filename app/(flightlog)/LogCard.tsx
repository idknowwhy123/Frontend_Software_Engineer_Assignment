import { EmptyState } from "../components/ui";
import LogItem from "./LogItem";

function LogCard({ data }: { data: Log[] }) {
  if (data.length === 0) {
    return (
      <EmptyState
        title="No flight logs yet"
        body="Create a departure log to start building the operational timeline."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Flight logs with passenger, airport, timestamp, and log type.
          </caption>
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <TableHeader>Passenger Name</TableHeader>
              <TableHeader>Airport</TableHeader>
              <TableHeader>Timestamp</TableHeader>
              <TableHeader>Type</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
            {data.map((item) => (
              <LogItem
                key={`${item.passengerName}-${item.timestamp}`}
                item={item}
              ></LogItem>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
    >
      {children}
    </th>
  );
}

export default LogCard;
