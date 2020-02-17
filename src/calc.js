function calc() {
  const [ job ] = Object.keys(CharacterData.identifiers);
  const gear = CharacterData.identifiers[job].getNormalSet();
  const { materiaData } = gear

  const totals = {}

  data = Object.keys(materiaData).map(key => {
    const [itemType, itemID] = key.split("-");
    const item = itemManager.itemList[itemID];
    const isTool = itemType.endsWith("hand")

    // console.log(itemType, itemID, isTool);
    return materiaData[key].map((m, index) => {
      const [ materia , grade] = m.split(":");
      const slot = index + 1;
      const overmeldSlots = slot - item.materiaSlots;

      const meldChance = overmeldSlots <= 0 ? 100 : ToolkitData.MateriaSuccessRates[overmeldSlots - 1][grade];
      // console.log(`Type: ${materia} Grade: ${parseInt(grade) + 1} Slot: ${slot} Chance: ${chance}`);
     
      return { materia, grade, slot, meldChance, isTool };
    });
  });
  console.log(data);  
}
calc();