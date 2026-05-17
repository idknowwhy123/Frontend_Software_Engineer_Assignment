type Log = {
  passengerName: string;
  airport: string;
  timestamp: number;
  type: "departure" | "arrival";
};

type LogFormProps = {
  type: "departure" | "arrival"
  onSubmit: (log: Log) => void
}
