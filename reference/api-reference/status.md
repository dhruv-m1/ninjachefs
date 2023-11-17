---
description: Route guide
---

# Status

{% hint style="info" %}
**Special Route to check deployment**
{% endhint %}

## /status

{% swagger baseUrl="https://domain.api" method="get" path="/status/" summary="Check service uptime status." %}
{% swagger-description %}
Provides a JSON Object
{% endswagger-description %}

{% swagger-response status="200" description="Operational" %}
```javascript
{
    "code": 200,
    "name": "NinjaChefs + AI (API)",
    "status": "Operational",
    "startTime": "2023-11-15, 4:47:08 a.m. (Server Time - UTC)"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Requires Attention" %}


{% code overflow="wrap" %}
```json
{
    "code": 500, 
    "name": "NinjaChefs + AI (API)", 
    "status": "Requires Attention"
}
```
{% endcode %}
{% endswagger-response %}
{% endswagger %}
