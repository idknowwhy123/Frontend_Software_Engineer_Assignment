import { useState, useCallback } from "react";
import React from "react";

const emptyForm = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

function LogForm({ type, onSubmit }: LogFormProps) {
  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = useCallback(() => {
    onSubmit({ ...formData, type, timestamp: new Date(formData.timestamp).getTime() / 1000, });
    setFormData(emptyForm);
  }, [formData, type, onSubmit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> ) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  return (
    <div style={{ display: "flex", columnGap: 8 }}>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="passengerName" style={{ fontWeight: "bold" }}>
          Passenger Name:
        </label>
        <input
          type="text"
          id="passengerName"
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="airport" style={{ fontWeight: "bold" }}>
          Airport:
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="timestamp" style={{ fontWeight: "bold" }}>
          Timestamp:
        </label>
        <input
          type="datetime-local"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default LogForm;
