import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=3',
    );

    // Forma 2 de evitar esperar en cada inserción (FORMA OPTIMA)
    //   Con arreglos e insertMany (por eso paso Mongoose en vez de PokemonService)
    //   donde solo se hace una inserción
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      // Se evita hacer un await a cada una de las peticiones
      // Tenemos un arreglo aquí
      pokemonToInsert.push({ name, no });
    });

    // Aquí se hace solo 1 inserción con un montón de entradas, pero solo 1 inserción
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
