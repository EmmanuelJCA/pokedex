import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class FetchAdapter implements HttpAdapter {

  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error('Fetch error - Check logs');
    }
  }

}