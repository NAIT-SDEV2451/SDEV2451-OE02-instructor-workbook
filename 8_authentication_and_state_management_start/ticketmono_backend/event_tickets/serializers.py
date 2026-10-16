from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

from .models import Event, TicketTier, Venue

User = get_user_model()

class TicketTierSerializer(ModelSerializer):
    class Meta:
        model = TicketTier
        fields = ("id", "name", "price")

class VenueSerializer(ModelSerializer):
    class Meta:
        model = Venue
        fields = ("id", "name", "address")

class OrganizerSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "role")

class EventListReadOnlySerializer(ModelSerializer):
    ticket_tiers = TicketTierSerializer(many=True, read_only=True)
    venue = VenueSerializer(read_only=True)
    organizer = OrganizerSerializer(read_only=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "name",
            "date_time",
            "venue",
            "organizer",
            "ticket_tiers"
        )