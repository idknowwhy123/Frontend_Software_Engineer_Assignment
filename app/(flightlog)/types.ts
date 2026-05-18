type Log = {
  passengerName: string;
  airport: string;
  timestamp: number;
  type: "departure" | "arrival";
};

type LogFormProps = {
  type: "departure" | "arrival";
  pendingPassengers?: string[];
  minTimeStamp?: number;
  onSubmit: (log: Log) => void;
}

type FormErrors = {
  passengerName?: string;
  airport?: string;
  timestamp?: string;
};
