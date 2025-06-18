import { exit } from "node:process";
import { BatchResponseTypes, ClientTypes, ResponseTypes } from "./types";
import { getAvailableModels } from "./utils";

class M3ChatClient {
  private stream: boolean;

  constructor(options: ClientTypes = {}) {
    this.stream = options.stream ?? false;
  }

  async getResponse({ model, content }: ResponseTypes) {
    const modelList = getAvailableModels();
    if (!modelList.includes(model)) {
      console.error(
        `${model} is not an available model.\nSupported models: ${modelList.join(
          ", "
        )}`
      );
      exit(1);
    }

    const url = new URL("https://m3-chat.vercel.app/api/gen");
    if (model) url.searchParams.set("model", model);
    if (content) url.searchParams.set("content", content);

    const res = await fetch(url.toString(), {
      headers: {
        Accept: this.stream ? "text/event-stream" : "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    if (this.stream) {
      if (!res.body) throw new Error("No response body for streaming");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        process.stdout.write(chunk);
      }
    } else {
      const text = await res.text();
      console.log(text);
    }
  }

  async batchRequests(
    messages: string[],
    options: BatchResponseTypes = {}
  ): Promise<string[]> {
    const results: string[] = [];

    for (const content of messages) {
      const params = new URLSearchParams();
      params.append("content", content);
      if (options.model) params.append("model", options.model);

      const res = await fetch(
        `https://m3-chat.vercel.app/api/gen?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.text();
      results.push(data);
    }

    return results;
  }
}

export { M3ChatClient };
