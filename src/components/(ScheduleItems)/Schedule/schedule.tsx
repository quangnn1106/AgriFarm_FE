import { useState, FC, useEffect, Fragment } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  CalendarOptions,
  EventClickArg,
  EventSourceInput,
} from "@fullcalendar/core/index.js";

import ActivityDetail from "../ActivityDetail/activityDetail";
import { ActivityResponse } from "@/services/Admin/Activities/Payload/response/activityResponse";

interface IProps {
  allActivities: ActivityResponse[];
  isFetching: boolean;
};

const Schedule: FC<IProps> = (props) => {
  const {allActivities , isFetching} = props
  //const [activities, setActivities] = useState<ActivityResponse[]>(allActivities);
  const [selectedActivity, setSelectedActivity] = useState<ActivityResponse | null>(
    null
  );
  


  function handleActivityClick(arg: EventClickArg) {
    console.log(">Activity data is: ", arg)
    const extProps = arg.event._def.extendedProps
    const eventData: ActivityResponse = {
      ... arg.event._def,
      materials:[],
      start : arg.event.start as Date,
      end : arg.event.end as Date, 
      id : arg.event._def.publicId,
      descriptions: extProps.descriptions,
      //inspectors: extProps.inspectors,
      //workers: extProps.workers,
      season: extProps.season,
      location: extProps.location,
      isCompleted: extProps.isCompleted,
      tag: extProps.tag,
      addition: extProps.addition
    };
    if (eventData) {
      console.log(">Real event data is: ", eventData)
      setSelectedActivity(eventData);
    }
  }

  const handleCloseModal = () => {
    setSelectedActivity(null);
  };

  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "", //resourceTimelineWook,dayGridMonth,timeGridWeek",
              }}
              events={allActivities as EventSourceInput}
              nowIndicator={true}
              editable={false}
              droppable={true}
              selectable={true}
              selectMirror={true}
              //dateClick={handleDateClick}
              //   drop={(data) => addEvent(data)}
              eventClick={(data) => handleActivityClick(data)}
              initialView="timeGridWeek"
              firstDay={1}
              eventContent={(arg, createElement) => {
                const { event } = arg;

                return (
                  <div className={event.extendedProps.cssClass}>
                    {event.title}
                    {/* Add more custom rendering if needed */}
                  </div>
                );
              }}
              
              // //duration={ {day : 7}}
              // dateClick={(info)=>{alert('Date: '+info.dateStr)}}
              //{...calendarOptions}
            />
            {selectedActivity && (
              <ActivityDetail
                activity={selectedActivity}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Schedule;
