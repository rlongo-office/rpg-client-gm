import { inherits } from "util";

export interface Character {
    _id: Id;
    name: string;
    active: boolean;
    role: string;
    backStory: string;
    player: string;
    gender: string;
    age: number;
    race: GenericStat;
    alignment: string;
    hair: string;
    eyes: string;
    skin: string;
    height: number;
    weight: number;
    size: number;
    reach: number;
    hitpoint: number;
    damage: number;
    deity: string[];
    experience: number;
    classes: Class[];
    senses: GenericStat;
    auras: string[];
    purse: Purse;
    languages: GenericStat;
    toolProfs: string[];
    weaponProfs: string[];
    armorProfs: string[];
    abilities: GenericStat;
    abilityMods: GenericStat;
    skills: Skill[];
    allSaves: GenericStat;
    armorClass: number;
    initiative: number;
    speed: number;
    encumbrance: number;
    carriedWeight: number;
    inventories: Inventory[];
    spells: Spell[];
    specials: GenericStat;
    defenses: Defense[];
    weapons: Weapon[];
  }
  
  export interface Weapon {
    name: string;
    category: string[];
    type: string[];
    attack: number;
    damage: string;
    proficient: boolean;
    range: Range;
    special: string;
  }

  export interface Defense {
    name: string;
    category: string[];
    type: string[];
    ac: number;
    damage: string;
    proficient: boolean;
    special: string;
  }
  
  export interface Range {
    normal: number;
    long: number;
  }
  
  export interface Special {
    name: string;
    type: string;
    source: string;
    description: string;
  }
  
  export interface Spell {
    name: string;
    type: string;
    level: number;
    castTime: string;
    range: number;
    duration: string;
    dc: number;
    casterLevel: number;
    castsLeft: number;
    unlimited: boolean;
    description: string;
    components: string[];
    schools: string[];
    traits?: string[];
  }
  
  export interface Inventory {
    name: string;
    quantity: number;
    weight: number;
    cost: number;
    gearType: string;
    description: string;
    location: string;
  }
  
  export interface Skill {
    name: string;
    stat: number;
    passive: number;
    description: string;
  }
  
  
  export interface Purse {
    platinum: number;
    gold: number;
    electrum: number;
    silver: number;
    copper: number;
  }
  
  export interface Senses {
  }
  
  export interface Class {
    level: number;
    name: string;
    spells: string;
    castLevel: number;
    spellAttack: number;
    spellSave: number;
    castSource: string;
    spellAbility: string;
    classHitDice: string;
  }
  
  export interface GenericStat {
    [key: string]: string | number
  }

  export interface Race extends GenericStat {

  }
  
  export interface Id {
    '$oid': string;
  }