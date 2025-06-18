import { exit } from "node:process";
import { ClientTypes, ResponseTypes } from "./types";
import { getAvailableModels } from "./utils";

export class M3ChatClient {
  private stream: boolean;

  constructor(options: ClientTypes = {}) {
    this.stream = options.stream ?? false;
  }

  async getResponse({ model, content }: ResponseTypes) {
    const modelList = getAvailableModels();
    if (!modelList.includes(model)) {
      console.error(
        `${model} is not an available model.\n Supported models: ${modelList}`
      );
      exit();
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
}
