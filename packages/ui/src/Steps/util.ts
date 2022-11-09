export const getStepsClasses = ({
  dot,
  horizontal
}: {
  dot?: boolean
  horizontal?: boolean
}) => ['ta-steps', { dot: !!dot, horizontal: !!horizontal }]

export const getStepClasses = ({
  active,
  finish
}: {
  active: boolean
  finish: boolean
}) => ['ta-step', 'ta-steps-item', 'ta-horizontal-hairline', { active, finish }]
