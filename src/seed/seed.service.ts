import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: AxiosAdapter,
  ) {}

  async executeSeed() {
    const data = await this.httpAdapter.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650&offset=0',
    );

    await this.pokemonModel.deleteMany({});

    await this.pokemonModel.insertMany(
      data.results.map(({ name, url }) => {
        const segments = url.split('/');
        const number = +segments[segments.length - 2];
        return { name, number };
      }),
    );

    return { status: 'OK' };
  }
}
