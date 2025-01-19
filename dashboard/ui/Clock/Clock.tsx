import { useEffect, useState } from "react";
import classes from "./Clock.module.scss";

export const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 60);
  }, []);

  return (
    <div className={classes.today}>
      <h2>
        {time.toLocaleDateString("no-nb", {
          day: "2-digit",
          weekday: "long",
          month: "long",
        })}
      </h2>
      <span>
        {time.toLocaleTimeString("no-nb", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};
