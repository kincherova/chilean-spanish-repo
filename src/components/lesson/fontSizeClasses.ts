export type FontSize = 'normal' | 'large' | 'xlarge';

export const fs = {
  body: (size: FontSize) =>
    size === 'xlarge' ? 'text-xl' : size === 'large' ? 'text-lg' : 'text-base',
  bodySmall: (size: FontSize) =>
    size === 'xlarge' ? 'text-lg' : size === 'large' ? 'text-base' : 'text-sm',
  label: (size: FontSize) =>
    size === 'xlarge' ? 'text-base' : size === 'large' ? 'text-sm' : 'text-xs',
  heading: (size: FontSize) =>
    size === 'xlarge' ? 'text-4xl' : size === 'large' ? 'text-3xl' : 'text-2xl',
};
