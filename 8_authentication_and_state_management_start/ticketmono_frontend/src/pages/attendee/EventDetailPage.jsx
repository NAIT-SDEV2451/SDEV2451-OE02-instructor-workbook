import { useParams } from "react-router-dom"
import EventDetailsHeader from "../../components/EventDetailsHeader"

function EventDetailPage() {
  const { id } = useParams()  
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
     <EventDetailsHeader /> 
    </div>
  )
}

export default EventDetailPage
