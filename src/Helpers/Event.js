import axios from "axios";

class Event{
    async getEvent(latlon){
        let eventList = []
        try{
            let res = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=LMX62etGfMGogQNGUjnr9Dh2yvtQ88sI&latlong='+latlon);
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