
export type DamageType = { 
  index: string; 
  name: string; 
  url: string;
  };
  
  export type Proficiency = {
    index: string;
    name: string;
    url: string;
  };
  
  export type AbilityUsage = {
    type: string;
    times: number;
  };
  
  export type Damage = {
    damage_type: DamageType;
    damage_dice: string;
  };
  
  export type SavingThrow = {
    proficiency: Proficiency;
    value: number;
  };
  
  export type Action = {
    name: string;
    desc: string;
    options: {
      choose: number
      from: Array<Array<{ name: string; count: number; type: string }>>;
    };
    damage: Damage[];
    dc?: {
      dc_type: { index: string; name: string; url: string };
      dc_value: number;
      success_type: string;
    };
    attack_bonus?: number;
    usage?: {
      type: string;
      dice: string;
      min_value: number;
    };
  };
  
  export type SpecialAbility = {
    name: string;
    desc: string;
    usage: AbilityUsage;
  };
  
  //Defining Sense broadly because it incudes a "passive_perception" but a variable number of other senses
  //that are defined as string/string key/values. And the number of different senses could change in the future so
  //we should not hardcode the types of senses

  export interface GenericStat {
    [key: string]: string | number
  }

  export interface Speed extends GenericStat {
    walk: string
    burrow: string
    fly: string
  }

  export type GroundCreature = Omit<Speed, "fly">

  export type Stats = {
    $numberInt: string
  }

  export type Creature = {
    _id: { $oid: string }
    index: string
    name: string
    size: string
    type: string
    subtype: null
    alignment: string
    armor_class: number
    hit_points: number
    hit_dice: string
    speed: Speed
    access: string[]
    recordType: string
    strength: Stats
    dexterity: Stats
    constitution: Stats
    intelligence: Stats
    wisdom: Stats
    charisma: Stats
    proficiencies: SavingThrow[]
    damage_vulnerabilities: string[]
    damage_resistances: string[]
    damage_immunities: string[]
    condition_immunities: string[]
    senses: GenericStat
    languages: string
    challenge_rating: number
    xp: number
    special_abilities: SpecialAbility[]
    actions: Action[]
  }

  type Stat = {
    raw: number
    adj: number
  }

  type Range = {
    normal: number
    long: number
  }


  type Language = {
    name: string
    type: string
    stat: number
  }

  type Skill = {
    name: string
    stat: number
    passive: number
    description: string
  }

  type PlayerClass = {
    level: number
    name: string
    spells: string
    castLevel: number
    spellAttack: number
    spellSave: number
    castSource: string
    spellAbility: string
    classHitDice: string
  }

  type CoinPurse = {
    platinum: number
    gold: number
    electrum: number
    silver: number
    copper: number
  }

  type Ability = {
    name: string
    type: string
    stat: number
  }

  type Inventory = {
    name: string
    quantity: number
    weight: number
    cost: number
    gearType: string
    description: string
    location: string
  }

  export type Character = {
    _id: { $oid: string }
    name: string
    active: boolean
    role: string
    backStory: string
    player: string
    gender: string
    age: number
    race: GenericStat
    alignment: string
    hair: string
    eyes: string
    skin: string
    height: number
    weight: number
    size: number
    reach: number
    hitpoint: number
    damage: number
    deity: string[]
    experience: number
    classes: PlayerClass[]
    languages: Language[]
    abilities: Ability[]
    abilityMods: Ability[]
    skills: Skill[]
    allSaves: Ability[]
    toolProfs:string[]
    weaponProfs:string[]
    armorProfs:string[]
    senses: GenericStat
    auras: string[]
    purse: CoinPurse
    armorClass: number
    initiative: number
    speed: number
    encumbrance: number
    carriedWeight: number
    inventories: Inventory[]
    spells: PlayerSpell[]
    specials:Special[]
    defenses:DefenseElement[]
    weapons:Weapon[]
  }

  export type PlayerSpell = {
    name: string
    type: string
    level: number
    castTime: string
    range: Range
    duration: string
    dc: number
    casterLevel: number
    castsLeft: number
    unlimited: boolean
    description: string
    components: string[]
    schools: string[]
    traits?: string[]
  }

  type Special = {
    name: string
    type: string
    source: string
    description: string
  }

  export type Item = {
    _id: {
      $oid: string
    }
    index: string
    name: string
    access: string[]
    recordType: string
    equipment_category: {
      index: string
      name: string
      url: string
    }
    desc: string[]
    url: string
  }

  export type Weapon = {
    name: string
    category: string[]
    type: string[]
    attack: number
    damage: string
    proficient: boolean
    range: Range
    special: string
  }

  export type DefenseElement = {
    name: string
    category: string[]
    type: string[]
    ac: number
    damage: string
    proficient: boolean
    special: string
}

  export type Defense = {
    armor: {
      name: string
      ac: string
      equipped: string
      natural: string
      stealth: string
      maxdex: string
      strengthrequired: string
      useradded: string
      quantity: string
      isproficient: string
      weight: {
        text: string
        value: string
      }
      geartype: {
        text: string
      }
      description: {
        text: string
      }
    }
  }

export interface Access {
  access: {user: string, type: string}
}

export interface Spell extends Access {
    _id: { $oid: string }
    index: string
    name: string
    recordType: string
    desc: string[]
    range: Range
    components: string[]
    material: string
    ritual: boolean
    duration: string
    concentration: boolean
    casting_time: string
    level: number
    damage?: {
      damage_type: {
        index: string
        name: string
        url: string
      }
      damage_at_slot_level: {
        [level: number]: string
      }
    }
    dc?: {
      dc_type: {
        index: string
        name: string
        url: string
      }
      dc_success: string
    }
    area_of_effect?: {
      type: string
      size: number
    }
    school: {
      index: string
      name: string
      url: string
    }
    classes: {
      index: string
      name: string
      url: string
    }[]
    subclasses: any[]
    url: string
  }

  export interface InputConfigNode {
    type: 'text' | 'number' | 'dropdown';
    options?: string[];
    required?: boolean;
  }

  export interface StringInputConfig extends InputConfigNode {
    type: 'text';
    maxLength?: number;
  }
  
  export interface NumberInputConfig extends InputConfigNode {
    type: 'number';
    min?: number;
    max?: number;
  }
  
  export interface DropdownInputConfig extends InputConfigNode {
    type: 'dropdown';
    options: string[];
  }

  export interface InputConfigMap {
    [key: string]: InputConfigNode
  }


  export interface EditorState {
    value: string | number;
    inputConfig: InputConfigNode | null;
  }