export const getStepsClasses = ({
  dot,
  horizontal
}: {
  dot?: boolean
  horizontal?: boolean
}) => ['ak-steps', { dot: !!dot, horizontal: !!horizontal }]

export const getStepClasses = ({
  active,
  finish
}: {
  active: boolean
  finish: boolean
}) => ['ak-step', 'ak-steps-item', 'ak-horizontal-hairline', { active, finish }]
