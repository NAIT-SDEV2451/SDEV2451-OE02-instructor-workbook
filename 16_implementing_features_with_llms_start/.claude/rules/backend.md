---
paths:
  - "ticketmono_backend/**/*.py"
---

# Backend

- Use DRF ViewSets, serializers and routers, matching `event_tickets`.
- Keep `select_related` and `prefetch_related` on querysets that return related data.
- Set permissions explicitly on every ViewSet, with `permission_classes` or `get_permissions`.