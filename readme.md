# Open Telemetry NodeJs Express
This repository is for a sample implementation of Opentelemetry for NodeJS with Express framework. This can be a bootstrap for the implementation.

## Startup Steps

- First start jaegar container with the following command

```
docker run -d --name jaeger -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 -p 5775:5775/udp -p 6831:6831/udp -p 6832:6832/udp -p 5778:5778 -p 16686:16686 -p 14268:14268 -p 14250:14250 -p 9411:9411 jaegertracing/all-in-one:latest
```

- Check if Jaegar started on port 16686 `http://localhost:16686`
- Jaegar is an in-memory tracer, hence if you restart previous traces won't be available
- For persistence, you can use the Tempo to storing and viewing on Grafana. Here is a [link](https://grafana.com/blog/2021/09/23/intro-to-distributed-tracing-with-tempo-opentelemetry-and-grafana-cloud/)

## API Endpoints

- Events API `/events`

## How it works

Events API is a combination of mongodb and redis calls. Here I have used the Read Aside Caching Policy. 

- It checks if the events list are present in the cache
- If not the calls to the MongoDB for the events response
- Cache the response in Cache and returns the response
- Next call to events served directly from the Redis, hence RTT is less than the first API call

## UI view from Jaegar for the API

- First API Call Stack


- Subsequent API Call Stack

