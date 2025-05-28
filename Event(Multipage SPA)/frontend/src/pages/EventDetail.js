import { useRouteLoaderData,json, redirect } from "react-router-dom";
//import {json} from "react-router-dom";
import EventItem from '../components/EventItem';

function EventsDetailPage(){
    const data= useRouteLoaderData('event-detail');
    return (
    <>
        <EventItem event= {data.event}/>
    </>
    );
}

export default EventsDetailPage;
export async function loader({request, params})
{
   const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);
    if(!response.ok){
        throw json({message:'Could not fetch details for the selected event!'}, {
            status:500
        })
        //
    }else{
    return response;
    }
}
export async function action({params, request}){
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        methd: request.method,
    });
    if(!response.ok){
        throw json({message:'Could not Delete event!'}, 
            {
            status:500,
        }
    );
        //
    }
    return redirect('/events');
}