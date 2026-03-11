/**
 * Calculate the remaining time for a tutorial from the current step onward.
 */

export interface TutorialStep {
    readonly time: string | number;
}

export const TutorialTimeRemaining = (
    steps: TutorialStep[],
    currentStep: number
): number => {
    const remainingSteps = [...steps].splice(currentStep);
    let timeRemaining = 0;
    remainingSteps.forEach((step: TutorialStep) => {
        timeRemaining += parseInt(String(step.time));
    });
    return timeRemaining;
};
