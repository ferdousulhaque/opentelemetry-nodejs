require("dotenv").config();

const configureOpenTelemetry = require("./tracing");

const express = require("express");
const app = express();
const port = process.env.PORT;
const { trace, context, propagation } = require("@opentelemetry/api");
const tracerProvider = configureOpenTelemetry("events");
// const axios = require("axios");
const eventService = require("./eventService");

app.use((req, res, next) => {
  const tracer = tracerProvider.getTracer("open-express");
  const span = tracer.startSpan("get");

  // Add custom attributes or log additional information if needed
  // span.setAttribute("user", "user made");

  // Pass the span to the request object for use in the route handler
  context.with(trace.setSpan(context.active(), span), () => {
    next();
  });
});

app.get("/events", async (req, res) => {
  // Access the parent span from the request's context
  const parentSpan = trace.getSpan(context.active());

  try {
    const getEvents = await eventService.getEvents(parentSpan);

    // Send the user data as a JSON response
    res.json(getEvents);
  } catch (error) {
    if (parentSpan) {
      parentSpan.recordException(error);
    }
    res.status(500).send(error.message);
  } finally {
    // End the span if it was manually created
    // Note: If the span was created by OpenTelemetry's HTTP instrumentation, it might be automatically ended
    if (parentSpan) {
      parentSpan.end();
    }
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Gracefully shut down the OpenTelemetry SDK and the server
const gracefulShutdown = () => {
  server.close(() => {
    console.log("Server stopped");
    parentSpan.end();
    // sdk
    //   .shutdown()
    //   .then(() => console.log("Tracing terminated"))
    //   .catch((error) => console.error("Error shutting down tracing", error))
    //   .finally(() => process.exit(0));
  });
};

// Listen for termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
