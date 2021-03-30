export class OnboardingStatusNotExist extends Error {
  constructor() {
    super('The onboarding status does not exists')
  }
}
