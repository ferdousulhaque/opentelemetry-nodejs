require("dotenv").config();

// const configureOpenTelemetry = require("./tracing");

const express = require("express");
const app = express();
const port = process.env.PORT;
const eventsServiceProvider = require("./eventsServiceProvider");

require("./auto")

// Tracer Middleware Inject
// const { trace, context, propagation } = require("@opentelemetry/api");
// const tracerProvider = configureOpenTelemetry("node-mongo-redis");

// app.use((req, res, next) => {
//   const tracer = tracerProvider.getTracer("express-tracer");
//   const span = tracer.startSpan("hira");

//   // Add custom attributes or log additional information if needed
//   span.setAttribute("user", "user made");

//   // Pass the span to the request object for use in the route handler
//   context.with(trace.setSpan(context.active(), span), () => {
//     next();
//   });
// });

app.get("/events", async (req, res) => {
  // Access the parent span from the request's context
  //   const parentSpan = trace.getSpan(context.active());

  try {
    // Simulate some processing
    // const user = {
    //   id: 1,
    //   name: "John Doe",
    //   email: "john.doe@example.com",
    // };

    // if (parentSpan) {
    //   parentSpan.setAttribute("user.id", user.id);
    //   parentSpan.setAttribute("user.name", user.name);
    // }

    // Call the /validateuser endpoint on apptwo before sending the user data
    // Ensure the context is propagated with the outgoing request
    // const getEvents = await context.with(
    //   trace.setSpan(context.active(), parentSpan),
    //   async () => {
    //     // Prepare headers for context injection
    //     const carrier = {};
    //     propagation.inject(context.active(), carrier);

    //     // Make the HTTP request with the injected context in headers
    //     return axios.get("http://localhost:5000/validateuser", {
    //       headers: carrier,
    //     });
    //   }
    // );

    const getEvents = await eventsServiceProvider.getEvents();

    // Send the user data as a JSON response
    res.json(getEvents);
  } catch (error) {
    // if (parentSpan) {
    //   parentSpan.recordException(error);
    // }
    // res.status(500).send(error.message);
  } finally {
    // End the span if it was manually created
    // Note: If the span was created by OpenTelemetry's HTTP instrumentation, it might be automatically ended
    // if (parentSpan) {
    //   parentSpan.end();
    // }
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Events Info running at http://localhost:${port}`);
});

// Gracefully shut down the OpenTelemetry SDK and the server
const gracefulShutdown = () => {
  server.close(() => {
    console.log("Server stopped");
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
