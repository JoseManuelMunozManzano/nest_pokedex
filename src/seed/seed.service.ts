import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  // FetchApi solo funciona en la versión de Node 18 o superior.
  // Se va a usar axios
  //
  // Dependencia no inyectada, pero así sabemos que hay una dependencia.
  // Por ahora lo dejamos así, pero la idea es implementar inyección de dependencia
  // para poder sustituir esta dependencia de axios por request o por FetchApi o cualquier
  // otro paquete que nos sirva para realizar peticiones HTTP (patrón Adaptador)
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      console.log({ name, no });
    });

    return data.results;
  }
}
