"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/flightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [depMap, setDepMap] = useState<Map<string, { airport: string; timestamp: number }>>(new Map());
  const [avgMap, setAvgMap] = useState<Map<string, { totalTime: number; counts: number }>>(new Map());

  const handlePrintAvgTime = useCallback(() => {
    avgMap.forEach((value, route) => {
      console.log(`${route} : ${formatDuration(value.totalTime / value.counts)}`);
    });
  }, [avgMap]);

  const handleAddLog = useCallback((log: Log) => {
    setLogs((prev) => [...prev, log]);
    if (log.type === "departure") {
      depMap.set(log.passengerName, { airport: log.airport, timestamp: log.timestamp });
      setDepMap(new Map(depMap));
    } else if (log.type === "arrival") {
      const dep = depMap.get(log.passengerName);
      if (dep) {
        const route = `${dep.airport} to ${log.airport}`;
        const existing = avgMap.get(route);
        avgMap.set(route, {
          totalTime: (existing?.totalTime ?? 0) + (log.timestamp - dep.timestamp),
          counts: (existing?.counts ?? 0) + 1,
        });
        setAvgMap(new Map(avgMap));
      }
    }
  }, [depMap, avgMap]);

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data as Log[]);
      const { depMap, avgMap } = calculateMaps(data as Log[]);
      setDepMap(depMap);
      setAvgMap(avgMap);
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
          <LogCard data={logs}></LogCard>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <LogForm
            type={"departure"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <LogForm
            type={"arrival"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        <div>
          <button onClick={handlePrintAvgTime}>
            Print avg time to console
          </button>
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

function calculateMaps(data: Log[]) {
    const newDepMap = new Map<string, { airport: string; timestamp: number }>()
    const newAvgMap = new Map<string, { totalTime: number; counts: number }>()
    data.forEach((log) => {
      if (log.type === "departure") {
        newDepMap.set(log.passengerName, { airport: log.airport, timestamp: log.timestamp })
      } else if (log.type === "arrival") {
        const dep = newDepMap.get(log.passengerName)
        if (dep) {
          const route = `${dep.airport} to ${log.airport}`
          const travelTime = log.timestamp - dep.timestamp
          const existing = newAvgMap.get(route)
          newAvgMap.set(route, {
            totalTime: (existing?.totalTime ?? 0) + travelTime,
            counts: (existing?.counts ?? 0) + 1,
          })
        }
      }
    })
    return { depMap: newDepMap, avgMap: newAvgMap }
  }

  function formatDuration(sec: number): string {
  if (sec < 60) return `${sec.toFixed(1)} sec`;
  if (sec < 3_600) return `${(sec / 60).toFixed(1)} min`;
  return `${(sec / 3_600).toFixed(1)} hr`;
}
