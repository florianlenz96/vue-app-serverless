const { app } = require("@azure/functions");

app.http("greeting", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    return { body: `Hello, Florian!` };
  },
});
