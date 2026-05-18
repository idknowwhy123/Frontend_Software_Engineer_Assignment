/* Enhanced by: 2026-05-18T00:00:00+07:00 | Issues resolved: 37 */
"use client";

import { useCallback, useEffect, useState } from "react";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { Badge, Button, Card } from "../components/ui";
import { FlightLogService } from "../(flightlog)/flightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [depMap, setDepMap] = useState<
    Map<string, { airport: string; timestamp: number }>
  >(new Map());
  const [avgMap, setAvgMap] = useState<
    Map<string, { totalTime: number; counts: number }>
  >(new Map());

  const handlePrintAvgTime = useCallback(() => {
    avgMap.forEach((value, route) => {
      console.log(`${route} : ${formatDuration(value.totalTime / value.counts)}`);
    });
  }, [avgMap]);

  const handleAddLog = useCallback(
    (log: Log) => {
      setLogs((prev) => [...prev, log]);
      if (log.type === "departure") {
        depMap.set(log.passengerName, {
          airport: log.airport,
          timestamp: log.timestamp,
        });
        setDepMap(new Map(depMap));
      } else if (log.type === "arrival") {
        const dep = depMap.get(log.passengerName);
        if (dep) {
          const route = `${dep.airport} to ${log.airport}`;
          const existing = avgMap.get(route);
          avgMap.set(route, {
            totalTime:
              (existing?.totalTime ?? 0) + (log.timestamp - dep.timestamp),
            counts: (existing?.counts ?? 0) + 1,
          });
          setAvgMap(new Map(avgMap));
        }
      }
    },
    [depMap, avgMap]
  );

  const pendingPassengers = logs
    .filter((l) => l.type === "departure")
    .filter(
      (l) =>
        !logs.some(
          (a) => a.type === "arrival" && a.passengerName === l.passengerName
        )
    )
    .map((l) => l.passengerName);

  const latestTimestamp =
    logs.length > 0 ? Math.max(...logs.map((l) => l.timestamp)) : 0;

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
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-200 ease-in-out dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 bg-white/90 dark:border-gray-800 dark:bg-gray-900/90">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex flex-col gap-2">
            <Badge tone="blue">Next Airline Operations</Badge>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
              Flight log console
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
              Review passenger movement, register departures and arrivals, then
              print route averages for the current log set.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <DarkModeToggle />
            <Button
              aria-label="Print average flight times to the browser console"
              className="w-full sm:w-auto"
              onClick={handlePrintAvgTime}
            >
              Print averages
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-screen-lg flex-col gap-8 px-4 py-8 motion-safe:animate-fade-in sm:px-6 lg:px-8">
        <section
          aria-label="Flight log summary"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <SummaryTile label="Total logs" value={logs.length.toString()} />
          <SummaryTile
            label="Pending arrivals"
            value={pendingPassengers.length.toString()}
          />
          <SummaryTile label="Tracked routes" value={avgMap.size.toString()} />
        </section>

        <Card>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                Flight Logs
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                A chronological view of all recorded passenger events.
              </p>
            </div>
            <Badge tone={logs.length > 0 ? "green" : "gray"}>
              {logs.length > 0 ? "Active data" : "No data"}
            </Badge>
          </div>
          <hr className="my-6 border-t border-gray-100 dark:border-gray-800" />
          <LogCard data={logs}></LogCard>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <LogForm type={"departure"} onSubmit={handleAddLog}></LogForm>
          </Card>

          <Card>
            <LogForm
              pendingPassengers={pendingPassengers}
              minTimeStamp={latestTimestamp}
              type={"arrival"}
              onSubmit={handleAddLog}
            ></LogForm>
          </Card>
        </div>

        {/* Render boarding pass here */}
        {/* {[].map((_, i) => ( */}
        {/*   <BoardingPassCard key={i} /> */}
        {/* ))} */}
      </main>

      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-lg px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Flight log data is stored in the existing in-memory service for this
            screening assignment.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </article>
  );
}

function calculateMaps(data: Log[]) {
  const newDepMap = new Map<string, { airport: string; timestamp: number }>();
  const newAvgMap = new Map<string, { totalTime: number; counts: number }>();
  data.forEach((log) => {
    if (log.type === "departure") {
      newDepMap.set(log.passengerName, {
        airport: log.airport,
        timestamp: log.timestamp,
      });
    } else if (log.type === "arrival") {
      const dep = newDepMap.get(log.passengerName);
      if (dep) {
        const route = `${dep.airport} to ${log.airport}`;
        const travelTime = log.timestamp - dep.timestamp;
        const existing = newAvgMap.get(route);
        newAvgMap.set(route, {
          totalTime: (existing?.totalTime ?? 0) + travelTime,
          counts: (existing?.counts ?? 0) + 1,
        });
      }
    }
  });
  return { depMap: newDepMap, avgMap: newAvgMap };
}

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec.toFixed(1)} sec`;
  if (sec < 3_600) return `${(sec / 60).toFixed(1)} min`;
  return `${(sec / 3_600).toFixed(1)} hr`;
}
