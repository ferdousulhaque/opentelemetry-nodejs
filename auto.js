const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const traceExporter = new JaegerExporter({
  // Jaeger agent UDP Thrift endpoint
  endpoint: "http://localhost:14268/api/traces",
  serviceName: "app-one", // Replace with your service name
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "app-one", // Replace 'your-service-name' with the actual name of your service
  }),
});

try {
  sdk.start();
  console.log("Tracing initialized");
} catch (error) {
  console.log("Error initializing tracing", error);
}

module.exports = sdk;
