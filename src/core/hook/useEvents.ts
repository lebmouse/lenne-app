"use client";
import { useEffect, useState } from "react";
import { EventRecord, EventHandleRecord } from "../EventRecord";

export function useEvents(events?: EventRecord) {
  const [eventRecord, setEventRecord] = useState<EventHandleRecord>(() => {
    const eventMap: EventHandleRecord = {};
    if (events) {
      for (const eventName in events) {
        eventMap[eventName] = undefined;
      }
    }
    return eventMap;
  });

  useEffect(() => {
    if (events) {
      Promise.allSettled(
        Object.entries(events).map(([eventName, eventData]) =>
          import(`@/action/${eventData?.name}`)
            .then((module) => ({
              eventName,
              action: module.default,
              option: eventData?.option,
            }))
            .catch((error) => {
              console.error(
                `Failed to load action module: ${eventData?.name}`,
                error
              );
              return {
                eventName,
                action: null,
                option: null,
              };
            })
        )
      ).then((results) => {
        console.log(results);
        setEventRecord((prev) => {
          const updatedEventRecord = { ...prev };
          results.forEach((result) => {
            if (result.status === "fulfilled") {
              const { eventName, action, option } = result.value;
              updatedEventRecord[eventName] = () => action(option);
            } else {
              const { eventName, action, option } = result.reason;
              updatedEventRecord[eventName] = () => action(option);
            }
          });
          return updatedEventRecord;
        });
      });
    }
  }, [events]);
  return eventRecord;
}
