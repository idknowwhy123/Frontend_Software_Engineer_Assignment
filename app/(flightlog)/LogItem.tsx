import { Badge } from "../components/ui";

function LogItem({ item }: { item: Log }) {
  const isDeparture = item.type === "departure";

  return (
    <tr className="transition-colors duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
        {item.passengerName}
      </td>
      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
        {item.airport}
      </td>
      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <time dateTime={new Date(item.timestamp * 1000).toISOString()}>
          {new Date(item.timestamp * 1000).toLocaleString()}
        </time>
      </td>
      <td className="px-4 py-4">
        <Badge tone={isDeparture ? "amber" : "green"}>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-current"
          />
          {isDeparture ? "Departure" : "Arrival"}
        </Badge>
      </td>
    </tr>
  );
}

export default LogItem;
