function calc() {
  const [job] = Object.keys(CharacterData.identifiers);
  const gear = CharacterData.identifiers[job].getNormalSet();
  const { materiaData } = gear;

  const totals = {};
  const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const scripCosts = [0, 0, 0, 25, 200, 250, 250, 500];

  Object.keys(materiaData).forEach((key) => {
    const [itemType, itemID] = key.split("-");
    const item = itemManager.itemList[itemID];
    const isTool = itemType.endsWith("hand");

    const isGatherer = !!gear.baseStats.GP;
    const isCrafter = !!gear.baseStats.CP;

    return materiaData[key].forEach((materia, index) => {
      const [materiaKey, materiaGrade] = materia.split(":");
      const slot = index + 1;
      const overmeldSlots = slot - item.materiaSlots;

      const meldChance = overmeldSlots <= 0 ? 100 : ToolkitData.MateriaSuccessRates[overmeldSlots - 1][materiaGrade];
      const ToolMultiplier = isGatherer ? 2 : isCrafter ? 8 : 1;
      const multiplier = isTool ? ToolMultiplier : 1;
      const amount = (1 / (meldChance / 100)) * multiplier;

      const { name } = ToolkitData.Materias[materiaKey];

      if (!(materia in totals)) {
        totals[materia] = {
          name,
          grade: materiaGrade,
          amount: 0,
          scrips: 0,
        };
      }
      totals[materia].amount += amount;
      totals[materia].scrips += Math.ceil(amount) * scripCosts[materiaGrade];
    });
  });
  scripTotals = { 
    white: 0,
    yellow: 0,
  }
  console.log(Object.keys(totals).sort().map((key) => {
    const { name, grade, amount, scrips } = totals[key];
    const scripType = grade === "7" ? "white" : "yellow";
    scripTotals[scripType] += scrips;
    return `${name} ${numerals[grade]}: ${Math.ceil(amount)} ${scripType}: (${scrips})`;
  }).join("\n"));
  const { white, yellow } = scripTotals;
  console.log(`Yellow: ${yellow.toLocaleString('en')} / White: ${white.toLocaleString('en')} / Total: ${(white + yellow).toLocaleString('en')}`)
  
}
calc();