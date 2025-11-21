import {Prop, Schema} from '@nestjs/mongoose'
import {AbstractDocument} from "@app/common";

@Schema({versionKey: false})
export class Clima extends AbstractDocument {


}