import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setRulesAction } from ".";
import type { RuleType } from "../../../types/Rule.type";

export const useRuleReducer = () => {
  const dispatch = useDispatch();
  const { rules } = useAppSelector((state) => state.ruleReducer);

  const setRules = (rules: RuleType[]) => {
    dispatch(setRulesAction(rules));
  };

  return {
    rules,
    setRules,
  };
};
