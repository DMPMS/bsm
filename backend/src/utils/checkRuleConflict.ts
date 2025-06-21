import { TeamglobalEntity } from "../entities/teamglobal.entity";
import { HttpStatusEnum } from "../enums/HttpStatus.enum";
import { RuleCodeEnum } from "../enums/RuleCode.enum";
import { HttpError } from "./httpError";
import { COMPETITIONGLOBAL_MESSAGES, RULE_MESSAGES } from "./messages";

const conflictingRulesMap = {
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

export function checkRuleConflict(
  teamglobal: TeamglobalEntity,
  ruleCode: RuleCodeEnum
): void {
  const conflictingRuleCodes = conflictingRulesMap[ruleCode];

  if (!conflictingRuleCodes) {
    throw new HttpError(
      HttpStatusEnum.BadRequest,
      RULE_MESSAGES.ERROR.RULE_CODE_NOT_FOUND(ruleCode)
    );
  }

  const hasConflict = teamglobal.competitionglobalTeamglobals?.some(
    (competitionglobalTeamglobal) => {
      const ruleCode =
        competitionglobalTeamglobal?.competitionglobal?.rule?.code;

      return ruleCode !== undefined && conflictingRuleCodes.includes(ruleCode);
    }
  );

  if (hasConflict) {
    throw new HttpError(
      HttpStatusEnum.Conflict,
      COMPETITIONGLOBAL_MESSAGES.ERROR.COMPETITION_RULE_CONFLICT_MESSAGE(
        teamglobal.id
      )
    );
  }
}
