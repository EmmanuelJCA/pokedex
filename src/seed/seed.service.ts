import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonService } from '../pokemon/pokemon.service';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: FetchAdapter,
  ) { }

  async executeSeed() {
    await this.pokemonService.removeMany();
    const { results } = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600');
    let pokemons: CreatePokemonDto[] = [];

    results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[ segments.length -2 ];
      name = name.toLowerCase();
      pokemons.push({ no, name });
    })

    await this.pokemonService.createMany(pokemons);

    return 'Seed executed';
  }
}
