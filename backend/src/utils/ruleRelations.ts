import { RuleCodeEnum } from "../enums/RuleCode.enum";

const conflictMap: Record<RuleCodeEnum, RuleCodeEnum[]> = {
  [RuleCodeEnum.BrazilianLeagueA]: [
    RuleCodeEnum.BrazilianLeagueB,
    RuleCodeEnum.BrazilianLeagueC,
    RuleCodeEnum.BrazilianLeagueD,
  ],
  [RuleCodeEnum.BrazilianLeagueB]: [
    RuleCodeEnum.BrazilianLeagueA,
    RuleCodeEnum.BrazilianLeagueC,
    RuleCodeEnum.BrazilianLeagueD,
  ],
  [RuleCodeEnum.BrazilianLeagueC]: [
    RuleCodeEnum.BrazilianLeagueA,
    RuleCodeEnum.BrazilianLeagueB,
    RuleCodeEnum.BrazilianLeagueD,
  ],
  [RuleCodeEnum.BrazilianLeagueD]: [
    RuleCodeEnum.BrazilianLeagueA,
    RuleCodeEnum.BrazilianLeagueB,
    RuleCodeEnum.BrazilianLeagueC,
  ],
};

const requirementsMap: Record<RuleCodeEnum, RuleCodeEnum[]> = {
  [RuleCodeEnum.BrazilianLeagueA]: [],
  [RuleCodeEnum.BrazilianLeagueB]: [RuleCodeEnum.BrazilianLeagueA],
  [RuleCodeEnum.BrazilianLeagueC]: [RuleCodeEnum.BrazilianLeagueB],
  [RuleCodeEnum.BrazilianLeagueD]: [RuleCodeEnum.BrazilianLeagueC],
};

const dependentsMap: Record<RuleCodeEnum, RuleCodeEnum[]> = {
  [RuleCodeEnum.BrazilianLeagueA]: [RuleCodeEnum.BrazilianLeagueB],
  [RuleCodeEnum.BrazilianLeagueB]: [RuleCodeEnum.BrazilianLeagueC],
  [RuleCodeEnum.BrazilianLeagueC]: [RuleCodeEnum.BrazilianLeagueD],
  [RuleCodeEnum.BrazilianLeagueD]: [],
};

export function hasRuleConflict(
  ruleCode: RuleCodeEnum,
  ruleCodes: RuleCodeEnum[],
): boolean {
  const conflictingRuleCodes = conflictMap[ruleCode];

  return ruleCodes.some((rCode) => conflictingRuleCodes.includes(rCode));
}

export function hasRuleRequirements(
  ruleCode: RuleCodeEnum,
  ruleCodes: RuleCodeEnum[],
): boolean {
  const requiredRuleCodes = requirementsMap[ruleCode];

  return requiredRuleCodes.every((rCode) => ruleCodes.includes(rCode));
}

export function hasRuleDependents(
  ruleCode: RuleCodeEnum,
  ruleCodes: RuleCodeEnum[],
): boolean {
  const dependentRuleCodes = dependentsMap[ruleCode];

  return ruleCodes.some((rCode) => dependentRuleCodes.includes(rCode));
}
