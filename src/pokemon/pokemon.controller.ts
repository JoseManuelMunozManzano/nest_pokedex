import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  // Obtenemos query parameters para no usar hardcodes en limit y skip
  // Ejemplo de query parameters: localhost:3000/api/v2/pokemon?limite=200&otra=true
  // Recibiríamos, COMO STRING, '200' y 'true'
  // Estos query parameters son opcionales y hay que validarlos
  // Creamos un dto para poder trabajar con estos query parameters lo mismo que pudimos trabajar con
  // el @Body. Como se podría usar en otros módulos, este dto lo creamos en la carpeta de common.
  //
  // Como queremos números (limite y offset) y recibimos string, tenemos que transformalos.
  // Hay 2 posibilidades:
  // 1. La mala. Poner en pagination.dto.ts ambos campos con tipo string y añadir el decorador @IsNumber()
  // 2. No mala. Ir al fuente main.ts y en app.userGlobalPipes podemos transformar los dto en el tipo de
  //    datos que estamos esperando. Esto tiene pros y contras. Los pros es que es fácil de validar la data
  //    de nuestro dto porque viene con la apariencia deseada. La contra es que la información se va a tener
  //    que procesar, crear la instancia y eso consume memoria.
  //    Se realiza esta opción.
  //
  // Por último indicar que el offset es realmente la paginación porque son los elementos que NO pasamos.
  // Si se van incrementando da la sensación de paginar.
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
