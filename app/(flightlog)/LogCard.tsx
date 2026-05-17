import { useState, useEffect } from "react";
import LogItem from "./LogItem";

function LogCard({ data }: { data: Log[] }) {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: 4,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        <span style={{ flex: 1 }}>Passenger Name</span>
        <span style={{ flex: 1 }}>Airport</span>
        <span style={{ flex: 1 }}>Timestamp</span>
        <span style={{ flex: 1 }}>Type</span>
      </div>
      {data.map((item) => (
        <LogItem key={`${item.passengerName}-${item.timestamp}`} item={item}></LogItem>
      ))}
    </div>
  );
}

export default LogCard;
