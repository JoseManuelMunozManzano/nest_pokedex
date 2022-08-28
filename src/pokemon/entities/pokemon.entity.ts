import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Las entidades hacen referencia a como vamos a querer trabajar en nuestra BD.
// Cada instancia sería un registro en BD, colección/documento en Mongo.
//
// Queremos que Pokemon sea un documento y para ello se extiende de Document.
// El nombre del documento será Pokemons y lo asigna Mongo automáticamente.
//
// El decorador @Schema es de Nest y sirve para indicarle a Nest que es un esquema de BD.

@Schema()
export class Pokemon extends Document {
  // id: string    El id de Mongo lo da Mongo automáticamente

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// El esquema se exporta
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
