function LogItem({ item }: { item: Log }) {
  return (
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1 }}>
        {new Date(item.timestamp * 1000).toLocaleString()}
      </span>
      <span style={{ flex: 1 }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}

export default LogItem;
