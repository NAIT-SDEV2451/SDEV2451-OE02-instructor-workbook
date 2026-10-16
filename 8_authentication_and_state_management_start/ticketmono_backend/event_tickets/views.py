from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .models import Event
from .serializers import EventListReadOnlySerializer

class EventViewSet(ModelViewSet):
    queryset = Event.objects.select_related("venue", "organizer").prefetch_related("ticket_tiers")
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "list":
            return EventListReadOnlySerializer
        return EventListReadOnlySerializer