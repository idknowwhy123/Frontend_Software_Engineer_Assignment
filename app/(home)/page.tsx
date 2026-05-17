"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

type Log = {
  passengerName: string;
  airport: string;
  timestamp: number;
  type: "departure" | "arrival";
};

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);

  const handlePrintAvgTime = useCallback(() => {
    const depMap = new Map<string, { airport: string; timestamp: number }>();
    const routeDurations: Record<string, number[]> = {};

    for (const log of logs) {
      if (log.type === "departure") {
        depMap.set(log.passengerName, {
          airport: log.airport,
          timestamp: log.timestamp,
        });
      } else {
        const dep = depMap.get(log.passengerName);
        if (!dep) continue;
        const key = `${dep.airport}->${log.airport}`;
        (routeDurations[key] ??= []).push(log.timestamp - dep.timestamp);
      }
    }

    for (const [route, durations] of Object.entries(routeDurations)) {
      const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
      console.log(`${route}: ${Math.round(avg)}s avg`);
    }
  }, [logs]);

  const handleAddLog = useCallback(
    (log: Log) => {
      setLogs(logs => [...logs, log]);
    },
    [logs]
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data);
    };

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Airline!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/(home)/page.tsx</code>
        </p>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Flight Logs</h2>
          <LogCard style={{ width: "100%" }} data={logs}></LogCard>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"departure"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"arrival"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        <div>
          <button onClick={handlePrintAvgTime}>Print avg time to console</button>
        </div>
        {/* Render boarding pass here */}
        {/* {[].map((_, i) => ( */}
        {/*   <BoardingPassCard key={i} /> */}
        {/* ))} */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
