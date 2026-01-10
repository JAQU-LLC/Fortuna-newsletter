export type PlanId = 'free' | 'standard' | 'premium';

export interface PlanConfig {
  mostPopular: PlanId | null;
  disabledPlans: PlanId[];
}

// Default configuration
export const defaultPlanConfig: PlanConfig = {
  mostPopular: null, // define most popular by default
  disabledPlans: ['standard', 'premium'], // Grey out standard and premium by default
};

// In a real app, this would be stored in backend/admin settings
// For now, we'll store it in localStorage
const PLAN_CONFIG_KEY = 'fortuna_plan_config';

export function getPlanConfig(): PlanConfig {
  if (typeof window === 'undefined') {
    return defaultPlanConfig;
  }
  
  const stored = localStorage.getItem(PLAN_CONFIG_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultPlanConfig;
    }
  }
  
  return defaultPlanConfig;
}

export function setPlanConfig(config: PlanConfig): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(PLAN_CONFIG_KEY, JSON.stringify(config));
}

export function isPlanDisabled(planId: PlanId): boolean {
  const config = getPlanConfig();
  return config.disabledPlans.includes(planId);
}

export function isPlanPopular(planId: PlanId): boolean {
  const config = getPlanConfig();
  return config.mostPopular === planId;
}

