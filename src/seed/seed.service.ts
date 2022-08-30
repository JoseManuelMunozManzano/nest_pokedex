import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

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

  constructor(
    // Inyecciones de dependencia. Se inyectan automáticamente.
    // La instancia es la misma en toda la aplicación por defecto.
    //
    // Si se hubiera exportado PokemonService esto sería
    //private readonly pokemonService: PokemonService;
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=3',
    );

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      // Problema: Si hay que insertar muchísimos registros hay que esperar
      await this.pokemonModel.create({ name, no });
    });

    return 'Seed Executed';
  }
}
