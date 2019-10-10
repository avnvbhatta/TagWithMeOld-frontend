import axios from "axios";
const TICKETMASTER_TOKEN = process.env.REACT_APP_TICKETMASTER_API_KEY;

class Event{

    async getEvent(location){

        let eventList = []
        try{
            let res = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey='+TICKETMASTER_TOKEN+'&latlong='+location.lat+","+location.long);
            if(res.status === 200){
                for(var i=0; i<res.data.page.size; i++) {
                    eventList.push(res.data._embedded.events[i])
                }
            }
        }catch(error){
            console.log(error)
        }
        return eventList
    }
}

export default Event