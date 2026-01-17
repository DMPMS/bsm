import { RuleCodeEnum } from "../enums/RuleCode.enum";

const dependentsMap: Record<RuleCodeEnum, RuleCodeEnum[]> = {
  [RuleCodeEnum.BrazilianLeagueA]: [RuleCodeEnum.BrazilianLeagueB],
  [RuleCodeEnum.BrazilianLeagueB]: [RuleCodeEnum.BrazilianLeagueC],
  [RuleCodeEnum.BrazilianLeagueC]: [RuleCodeEnum.BrazilianLeagueD],
  [RuleCodeEnum.BrazilianLeagueD]: [],
};

export function hasRuleDependents(
  ruleCode: RuleCodeEnum,
  ruleCodes: RuleCodeEnum[]
): boolean {
  const dependentRuleCodes = dependentsMap[ruleCode];

  return ruleCodes.some((rCode) => dependentRuleCodes.includes(rCode));
}
