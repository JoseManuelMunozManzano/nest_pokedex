import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

// El objetivo es poder sustituir axios por FetchApi, request... fácilmente.
// Se crea un adaptador (un custom provider) que envuelva axios (wrapper) para que, en lugar de tener el
// código de terceros incrustado en seed.service.ts, tenga mi propia implementación.
// Se crea en el módulo common porque otros módulos pueden acabar usándolo.
// Es un provider porque va a poder inyectarse.
// Y hay que exportarlo e importar el módulo CommonModule donde queramos usarlo.

// Si axios cambia el día de mañana solo tendré que cambiar esta clase
@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }
}
