const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { BatchSpanProcessor } = require("@opentelemetry/tracing");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

// Redis Instrumentation
const {
  RedisInstrumentation,
} = require("@opentelemetry/instrumentation-redis-4");

// const redisInstrumentation = new RedisInstrumentation({
//   dbStatementSerializer: function (cmdName, cmdArgs) {
//     return [cmdName, ...cmdArgs].join(" ");
//   },
// });

// MongoDB Instrumentation
const {
  MongoDBInstrumentation,
} = require("@opentelemetry/instrumentation-mongodb");


function configureOpenTelemetry(serviceName) {
  // Create a tracer provider and register the Express instrumentation
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      // Add other resource attributes as needed
    }),
  });
  provider.register();

  // Configure and register Jaeger exporter
  const exporter = new JaegerExporter({
    serviceName: serviceName,
    agentHost: "localhost", // Change this to your Jaeger host
    agentPort: 16686, // Change this to your Jaeger port
  });

  // Use BatchSpanProcessor
  const spanProcessor = new BatchSpanProcessor(exporter);
  provider.addSpanProcessor(spanProcessor);

  // Register the Express instrumentation
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      new ExpressInstrumentation(),
      new RedisInstrumentation(),
      new MongoDBInstrumentation(),
    ],
  });

  return provider;
}

module.exports = configureOpenTelemetry;
