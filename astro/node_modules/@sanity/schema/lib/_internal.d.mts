import {Schema} from '@sanity/types'
import {SchemaType} from '@sanity/types'
import {SchemaType as SchemaType_2} from 'groq-js'
import {SchemaTypeDefinition} from '@sanity/types'
import {SchemaValidationProblem} from '@sanity/types'
import {SchemaValidationProblemGroup} from '@sanity/types'
import {SetSynchronization} from '@sanity/descriptors'
import {SynchronizationRequest} from '@sanity/descriptors'
import {SynchronizationResult} from '@sanity/descriptors'

export declare const builtinTypes: {
  name: string
  title: string
  type: string
  fields: {
    name: string
    type: string
  }[]
}[]

export declare const DEFAULT_MAX_FIELD_DEPTH = 5

export declare class DescriptorConverter {
  opts: Options
  cache: WeakMap<Schema, SetSynchronization<RegistryType>>
  constructor(opts: Options)
  /**
   * Returns a synchronization object for a schema.
   *
   * This is automatically cached in a weak map.
   */
  get(schema: Schema): SetSynchronization<RegistryType>
}

export declare function extractSchema(
  schemaDef: Schema,
  extractOptions?: ExtractSchemaOptions,
): SchemaType_2

declare interface ExtractSchemaOptions {
  enforceRequiredFields?: boolean
}

/**
 * @internal
 */
export declare type FIXME = any

/**
 * @internal
 */
export declare function groupProblems(types: SchemaTypeDefinition[]): SchemaValidationProblemGroup[]

export declare const isActionEnabled: (schemaType: SchemaType, action: string) => boolean

/**
 * Options used when converting the schema.
 *
 * We know we need this in order to handle validations.
 **/
declare type Options = Record<never, never>

declare interface Options_2 {
  transformTypeVisitors?: (visitors: typeof typeVisitors) => Partial<typeof typeVisitors>
}

/**
 * @internal
 */
export declare type ProblemPath = ProblemPathSegment[]

/**
 * @internal
 */
export declare interface ProblemPathPropertySegment {
  kind: 'property'
  name: string
}

/**
 * @internal
 */
export declare type ProblemPathSegment = ProblemPathTypeSegment | ProblemPathPropertySegment

/**
 * @internal
 */
export declare interface ProblemPathTypeSegment {
  kind: 'type'
  type: string
  name: string
}

/**
 * Returns the next request that should be generated for synchronizing the
 * schema, based on the previous response from the /synchronize endpoint.
 *
 * @param response - The previous response, or `null` if it's the first request.
 * @returns The next request, or `null` if it's been fully synchronized.
 */
export declare function processSchemaSynchronization(
  sync: SetSynchronization<RegistryType>,
  response: SchemaSynchronizationResult | null,
): SchemaSynchronizationRequest | null

declare type RegistryType = 'sanity.schema.registry'

/**
 * @internal
 */
export declare function resolveSearchConfig(type: any, maxDepth?: number): any

export declare function resolveSearchConfigForBaseFieldPaths(type: any, maxDepth?: number): any

export declare type SchemaSynchronizationRequest = SynchronizationRequest

export declare type SchemaSynchronizationResult = SynchronizationResult

/**
 * @internal
 */
declare interface SchemaValidationResult {
  severity: 'warning' | 'error'
  message: string
  helpId?: string
}
export {SchemaValidationResult as Problem}
export {SchemaValidationResult as ValidationResult}

declare const typeVisitors: {
  array: (typeDef: any, visitorContext: any) => any
  object: (typeDef: any, visitorContext: any) => any
  slug: (typeDef: any, visitorContext: any) => any
  file: (typeDef: any, visitorContext: any) => any
  image: (typeDef: any, visitorContext: any) => any
  block: typeof validateBlockType
  document: (typeDefinition: any, visitorContext: any) => any
  reference: (typeDef: any, visitorContext: any) => any
  crossDatasetReference: (typeDef: any, visitorContext: any) => any
  globalDocumentReference: (typeDef: any, visitorContext: any) => any
}

/**
 * @internal
 */
export declare interface TypeWithProblems {
  path: ProblemPath
  problems: SchemaValidationResult[]
}

declare function validateBlockType(
  typeDef: any,
  visitorContext: any,
): {
  marks: any
  styles: any
  name: any
  of: any
  _problems: SchemaValidationResult[]
}

/**
 * Ensure that the provided value is a valid Media Library asset aspect that can be safely deployed.
 *
 * @internal
 */
export declare function validateMediaLibraryAssetAspect(
  maybeAspect: unknown,
): [isValidMediaLibraryAspect: boolean, validationErrors: SchemaValidationProblem[][]]

/**
 * @internal
 */
export declare function validateSchema(
  schemaTypes: FIXME,
  {transformTypeVisitors}?: Options_2,
): {
  get(typeName: string): any
  has(typeName: string): boolean
  getTypeNames(): string[]
  getTypes(): any[]
  toJSON(): any[]
}

export {}
