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
    // Borramos todo antes de insertar para evitar insertar duplicados
    await this.pokemonModel.deleteMany();

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=3',
    );

    // Forma 1 de evitar esperar en cada inserción.
    //   Con promesas donde al final se insertan todas de forma simultanea
    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      // Se evita hacer un await a cada una de las peticiones
      // Problema: Se hacen múltiples inserciones
      insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    });

    // Aquí se hacen todas las inserciones de manera simultanea
    await Promise.all(insertPromisesArray);

    return 'Seed Executed';
  }
}
