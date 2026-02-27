export const Colors = {
  // 1. BRAND COLORS
  primary: '#007AFF',      // Actionable items, buttons, active states
  secondary: '#5856D6',    // Highlights, accents, secondary actions

  // 2. FEEDBACK / STATUS (Critical for Leads)
  success: '#34C759',      // Qualified, Won, Completed
  warning: '#FF9500',      // Follow-up, Contacted, Pending
  danger: '#FF3B30',       // Lost, Cancelled, Urgent
  info: '#5AC8FA',         // New, Information, Neutral status

  // 3. NEUTRALS (Grayscale)
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F2F2F7',      // Backgrounds
  gray200: '#E5E5EA',      // Borders, Dividers
  gray300: '#D1D1D6',      // Disabled states
  gray400: '#8E8E93',      // Muted text, icons
  gray500: '#1C1C1E',      // Dark text / headers

  // 4. LIGHT BACKGROUNDS (For Badges/Cards)
  primaryLight: '#E5F1FF',
  successLight: '#EBF9EE',
  warningLight: '#FFF4E5',
  dangerLight: '#FFEBEA',
  infoLight: '#EEF9FF',

  // 5. TRANSPARENTS
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.5)',
};

/**
 * Helper to get status colors based on lead status string
 */
export const getStatusColors = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
      return { bg: Colors.infoLight, text: Colors.info };
    case 'contacted':
      return { bg: Colors.warningLight, text: Colors.warning };
    case 'qualified':
      return { bg: Colors.successLight, text: Colors.success };
    case 'lost':
    case 'cancelled':
      return { bg: Colors.dangerLight, text: Colors.danger };
    default:
      return { bg: Colors.gray100, text: Colors.gray400 };
  }
};