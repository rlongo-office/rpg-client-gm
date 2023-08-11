import { z } from 'zod'

// Zod schema for shallow objects with any combination of string keys and string/numeric values. Race would be such for example.
const GenericObjSchema = z.record(z.union([z.string(), z.number()]))

//Use AnyStat when we only need to validate an object with a numeric "stat" value
const AnyStatSchema = z.object({
  stat: z.number(),
})

const AbilitySchema = z.object({
  name: z.string(),
  type: z.literal('ability'),
  stat: z.number().int().min(3).max(30),
})

// Zod schema for the Range interface
const RangeSchema = z.object({
  normal: z.number(),
  long: z.number(),
})

// Zod schema for the Weapon interface
const WeaponSchema = z.object({
  name: z.string(),
  category: z.array(z.string()),
  type: z.array(z.string()),
  attack: z.number(),
  damage: z.string(),
  proficient: z.boolean(),
  range: RangeSchema,
  special: z.string(),
})

// Zod schema for the Defense interface
const DefenseSchema = z.object({
  name: z.string(),
  category: z.array(z.string()),
  type: z.array(z.string()),
  ac: z.number(),
  damage: z.string(),
  proficient: z.boolean(),
  special: z.string(),
})

// Zod schema for the Spell interface
const SpellSchema = z.object({
  name: z.string(),
  type: z.string(),
  level: z.number(),
  castTime: z.string(),
  range: z.number(),
  duration: z.string(),
  dc: z.number(),
  casterLevel: z.number(),
  castsLeft: z.number(),
  unlimited: z.boolean(),
  description: z.string(),
  components: z.array(z.string()),
  schools: z.array(z.string()),
  traits: z.array(z.string()).optional(),
})

// Zod schema for the Inventory interface
const InventorySchema = z.object({
  name: z.string(),
  quantity: z.number(),
  weight: z.number(),
  cost: z.number(),
  gearType: z.string(),
  description: z.string(),
  location: z.string(),
})

// Zod schema for the Skill interface
const SkillSchema = z.object({
  name: z.string(),
  stat: z.number(),
  passive: z.number(),
  description: z.string(),
})

// Zod schema for the Purse interface
const PurseSchema = z.object({
  platinum: z.number(),
  gold: z.number(),
  electrum: z.number(),
  silver: z.number(),
  copper: z.number(),
})

// Zod schema for the Class interface
const ClassSchema = z.object({
  level: z.number(),
  name: z.string(),
  spells: z.string(),
  castLevel: z.number(),
  spellAttack: z.number(),
  spellSave: z.number(),
  castSource: z.string(),
  spellAbility: z.string(),
  classHitDice: z.string(),
})

// Zod schema for the Id interface
const IdSchema = z.object({
  $oid: z.string(),
})

// Zod schema for the Character interface
const CharacterSchema = z.object({
  _id: IdSchema,
  name: z.string(),
  active: z.boolean(),
  role: z.string(),
  backStory: z.string(),
  player: z.string(),
  gender: z.string(),
  age: z.number(),
  race: GenericObjSchema,
  alignment: z.string(),
  hair: z.string(),
  eyes: z.string(),
  skin: z.string(),
  height: z.number(),
  weight: z.number(),
  size: z.number(),
  reach: z.number(),
  hitpoint: z.number(),
  damage: z.number(),
  deity: z.array(z.string()),
  experience: z.number(),
  classes: z.array(ClassSchema),
  senses: GenericObjSchema,
  auras: z.array(z.string()),
  purse: PurseSchema,
  languages: z.array(GenericObjSchema),
  toolProfs: z.array(z.string()),
  weaponProfs: z.array(z.string()),
  armorProfs: z.array(z.string()),
  abilities: z.array(AbilitySchema),
  abilityMods: z.array(GenericObjSchema),
  skills: z.array(SkillSchema),
  allSaves: z.array(GenericObjSchema),
  armorClass: z.number(),
  initiative: z.number(),
  speed: z.number(),
  encumbrance: z.number(),
  carriedWeight: z.number(),
  inventories: z.array(InventorySchema),
  spells: z.array(SpellSchema),
  specials: z.array(GenericObjSchema),
  defenses: z.array(DefenseSchema),
  weapons: z.array(WeaponSchema),
})

export interface FormElement {
  type: string
  min?: number
  max?: number
  integer?:boolean
}

// Define FormElement and other interfaces here

export const createInputArray = (source: object, validation: z.ZodObject<any>): FormElement[] => {
  const inputArray: FormElement[] = []
  const schemaKeys = Object.keys(validation.shape)

  for (const key in source) {
    if (schemaKeys.includes(key)) {
      const defType = validation.shape[key] as z.ZodString | z.ZodNumber

      if (defType instanceof z.ZodString) {
        const minConstraint = (
          defType._def.checks.find(({ kind }) => kind === 'min') as { kind: 'min'; value: number }
        ).value
        const maxConstraint = (
          defType._def.checks.find(({ kind }) => kind === 'max') as { kind: 'max'; value: number }
        ).value

        inputArray.push({
          type: 'string',
          min: minConstraint !== undefined ? minConstraint : -1,
          max: maxConstraint !== undefined ? maxConstraint : -1,
        })
      } else if (defType instanceof z.ZodNumber) {
        const minConstraint = (
            defType._def.checks.find(({ kind }) => kind === 'min') as { kind: 'min'; value: number }
          ).value
          const maxConstraint = (
            defType._def.checks.find(({ kind }) => kind === 'max') as { kind: 'max'; value: number }
          ).value

        inputArray.push({
          type: 'number',
          min: minConstraint !== undefined ? minConstraint : -1,
          max: maxConstraint !== undefined ? maxConstraint : -1
        })
      }
    }
  }

  return inputArray
}
