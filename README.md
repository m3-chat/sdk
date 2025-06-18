# @m3chat SDK

[![npm version](https://img.shields.io/npm/v/@m3chat/sdk.svg)](https://www.npmjs.com/package/@m3chat/sdk) [![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE) [![build](https://github.com/m3-chat/sdk/actions/workflows/publish.yml/badge.svg)](https://github.com/m3-chat/sdk/actions/workflows/publish.yml)

`@m3chat/sdk` is the official TypeScript/JavaScript client SDK for **M3 Chat** — a powerful AI chat platform powered by multiple models including LLaMA, Mistral, Qwen, and more. This SDK provides a simple and flexible interface to interact with M3 Chat's API for sending chat messages, streaming responses, batch requests, and model management.

## Table of Contents

- [Introduction](https://github.com/m3-chat/sdk?tab=readme-ov-file#m3chat-sdk)
- [Table of Contents](https://github.com/m3-chat/sdk?tab=readme-ov-file#table-of-contents)
- [Features](https://github.com/m3-chat/sdk?tab=readme-ov-file#features)
- [Installation](https://github.com/m3-chat/sdk?tab=readme-ov-file#installation)
- [Quick Start](https://github.com/m3-chat/sdk?tab=readme-ov-file#quick-start)
- [Usage](https://github.com/m3-chat/sdk?tab=readme-ov-file#usage)
  - [Creating a Client](https://github.com/m3-chat/sdk?tab=readme-ov-file#creating-a-client)
  - [Getting a Response](https://github.com/m3-chat/sdk?tab=readme-ov-file#getting-a-response)
  - [Batch Requests](https://github.com/m3-chat/sdk?tab=readme-ov-file#batch-requests)
- [Available Models](https://github.com/m3-chat/sdk?tab=readme-ov-file#available-models)
- [Error Handling](https://github.com/m3-chat/sdk?tab=readme-ov-file#error-handling)
- [Development](https://github.com/m3-chat/sdk?tab=readme-ov-file#development)
- [Contribution](https://github.com/m3-chat/sdk?tab=readme-ov-file#contribution)
- [License](https://github.com/m3-chat/sdk?tab=readme-ov-file#license)
- [Contact](https://github.com/m3-chat/sdk?tab=readme-ov-file#contact)
- [Example Project](https://github.com/m3-chat/sdk?tab=readme-ov-file#example-project)

## Features

- Send chat requests to M3 Chat API
- Support for streaming and non-streaming responses
- Batch request support for multiple messages
- Validation of available models
- Easy to integrate in Node.js and browser environments
- Written in TypeScript with types included

## Installation

```bash
npm install @m3chat/sdk
# or
yarn add @m3chat/sdk
```

## Quick Start

```ts
import { M3ChatClient } from "@m3chat/sdk";

async function main() {
  const client = new M3ChatClient({ stream: false });

  try {
    const response = await client.getResponse({
      model: "mistral",
      content: "Hello, how are you?",
    });
    console.log("Response:", response);
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}

main();
```

## Usage

### Creating a Client

```ts
import { M3ChatClient } from "@m3chat/sdk";

const client = new M3ChatClient({
  stream: true, // Set to true to enable streaming response
});
```

### Getting a Response

```ts
const response = await client.getResponse({
  model: "llama3:8b",
  content: "Explain quantum computing in simple terms.",
});

console.log(response);
```

- If `stream` option is enabled, the response is streamed and printed chunk-by-chunk in real time.
- If disabled, the full response is returned as a string.

### Batch Requests

Send multiple messages in sequence:

```ts
const messages = [
  "Hello, who won the world cup in 2022?",
  "What is the capital of France?",
  "Tell me a joke.",
];

const results = await client.batchRequests(messages, {
  model: "gemma",
});

results.forEach((res, idx) => {
  console.log(`Response ${idx + 1}: ${res}`);
});
```

## Available Models

The SDK internally validates models against this list:

```ts
[
  "llama3:8b",
  "llama2-uncensored",
  "gemma3",
  "gemma",
  "phi3:mini",
  "mistral",
  "gemma:2b",
  "gemma:7b",
  "qwen:7b",
  "qwen2.5-coder",
  "qwen3",
  "deepseek-coder:6.7b",
  "deepseek-v2:16b",
  "dolphin-mistral:7b",
  "dolphin3",
  "starcoder2:7b",
  "magistral",
  "devstral",
];
```

If an unsupported model is passed, the SDK throws an error.

## Error Handling

- Throws if the API returns non-OK status.
- Throws if an invalid model is provided.
- Throws if streaming response body is missing.

## Development

Clone the repository, install dependencies, and build:

```bash
git clone https://github.com/m3-chat/sdk.git
cd sdk
npm install
npm run build
```

## Contribution

Contributions are welcome! Please open issues and pull requests on the [GitHub repository](https://github.com/m3-chat/sdk).

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, join [M3 Chat discussions](https://github.com/orgs/m3-chat/discussions) or open an issue on GitHub.

## Example Project

```ts
import { M3ChatClient } from "@m3chat/sdk";

(async () => {
  const client = new M3ChatClient({ stream: false });

  try {
    const response = await client.getResponse({
      model: "gemma",
      content: "Write a poem about the sea.",
    });
    console.log("Chat response:", response);
  } catch (error) {
    console.error(error);
  }
})();
```

Thank you for using **M3 Chat SDK** — build awesome AI chat experiences with ease!
