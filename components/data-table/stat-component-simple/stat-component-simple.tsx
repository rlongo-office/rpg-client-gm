import * as React from 'react'
import Image from 'next/image'
import {
  abilityBox,
  abilityStat,
  attackBoxLong,
  attackBoxShort,
  attackBoxSquare,
  HSpaced,
  HSpacedSqueeze,
  inventoryBoxLong,
  inventoryBoxShort,
  midStatBox,
  ParentDiv,
  roundSquareStat,
  skillBox,
  skillStatBox,
  skillTitle,
  squareLineSpell,
  squareStat,
  squareStatSmall,
  squareStatSpell,
  squareTitleBox,
  squareTitleSpell,
  StateImageBox,
  vertStack,
} from '../../../styles/styles-test'

function StatComponentSimple() {
  return (
    <div style={ParentDiv} id="parent-stat-component">
      <div style={vertStack}>
        <div>
          <div>
            <Image alt="heart" src="/heart.png" height="100px" width="100px"></Image>
          </div>
          <div style={StateImageBox}></div>
        </div>
        <div id="topBar">
          <div id="topSection" style={HSpaced}>
            <div style={{ ...squareTitleBox, borderColor: 'blue', backgroundColor: 'AliceBlue' }}>
              Rollo
            </div>
            <div style={{ ...squareTitleBox, borderColor: 'blue', backgroundColor: 'AliceBlue' }}>
              Monk 1
            </div>
          </div>
        </div>
        <div id="topStatSection" style={HSpaced}>
          <div style={squareStat}>
            <div style={{ textAlign: 'center' }}>Initiative 2</div>
          </div>
          <div style={StateImageBox}>
            <div style={{ textAlign: 'center' }}>Hitpoints</div>
            <div style={{ textAlign: 'center' }}>15</div>
          </div>
          <div style={squareStat}>
            <div style={{ textAlign: 'center' }}>Speed</div>
          </div>
        </div>
        <div id="midStatSection" style={midStatBox}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={roundSquareStat}>
              <div style={{ textAlign: 'center' }}>Hit Dice</div>
              <div style={{ textAlign: 'center' }}>1d8</div>
            </div>
            <div style={roundSquareStat}>
              <div style={{ textAlign: 'center' }}>Armor Class</div>
              <div style={{ textAlign: 'center' }}>13</div>
            </div>
            <div style={roundSquareStat}>
              <div style={{ textAlign: 'center' }}>Proficiency</div>
              <div style={{ textAlign: 'center' }}>+2</div>
            </div>
          </div>
        </div>
        <div id="abilitySection" style={abilityBox}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
              <div style={abilityStat}>
                <div style={{ textAlign: 'center' }}>Strength</div>
                <div style={{ textAlign: 'center' }}>14 +2 +2</div>
              </div>
              <div style={abilityStat}>
                <div style={{ textAlign: 'center' }}>Dexterity</div>
                <div style={{ textAlign: 'center' }}>15 +2 +4</div>
              </div>
              <div style={abilityStat}>
                <div style={{ textAlign: 'center' }}>Constitution</div>
                <div style={{ textAlign: 'center' }}>14 +2 +2</div>
              </div>
            </div>
            <div>
              <div style={abilityStat}>
                <div style={{ textAlign: 'center' }}>Intelligence</div>
                <div style={{ textAlign: 'center' }}>8 -1 +1</div>
              </div>
              <div style={abilityStat}>
                <div style={{ textAlign: 'center' }}>Wisdon</div>
                <div style={{ textAlign: 'center' }}>14 +2 +2</div>
              </div>
              <div style={abilityStat}>
                <div style={{ textAlign: 'center' }}>Charisma</div>
                <div style={{ textAlign: 'center' }}>10 0 0</div>
              </div>
            </div>
          </div>
        </div>
        <div id="skillSection">
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
              <div style={skillBox}>
                <div style={skillTitle}>
                  <div>Strength</div>
                  <div>+2</div>
                </div>
                <div style={skillStatBox}>
                  <div>Athletics</div>
                  <div>4</div>
                </div>
              </div>
              <div style={skillBox}>
                <div style={skillTitle}>
                  <div>Dexterity</div>
                  <div>+2</div>
                </div>
                <div style={skillStatBox}>
                  <div>Acrobatics</div>
                  <div>4</div>
                </div>
                <div style={skillStatBox}>
                  <div>Sleight of Hand</div>
                  <div>2</div>
                </div>
                <div style={skillStatBox}>
                  <div>Stealth</div>
                  <div>6</div>
                </div>
              </div>
              <div style={skillBox}>
                <div style={skillTitle}>
                  <div>Intelligence</div>
                  <div>-1</div>
                </div>
                <div style={skillStatBox}>
                  <div>Arcana</div>
                  <div>-1</div>
                </div>
                <div style={skillStatBox}>
                  <div>History</div>
                  <div>-1</div>
                </div>
                <div style={skillStatBox}>
                  <div>Investigation</div>
                  <div>-1</div>
                </div>
                <div style={skillStatBox}>
                  <div>Nature</div>
                  <div>-1</div>
                </div>
                <div style={skillStatBox}>
                  <div>Religion</div>
                  <div>-1</div>
                </div>
              </div>
            </div>
            <div>
              <div style={skillBox}>
                <div style={skillTitle}>
                  <div>Wisdom</div>
                  <div>+2</div>
                </div>
                <div style={skillStatBox}>
                  <div>Animal Handling</div>
                  <div>4</div>
                </div>
                <div style={skillStatBox}>
                  <div>Insight</div>
                  <div>2</div>
                </div>
                <div style={skillStatBox}>
                  <div>Medicine</div>
                  <div>2</div>
                </div>
                <div style={skillStatBox}>
                  <div>Perception</div>
                  <div>6</div>
                </div>
                <div style={skillStatBox}>
                  <div>Survival</div>
                  <div>4</div>
                </div>
              </div>
              <div style={skillBox}>
                <div style={skillTitle}>
                  <div>Charisma</div>
                  <div>0</div>
                </div>
                <div style={skillStatBox}>
                  <div>Deception</div>
                  <div>0</div>
                </div>
                <div style={skillStatBox}>
                  <div>Intimidation</div>
                  <div>0</div>
                </div>
                <div style={skillStatBox}>
                  <div>Performance</div>
                  <div>0</div>
                </div>
                <div style={skillStatBox}>
                  <div>Persuasion</div>
                  <div>0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="attackSection">
          <div id="attackTopSection" style={HSpaced}>
            <div style={squareStat}>
              <div style={{ textAlign: 'center' }}>Proficiency</div>
              <div style={{ textAlign: 'center' }}>+2</div>
            </div>
            <div style={squareStat}>
              <div style={{ textAlign: 'center' }}>Dexterity</div>
              <div style={{ textAlign: 'center' }}>+2</div>
            </div>
          </div>
          <div id="attackSection-1">
            <div style={HSpaced}>
              <div style={attackBoxLong}>Rapier</div>
              <div style={attackBoxShort}>5 feet</div>
              <div style={attackBoxShort}>Piercing</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={attackBoxSquare}>+4</div>
              <div style={attackBoxSquare}>1d8+2</div>
            </div>
          </div>
          <div id="attackSection-2">
            <div style={HSpaced}>
              <div style={attackBoxLong}>Dagger</div>
              <div style={attackBoxShort}>20/60</div>
              <div style={attackBoxShort}>Piercing</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={attackBoxSquare}>+4</div>
              <div style={attackBoxSquare}>1d4+2</div>
            </div>
          </div>
          <div id="attackSection-3">
            <div style={HSpaced}>
              <div style={attackBoxLong}>Shortsword</div>
              <div style={attackBoxShort}>5 feet</div>
              <div style={attackBoxShort}>Piercing</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={attackBoxSquare}>+4</div>
              <div style={attackBoxSquare}>1d6+2</div>
            </div>
          </div>
          <div id="attackSection-4">
            <div style={HSpaced}>
              <div style={attackBoxLong}>Shortbow</div>
              <div style={attackBoxShort}>80/320</div>
              <div style={attackBoxShort}>Piercing</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={attackBoxSquare}>+4</div>
              <div style={attackBoxSquare}>1d8+2</div>
            </div>
          </div>
        </div>
        <div id="spellSection">
          <div id="spellTopSection" style={HSpacedSqueeze}>
            <div style={squareStatSpell}>
              <div style={{ textAlign: 'center' }}>Level</div>
              <div style={{ textAlign: 'center' }}>1</div>
            </div>
            <div style={squareStatSpell}>
              <div style={{ textAlign: 'center' }}>Spell Attack</div>
              <div style={{ textAlign: 'center' }}>+4</div>
            </div>
            <div style={squareStatSpell}>
              <div style={{ textAlign: 'center' }}>Spell DC</div>
              <div style={{ textAlign: 'center' }}>12</div>
            </div>
          </div>
          <div id="cantripSection">
            <div style={squareTitleSpell}>Cantrips</div>
            <div style={HSpacedSqueeze}>
              <div style={squareLineSpell}>Mage Hand</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={squareLineSpell}>Light</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={squareLineSpell}>Ray of Frost</div>
            </div>
          </div>
          <div id="Level1Section">
            <div style={squareTitleSpell}>1st Level Spells</div>
            <div style={HSpacedSqueeze}>
              <div style={squareLineSpell}>Burning Hands</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={squareLineSpell}>Charm Person</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={squareLineSpell}>Feather Fall</div>
            </div>
            <div style={HSpacedSqueeze}>
              <div style={squareLineSpell}>Mage Armor</div>
            </div>
          </div>
          <div id="Level2Section">
            <div style={squareTitleSpell}>2nd Level Spells</div>
          </div>
          <div id="Level3Section">
            <div style={squareTitleSpell}>3rd Level Spells</div>
          </div>
          <div id="Level4Section">
            <div style={squareTitleSpell}>4th Level Spells</div>
          </div>
        </div>
        <div id="inventorySection">
          <div style={squareTitleBox}>Inventory</div>
          <div id="inventoryTopSection" style={HSpaced}>
            <div style={squareStatSmall}>
              <div style={{ textAlign: 'center' }}>PP</div>
              <div style={{ textAlign: 'center' }}>0</div>
            </div>
            <div style={squareStatSmall}>
              <div style={{ textAlign: 'center' }}>GP</div>
              <div style={{ textAlign: 'center' }}>10</div>
            </div>
            <div style={squareStatSmall}>
              <div style={{ textAlign: 'center' }}>EP</div>
              <div style={{ textAlign: 'center' }}>0</div>
            </div>
            <div style={squareStatSmall}>
              <div style={{ textAlign: 'center' }}>SP</div>
              <div style={{ textAlign: 'center' }}>0</div>
            </div>
            <div style={squareStatSmall}>
              <div style={{ textAlign: 'center' }}>CP</div>
              <div style={{ textAlign: 'center' }}>0</div>
            </div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>Rapier</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>belt</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>Leather armor</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>worn</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>thieves&apos; tools</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>pack</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>shovel</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>pack</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>iron pot</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>pack</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>shortbow</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>back</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>arrows</div>
            <div style={inventoryBoxShort}>20</div>
            <div style={inventoryBoxShort}>quiver</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>burglar&apos;s pack</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>pack</div>
          </div>
          <div style={{ ...HSpaced, backgroundColor: 'white', borderColor: 'brown' }}>
            <div style={inventoryBoxLong}>clothing</div>
            <div style={inventoryBoxShort}>1</div>
            <div style={inventoryBoxShort}>pack</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatComponentSimple
